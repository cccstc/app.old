/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  View,
  Modal,
  Text,
  TouchableHighlight,
} from 'react-native';

import { BookletTab } from "./booklet.ios";
import { RecordTab } from "./record.ios";

class ChurchApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      currentTab: 1,
      hasProblem: null,
    };
  }

  render() {
    const { records, currentTab } = this.state;
    return (
      <TabBarIOS>
        <BookletTab
          selected={currentTab === 1}
          onPress={() => this.setState({currentTab: 1})}
        />
        <RecordTab
          records={records}
          selected={currentTab === 2}
          onPress={() => this.setState({currentTab: 2})}
        />
      </TabBarIOS>
    );
  }
};

const styles = StyleSheet.create({});

AppRegistry.registerComponent('ChurchApp', () => ChurchApp);
