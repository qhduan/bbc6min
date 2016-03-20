/**
* 首页播放组件
* @author qhduan@memect.co
*/

"use strict";

import React, { PropTypes } from "react";
import FlatButton from "material-ui/lib/flat-button";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CardHeader from "material-ui/lib/card/card-header";
import CardTitle from "material-ui/lib/card/card-title";
import CardText from "material-ui/lib/card/card-text";

export default class List extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {list, play} = this.props;
        return (
            <div>
                {
                    list.map(item => {
                        const desc = item.description.split("\n").map(e => e.trim() == "<br/>" ? "" : `<p>${e}</p>`).join("");
                        return (
                            <Card key={item.date}>
                                <CardTitle
                                    title={item.title}
                                    subtitle={item.date}
                                />
                                <CardActions>
                                    <FlatButton
                                        label={item.show ? "关闭" : "查看"}
                                        onClick={() => { item.show = !item.show; this.forceUpdate(); }}
                                    />
                                    <FlatButton
                                        label="播放"
                                        primary={true}
                                        onClick={() => play(item.date)}
                                    />
                                </CardActions>
                                <CardText style={{display: item.show ? "block" : "none"}}>
                                    <div dangerouslySetInnerHTML={{__html: desc}} >
                                    </div>
                                </CardText>
                            </Card>
                        );
                    })
                }
            </div>
        );
    }
}

List.propTypes = {
    list: PropTypes.array.isRequired,
    play: PropTypes.func.isRequired
};
