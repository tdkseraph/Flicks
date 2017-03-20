/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
  Navigator,
  View
} from 'react-native';

import Homepage from './Apps/homepage.js';

export default class Flicks extends Component {
  render() {
    return (
      <Homepage/>
    )
  }
}

AppRegistry.registerComponent('Flicks', () => Flicks);
