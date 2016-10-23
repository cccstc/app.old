/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Navigator,
  TouchableHighlight,
  WebView,
  Image,
  Text,
  View,
} from 'react-native';

import { RecordListView } from "./components/RecordListView";
import { AndroidPDFWebView } from "./components/AndroidPDFWebView";

export class RecordView extends Component {
  render() {
    const { onMenuIconClick } = this.props;
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{id: "RECORD_ROOT", title: "講道錄音"}}
          renderScene={(route, navigator) => {
            switch (route.id) {
              case "RECORD_ROOT":
                return (<RecordListView navigator={navigator}/>);
              case "RECORD_MP3":
                return (<WebView source={route.passProps.source}/>);
              default:
                return (<Text>發生錯誤</Text>);
            }
          }}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                  return (
                    <TouchableHighlight
                      style={{width: 56, height:56, padding: 16}}
                      onPress={onMenuIconClick}>
                      <Image
                        source={require('./resources/fa-bars.png')}
                        style={{width: 24, height: 24}}
                      />
                    </TouchableHighlight>
                  );
                },
                RightButton: (route, navigator, index, navState) => {
                  if (route.id === "RECORD_ROOT") {
                    return null;
                  }
                  return (
                    <TouchableHighlight
                      style={{width: 56, height:56, padding: 16}}
                      onPress={() => navigator.pop()}>
                      <Image
                        source={require('./resources/fa-close.png')}
                        style={{width: 24, height: 24}}
                      />
                    </TouchableHighlight>
                  );
                },
                Title: (route, navigator, index, navState) => {
                  if (route.id === "RECORD_ROOT") {
                    return (
                      <View style={styles.navTitle}>
                        <Text style={styles.navTitleText}>中華基督教會沙田堂</Text>
                        <Text style={styles.navDescText}>{route.title}</Text>
                      </View>
                    );
                  }
                  return (
                    <View style={styles.navTitle}>
                      <Text style={styles.navTitleText}>講道錄音</Text>
                      <Text style={styles.navDescText}>{route.title}</Text>
                    </View>
                  );
                },
              }}
              style={styles.navigationBar}
            />
          }
          configureScene={(route, routeStack) =>
            Navigator.SceneConfigs.FloatFromBottom
          }
          style={{flex: 1, paddingTop: 56}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  navigationBar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
  navTitle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  navTitleText: {
    fontSize: 18
  },
  navDescText: {
    fontSize: 16
  }
});
