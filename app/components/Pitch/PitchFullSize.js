import React from 'react';
import {View, Image, Dimensions} from 'react-native';


const PitchFullSize = (props) => {
    let  deviceWidth = Dimensions.get('window').width;
    let  deviceHeight = Dimensions.get('window').height;
    let  pitchWidth, pitchHeight, leftMargin=0;

    if (deviceWidth>deviceHeight){ //orientation horizontal
        pitchWidth=deviceHeight * 0.8 * 1.27;
        pitchHeight= deviceHeight * 0.8;
        leftMargin=40;
    } else { // orientation vertical
        pitchWidth=deviceWidth;
        pitchHeight=deviceWidth*0.77;
    }
    const styles = {
        imageContainer: {
            backgroundColor: 'orange',
            width: pitchWidth,
            height: pitchHeight,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:30,
            marginLeft: leftMargin
        },
        image: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0

        },
        runningSpace: {
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            width: '100%',
            height: '100%',
        }

    };


    return (
        <View style={styles.imageContainer}>
            <Image source={require('./images/pitch.jpg')} style={styles.image}>
            </Image>
            <View style={styles.runningSpace} onLayout={props.measurePitch}>
                {props.children}
            </View>
        </View>
    );
};

export default PitchFullSize;