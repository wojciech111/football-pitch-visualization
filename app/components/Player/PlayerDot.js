import React, { Component }  from 'react';
import {Animated, View, Text, Dimensions} from 'react-native';

//import styles from './styles';

class PlayerDot extends Component{
    constructor(props){
        super(props);
        // set card initial position as component state
        this.state = {
            dotPosX: new Animated.Value(0),
            oldX: 0
        };


    }

    playAnimation() {
        Animated.timing(this.state.dotPosX, {
            delay: 0,
            duration: 10000,
            toValue: 1
        }).start();
    }
    componentDidMount() {
        this.playAnimation();

    }
    componentDidUpdate(prevProps) {
        console.log("didupdate");
        this.playAnimation();

    }
    /*componentWillReceiveProps(next) {
        this.setState(previousState => {
            return {
                dotPosX: new Animated.Value(this.props.x),
                dotPosY: new Animated.Value(this.props.y)
            };
        });

        if (this.props.x != 0 && next.x != this.props.x) {
            console.log("reciveprops X state ", this.state.dotPosX, "props", this.props.x, "props next ", next.x);
            Animated.timing(
                this.state.dotPosX,
                {
                    //easing: Easing.bounce,
                    toValue: next.x,
                    duration: 10000,
                }
            ).start();
        }
        if (this.props.y != 0 && next.y != this.props.y) {
            //console.log("reciveprops Y", this.props.y, next.y);
            Animated.timing(
                this.state.dotPosY,
                {
                    //easing: Easing.bounce,
                    toValue: next.y,
                    duration: 10000,
                }
            ).start();
        }
    }*/

    render() {
        console.log("props ", this.props.x);
        console.log("state old ", this.state.oldX);

        const styles = {
            dot: {
                backgroundColor: 'red',

                width: 16,
                height: 16,
                borderRadius: 50,

                position: 'absolute',
                bottom: this.props.y-5,
                left: this.props.x-5,

                paddingTop: 4,
                paddingRight: 3,
                paddingBottom: 0,
                paddingLeft: 3,
                transform: [{
                    translateX: this.state.dotPosX.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 150]  // 0 : 150, 0.5 : 75, 1 : 0
                    }),
                }],

            },
            number: {
                textAlign: 'center',
                fontSize: 9,
            }

        };
        return (
            <Animated.View style={styles.dot}>
                <Text style={styles.number}>{this.props.children}</Text>
            </Animated.View>
        );
    }
};

export default PlayerDot;