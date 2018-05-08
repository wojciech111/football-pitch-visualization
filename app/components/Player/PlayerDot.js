import React from 'react';
import {View, Text, Dimensions} from 'react-native';

//import styles from './styles';

const PlayerDot = (props) => {
    const styles = {
        dot: {
            backgroundColor: 'red',

            width: 16,
            height: 16,
            borderRadius: 50,

            position: 'absolute',
            bottom: props.y-5,
            left: props.x-5,

            paddingTop: 4,
            paddingRight: 3,
            paddingBottom: 0,
            paddingLeft: 3,
        },
        number: {
            textAlign: 'center',
            fontSize: 9,
        }

    };


    return (
        <View style={styles.dot}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};

export default PlayerDot;