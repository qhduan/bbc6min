/**
* 首页底部栏组件
* @author qhduan@memect.co
*/

"use strict";

import React, { PropTypes } from "react";
import FlatButton from "material-ui/lib/flat-button";
import Toolbar from "material-ui/lib/toolbar/toolbar";
import ToolbarGroup from "material-ui/lib/toolbar/toolbar-group";
import ToolbarTitle from "material-ui/lib/toolbar/toolbar-title";

export default class Footer extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {page, maxPage, getData} = this.props;
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    <ToolbarTitle text={ "" } />
                    <ToolbarTitle text={ `${page}/${maxPage}` } />
                </ToolbarGroup>
                <ToolbarGroup lastChild={true} float="right">
                    {
                        (page > 1) ? (
                            <FlatButton
                                label="上一页"
                                onClick={ () => getData(page - 1) }
                            />
                        ) : null
                    }
                    {
                        (page < maxPage) ? (
                            <FlatButton
                                label="下一页"
                                onClick={ () => getData(page + 1) }
                            />
                        ) : null
                    }
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

Footer.propTypes = {
    page:    PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
    getData: PropTypes.func.isRequired
};
