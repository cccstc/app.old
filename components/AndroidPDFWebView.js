import React, {Component} from 'react';
import { WebView } from 'react-native';

export class AndroidPDFWebView extends Component {
  render() {
    let { source } = this.props;
    source = Object.assign(
      {},
      source,
      {uri: "https://docs.google.com/viewer?url=" + source.uri}
    );
    return (
      <WebView source={source} />
    );
  }
}
