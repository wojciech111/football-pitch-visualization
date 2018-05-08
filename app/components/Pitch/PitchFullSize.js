import React from 'react';
import {View, Image, Dimensions} from 'react-native';

//import styles from './styles';

const PitchFullSize = (props) => {
    let  deviceWidth = Dimensions.get('window').width;
    let  deviceHeight = Dimensions.get('window').height;
    //console.log("deviceWidth:"+deviceWidth);
    const styles = {
        imageContainer: {
            backgroundColor: 'orange',
            width: (deviceWidth * 0.65),
            height: (deviceHeight * 0.8),
            display: 'flex',
            justifyContent: 'center', /* align horizontal */
            alignItems: 'center', /* align vertical */
            marginTop:30,
            marginLeft: 50
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