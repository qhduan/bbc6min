/**
* 首页播放组件
* @author qhduan@memect.co
*/

"use strict";

import React, { PropTypes } from "react";
import FlatButton from "material-ui/lib/flat-button";

export default class Player extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {play, close} = this.props;
        return (
            <footer className="player">
                <div>
                    <label ref="time">
                        {"0s/0s"}
                    </label>
                    <FlatButton
                        label="关闭"
                        onClick={() => close()}
                    />
                </div>
                <div>
                    <audio
                        ref="player"
                        controls
                        autoPlay
                        onTimeUpdate={() => this.showTime()}
                    >
                        <source src={`/audio/${play}.ogg`} type="audio/ogg" />
                        <source src={`/audio/${play}.mp3`} type="audio/mpeg" />
                    </audio>
                </div>
            </footer>
        );
    }

    timeFormat (double) {
        let t = Math.floor(double);
        if (t >= 60) {
            let m = Math.floor(t / 60);
            let s = Math.floor(t % 60);
            return `${m}m` + (s > 0 ? `${s}s` : "");
        }
        return `${t}s`;
    }

    showTime () {
        let {time, player} = this.refs;
        time.textContent = `${this.timeFormat(player.currentTime)}/${this.timeFormat(player.duration)}`;
    }
}

Player.propTypes = {
    play:  PropTypes.string.isRequired,
    close: PropTypes.func.isRequired
};
