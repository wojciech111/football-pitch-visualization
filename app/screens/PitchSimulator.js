import React, { Component } from 'react';
import { View, Button, Slider, Text } from 'react-native';

import playerPositions from '../data/playersPositions';
import {PitchFullSize} from '../components/Pitch';
import {PlayerDot} from '../components/Player';

class PitchSimulator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentFrame: 0,
            frameInterval: playerPositions.interval,
            frameLength: playerPositions.player_positions.length-1,
            playerAppearances:[],
            pitchX: '',
            pitchY: '',
            pitchWidth: '',
            pitchHeight: '',
            isPlaying: false,
            playingInterval: null
        };


    }
    componentDidMount() {
        let frame = 0;
        let playerAppearances = [];
        let foundAppearancesIndex =0;
        //find out in which frames each player appears
        for (frame=0;frame < this.state.frameLength - 1;frame++) { //have current frame
            playerPositions.player_positions[frame]
                .forEach((player) => {
                    //check if already appeared
                    foundAppearancesIndex = playerAppearances.findIndex(x => x.id == player[0]);
                    if(foundAppearancesIndex >= 0 ){//player is already in object
                        playerAppearances[foundAppearancesIndex].frames.push(frame);
                    } else {//add new player to object
                        playerAppearances.push({
                            id: player[0],
                            frames: [frame]
                        });
                    }
                });
        }
        this.setState(() => {
            return {playerAppearances: playerAppearances};
        });

    }

    measurePitch = (event) => {
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
    _handleSliderChange = (val) => {
        this.setState(() => {
            return {currentFrame: val};
        });
    }
    _handleButtonPress = () => {

        if(this.state.isPlaying) {
            clearInterval(this.state.playingInterval);
            this.setState(() => {
                return {isPlaying: false};
            });

        } else {

            // Toggle the state every second
            let interval = setInterval(() => {
                if(this.state.currentFrame < this.state.frameLength - 1) {
                    this.setState(previousState => {
                        return {currentFrame: previousState.currentFrame + 1};
                    });
                } else {
                    this.setState(() => {
                        return {currentFrame: 0};
                    });
                }
            }, this.state.frameInterval);
            this.setState(() => {
                return {isPlaying: true, playingInterval: interval};
            });
        }
    }
    render() {
        let playersIcons = [];
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
                            (nextFramePlayer[1]<0.95 && nextFramePlayer[1]>0.05 && nextFramePlayer[2]<0.95 && nextFramePlayer[2]>0.05)) { //if player is inside the field in last or next frame

                        //calculate translation
                        let deltaX = (nextFramePlayer[1] - lastFramePlayer[1]) / (nextApearFrame - lastApearFrame);
                        let deltaY = (nextFramePlayer[2] - lastFramePlayer[2]) / (nextApearFrame - lastApearFrame);
                        playersIcons.push(
                            <PlayerDot key={lastFramePlayer[0]} x={lastFramePlayer[1] * this.state.pitchWidth + deltaX}
                                       y={lastFramePlayer[2] * this.state.pitchHeight + deltaY}>{lastFramePlayer[0]}</PlayerDot>
                        );
                    }
                }
            }
        })

        return (
            <View style={{ flex: 1 , flexWrap:'wrap' }}>
                <PitchFullSize measurePitch={this.measurePitch} >
                    {playersIcons}
                </PitchFullSize>
                <Button
                    onPress={this._handleButtonPress}
                    title={this.state.isPlaying?"Stop session":"Run session"}
                />
                <Text>Current time: {Math.round(this.state.currentFrame*0.1/60)}:{Math.round((this.state.currentFrame*0.1)%60)}</Text>
                <Text>Total time: {Math.round(this.state.frameLength*0.1/60)}:{Math.round((this.state.frameLength*0.1)%60)}</Text>
                <Slider
                    style={{ flex: 1, margin: 10, minWidth: 300 }}
                    step={1}
                    minimumValue={0}
                    maximumValue={this.state.frameLength}
                    value={this.state.currentFrame}
                    onValueChange={val => this._handleSliderChange(val)}
                />


            </View>
        );
    }
}
export default PitchSimulator;
