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
import MenuItem from "material-ui/lib/menus/menu-item";
import DropDownMenu from "material-ui/lib/DropDownMenu";

export default class Footer extends React.Component {
    constructor (props) {
        super(props);
    }

    changePage (event, index, value) {
        const {page, getData} = this.props;
        switch (value) {
            case 2: // 第1页
                getData(1);
                break;
            case 3: // 前5页
                getData(page - 5);
                break;
            case 4: // 前10页
                getData(page - 10);
                break;
            case 5: // 后5页
                getData(page + 5);
                break;
            case 6: // 后10页
                getData(page + 10);
                break;
        }
    }

    render () {
        const {page, maxPage, getData} = this.props;
        return (
            <footer className="toolbar">
                <Toolbar>
                    <ToolbarGroup firstChild={true} float="left">
                        <DropDownMenu value={1} onChange={(...args) => this.changePage(...args)}>
                            <MenuItem value={1} primaryText={`${page}/${maxPage}`} />
                            {(() => {
                                let ret = [];
                                if (page > 1) {
                                    ret.push(
                                        <MenuItem
                                            key="第1页"
                                            value={2}
                                            primaryText="第1页"
                                        />
                                    );
                                }
                                if (page > 5) {
                                    ret.push(
                                        <MenuItem
                                            key="前5页"
                                            value={3}
                                            primaryText="前5页"
                                        />
                                    );
                                }
                                if (page > 10) {
                                    ret.push(
                                        <MenuItem
                                            key="前10页"
                                            value={4}
                                            primaryText="前10页"
                                        />
                                    );
                                }
                                if (maxPage - page >= 5) {
                                    ret.push(
                                        <MenuItem
                                            key="后5页"
                                            value={5}
                                            primaryText="后5页"
                                        />
                                    );
                                }
                                if (maxPage - page >= 10) {
                                    ret.push(
                                        <MenuItem
                                            key="后10页"
                                            value={6}
                                            primaryText="后10页"
                                        />
                                    );
                                }
                                return ret;
                            })()}
                        </DropDownMenu>
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true} float="right">
                        <FlatButton
                            label="下1页"
                            disabled={ page >= maxPage }
                            onClick={ () => getData(page + 1) }
                        />
                    </ToolbarGroup>
                </Toolbar>
            </footer>
        );
    }
}

Footer.propTypes = {
    page:    PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
    getData: PropTypes.func.isRequired
};
