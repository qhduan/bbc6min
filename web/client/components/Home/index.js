/**
* 首页根组件
* @author qhduan@memect.co
*/

"use strict";

import React from "react";
import ReactDOM from "react-dom";
import fetch from "isomorphic-fetch";
import AppBar from "material-ui/lib/app-bar";
import RaisedButton from "material-ui/lib/raised-button";
import CircularProgress from "material-ui/lib/circular-progress";
import {deepOrange500} from "material-ui/lib/styles/colors";
import getMuiTheme from "material-ui/lib/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/lib/MuiThemeProvider";
import FlatButton from "material-ui/lib/flat-button";

import "./styles/Home.scss";
import Footer from "./components/Footer.js";
import Player from "./components/Player.js";
import List from "./components/List.js";

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500
    }
});

class Home extends React.Component {

    constructor (props) {
        super(props);

        let page = window.localStorage.getItem("page");
        if (page) {
            page = Number.parseInt(page);
            if ( !Number.isFinite(page) || page <= 0) {
                page = 1;
            }
        } else {
            page = 1;
        }

        this.state = {
            page,
            loading: true,
            maxPage: 1,
            list:    null,
            play:    null,
            error:   null
        };

        window.addEventListener("scroll",function(){
            window.scrollTo(0, 0);
        }, false)

        document.body.addEventListener("touchstart", event => {
            if (event.target && event.target.tagName && (event.target.tagName=="HTML" || event.target.tagName=="BODY")) {
                event.preventDefault();
            }
        });
    }

    componentDidMount () {
        document.title = "BBC 6 Minutes English";
        window.scrollTo(0, 1);
        this.getData();
        this.computeSize();
        window.addEventListener("resize", () => this.computeSize());
    }

    componentDidUpdate () {
        this.computeSize();
    }

    getData (p) {
        let page = p || this.state.page;
        if ( !Number.isFinite(page) || page <= 0) {
            page = 1;
        }
        console.log(`get /list/${page}`);
        this.setState({
            loading: true
        });
        fetch(`/list/${page}`)
        .then(r => r.json())
        .then(j => {
            this.setState({
                loading: false,
                page:    j.page,
                maxPage: j.maxPage,
                list:    j.list
            });
            window.localStorage.setItem("page", j.page);
        }).catch(err => this.setState({ loading: false, error: err }));
    }

    computeSize () {
        const header = document.querySelector("header");
        const main = document.querySelector("main");
        const footer = document.querySelector("footer");
        if (header && main && footer) {
            const headerHeight = header.getBoundingClientRect().height;
            const footerHeight = footer.getBoundingClientRect().height;
            const mainHeight = window.innerHeight - 10 - headerHeight - footerHeight;
            main.style.height = `${mainHeight}px`;
        }
    }

    render () {
        const {loading, error, page, maxPage, list, play} = this.state;

        return (
            <div className="home">
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="container">
                        <header>
                            <AppBar
                                title="BBC 6 Minutes English"
                                showMenuIconButton={false}
                            />
                        </header>
                        {(() => {
                            if (loading) {
                                return (
                                    <div className="loading">
                                        <CircularProgress size={2}/>
                                    </div>
                                );
                            }
                            if (error) {
                                return (
                                    <div className="error">
                                        { error }
                                    </div>
                                );
                            }
                            return (
                                <div>
                                    <main className="main">
                                        {
                                            _.isArray(list) ? (
                                                <List
                                                    list={list}
                                                    play={date => {
                                                        this.setState({ play: null });
                                                        setTimeout(() => this.setState({ play: date }), 100);
                                                    }}
                                                />
                                            ) : null
                                        }
                                    </main>
                                    {(() => {
                                        if (_.isString(play)) {
                                            return (
                                                <Player
                                                    play={play}
                                                    close={() => this.setState({ play: null })}
                                                />
                                            );
                                        }
                                        if (page && maxPage) {
                                            return (
                                                <Footer
                                                    page={page}
                                                    maxPage={maxPage}
                                                    getData={(...args) => this.getData(...args)}
                                                />
                                            );
                                        }
                                    })()}
                                </div>
                            );
                        })()}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

}

Home.propTypes = {
};

ReactDOM.render(<Home />, document.getElementById("root"));
