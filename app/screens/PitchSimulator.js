import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

import playerPositions from '../data/playersPositions';
import {PitchFullSize} from '../components/Pitch';
import {PlayerDot} from '../components/Player';

class PitchSimulator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentFrame: 0,
            isPlaying: false,
            frameInterval: playerPositions.interval,
            frameLength: playerPositions.player_positions.length,
            playerAppearances:[],
            pitchX: '',
            pitchY: '',
            pitchWidth: '',
            pitchHeight: ''
        };

        // Toggle the state every second
        setInterval(() => {
            if(this.state.currentFrame < this.state.frameLength - 1) {
                this.setState(previousState => {
                    return {currentFrame: previousState.currentFrame + 1};
                });
            } else {
                this.setState(() => {
                    return {currentFrame: 0};
                });
            }
        }, 100);
    }
    componentWillMount() {
        let frame = 0;
        let playerAppearances = [];
        let foundAppearancesIndex =0;
        console.log("componentWillMount");
        for (frame=0;frame < this.state.frameLength - 1;frame++) { //have current frame
            playerPositions.player_positions[frame]
                .forEach((player) => {
                    //check if already appeared
                    foundAppearancesIndex = playerAppearances.findIndex(x => x.id == player[0]);
                    //console.log(foundAppearancesIndex);
                    if(foundAppearancesIndex >= 0 ){
                        playerAppearances[foundAppearancesIndex].frames.push(frame);
                    } else {
                        console.log(foundAppearancesIndex+" Created new player "+player[0]);
                        playerAppearances.push({
                            id: player[0],
                            frames: [frame]
                        });
                    }
                });
        }
        //console.log("appearances", playerAppearances);
        this.setState(() => {
            return {playerAppearances: playerAppearances};
        });

    }
    measurePitch = (event) => {
        //console.log('event peroperties: ', event);
        this.setState({
            pitchX: event.nativeEvent.layout.x,
            pitchY: event.nativeEvent.layout.y,
            pitchWidth: event.nativeEvent.layout.width,
            pitchHeight: event.nativeEvent.layout.height
        })
    }
    closestSmallerNumber = (num, arr)=> {
        var curr = arr[0];
        var diff = Math.abs (num - curr);
        for (var val = 0; val < arr.length; val++) {
            var newdiff = Math.abs (num - arr[val]);
            if (arr[val]<num && newdiff < diff) {
                diff = newdiff;
                curr = arr[val];
            }
        }
        return curr;
    }
    closestBiggerNumber = (num, arr)=> {
        var curr = arr[0];
        var diff = Math.abs (num - curr);
        for (var val = 0; val < arr.length; val++) {
            var newdiff = Math.abs (num - arr[val]);
            if (arr[val]>num && newdiff < diff) {
                diff = newdiff;
                curr = arr[val];
            }
        }
        return curr;
    }


    getPlayer = (frame, id) => {
       return playerPositions.player_positions[frame]//got frame data
            .filter(p => p[0] == id);//got player with correct id
    }
    render() {
        //console.log(this.state.pitchWidth+" "+this.state.pitchHeight);
        //console.log("Dimensions");
        //console.log(Dimensions.get('window'));
        /*let playersIcons = "";
        if(playerPositions.player_positions[this.state.currentFrame]){
            playersIcons = (
                playerPositions.player_positions[this.state.currentFrame]
                    .sort( (a, b) => a[0] - b[0] )
                    .map(([id,x,y]) => <PlayerDot key={id} x={x*this.state.pitchWidth} y={y*this.state.pitchHeight} >{id}</PlayerDot>)
            );
        }else{
            console.log("Alert! no data in player position[frame]")
        }*/
        let playersIcons = [];
        //new
        //console.log(this.state.playerAppearances);
        this.state.playerAppearances.map((player) => {
            let indexOfPlayerFrame = player.frames.findIndex(x => x === this.state.currentFrame);
            if( indexOfPlayerFrame > -1){//player appear in this frame
                playersIcons.push(
                    this.getPlayer(this.state.currentFrame, player.id)
                        .map(([id,x,y]) => <PlayerDot key={id} x={x*this.state.pitchWidth} y={y*this.state.pitchHeight} >{id}</PlayerDot>)
                );
            } else { //player is missing in this frame
                if(player.frames[0]<this.state.currentFrame && player.frames[player.frames.length - 1]>this.state.currentFrame){ //already appeared before and still going to appear
                    //get next frame he is going to appear
                    let lastApearFrame = this.closestSmallerNumber(this.state.currentFrame,player.frames);
                    let nextApearFrame = this.closestBiggerNumber(this.state.currentFrame,player.frames);

                    //calculate position in this frame
                    let lastFramePlayer = this.getPlayer(lastApearFrame, player.id)[0];
                    let nextFramePlayer = this.getPlayer(nextApearFrame, player.id)[0];
                    if((lastFramePlayer[1]<0.95 && lastFramePlayer[1]>0.05 && lastFramePlayer[2]<0.95 && lastFramePlayer[2]>0.05) ||
                        (nextFramePlayer[1]<0.95 && nextFramePlayer[1]>0.05 && nextFramePlayer[2]<0.95 && nextFramePlayer[2]>0.05)) { //if last or next player is inside the field

                        /*console.log("disappear", this.state.currentFrame, nextApearFrame, player.id);
                        console.log("nextFramePlayer", nextApearFrame, nextFramePlayer);
                        console.log("lastFramePlayer", lastApearFrame, lastFramePlayer);
                        console.log(nextFramePlayer[1] + "-" + lastFramePlayer[1] + "/" + nextApearFrame + "-" + lastApearFrame);*/
                        let deltaX = (nextFramePlayer[1] - lastFramePlayer[1]) / (nextApearFrame - lastApearFrame);
                        let deltaY = (nextFramePlayer[2] - lastFramePlayer[2]) / (nextApearFrame - lastApearFrame);
                        //console.log("deltas x,y ", deltaX, deltaY)
                        playersIcons.push(
                            <PlayerDot key={lastFramePlayer[0]} x={lastFramePlayer[1] * this.state.pitchWidth + deltaX}
                                       y={lastFramePlayer[2] * this.state.pitchHeight + deltaY}>{lastFramePlayer[0]}</PlayerDot>
                        );
                    }
                } else {
                    //not existing
                }
            }
        })
        //let {deviceHeight, deviceWidth} = Dimensions.get('window');
        return (
            <View style={{ flex: 1 }}>
                <PitchFullSize measurePitch={this.measurePitch} >
                    {playersIcons}
                </PitchFullSize>
            </View>
        );
    }//<PlayerDot  x={0.5*this.state.pitchWidth} y={1.045*this.state.pitchHeight} >22</PlayerDot>
}
export default PitchSimulator;
