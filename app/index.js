import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navigator from './config/routes';


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
/*
Provider store
    AlertProvider
        Navigator



react-native-extended-stylsheet
 */

export default () => (
  <Navigator />
);

