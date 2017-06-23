import React, { Component } from "react";
import {
    ListView,
    RefreshControl,
    View,
    WebView,
    ActionSheetIOS,
    TouchableHighlight,
    Text,
    StatusBar,
    StyleSheet
} from "react-native";
import { BookletObservable } from "./API";

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.date !== r2.date
});

class BookletWebView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    render() {
        const { source } = this.props;
        const { loading } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={source}
                    scalesPageToFit={true}
                    onLoadStart={() => this.setState({ loading: true })}
                    onLoadEnd={() => this.setState({ loading: false })}
                />
                <StatusBar networkActivityIndicatorVisible={loading} />
            </View>
        );
    }
}

const BookletListItem = ({ booklet, navigator }) =>
    <TouchableHighlight
        onPress={() => {
            navigator.push({
                id: "BOOKLET_PDF",
                title: booklet.date,
                component: BookletWebView,
                passProps: {
                    type: "pdf",
                    source: { uri: booklet.booklet }
                },
                rightButtonSystemIcon: "action",
                onRightButtonPress: () => {
                    ActionSheetIOS.showShareActionSheetWithOptions(
                        {
                            url: booklet.booklet
                        },
                        error => alert(error),
                        (success, method) => {}
                    );
                }
            });
        }}
    >
        <View>
            <View style={styles.row}>
                <Text style={styles.title}>{booklet.date}</Text>
                <Text style={styles.text}>第{booklet.week}週</Text>
            </View>
        </View>
    </TouchableHighlight>;

const FeedbackItem = navigator => () =>
    <TouchableHighlight
        onPress={() => {
            navigator.push({
                id: "FEEDBACK_FORM",
                title: "講道回應表",
                component: BookletWebView,
                passProps: {
                    source: {
                        uri:
                            "https://docs.google.com/forms/d/e/1FAIpQLSdhtehxsi4p7vzWLlIbClcOt8Z2Mr0jgaDuceGfweQStWY0MQ/viewform"
                    }
                },
                rightButtonSystemIcon: "action",
                onRightButtonPress: () => {
                    ActionSheetIOS.showShareActionSheetWithOptions(
                        {
                            url:
                                "https://docs.google.com/forms/d/e/1FAIpQLSdhtehxsi4p7vzWLlIbClcOt8Z2Mr0jgaDuceGfweQStWY0MQ/viewform"
                        },
                        error => alert(error),
                        (success, method) => {}
                    );
                }
            });
        }}
    >
        <View>
            <View style={styles.feedback}>
                <Text style={styles.feedbackTitle}>⛪️ 講道回應表 ⛪️</Text>
            </View>
        </View>
    </TouchableHighlight>;

const ListSeparator = (sectionID, rowID) =>
    <View
        key={`${sectionID}-${rowID}`}
        style={{
            height: 1,
            backgroundColor: "#CCCCCC"
        }}
    />;

export class BookletListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booklets: [],
            refreshing: false
        };
    }

    componentWillMount() {
        this.fetchBookletList();
    }

    render() {
        //console.warn(this.props.navigator);
        const { navigator } = this.props;
        const { booklets, refreshing } = this.state;
        return (
            <ListView
                dataSource={ds.cloneWithRows(booklets)}
                renderHeader={FeedbackItem(navigator)}
                renderRow={booklet => BookletListItem({ booklet, navigator })}
                renderSeparator={ListSeparator}
                enableEmptySections={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => this.fetchBookletList()}
                    />
                }
            />
        );
    }

    fetchBookletList() {
        this.setState({ refreshing: true });
        BookletObservable()
            .toArray()
            .subscribe(
                booklets => this.setState({ booklets: booklets }),
                err => console.error(err),
                () => this.setState({ refreshing: false })
            );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 10,
        paddingLeft: 30,
        backgroundColor: "#ffffff"
    },
    feedback: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        paddingTop: 30,
        height: 80,
        borderBottomWidth: 2,
        borderBottomColor: "black",
        backgroundColor: "#ffffff"
    },
    feedbackTitle: {
        fontSize: 22,
        flex: 1
    },
    title: {
        fontSize: 22,
        flex: 1
    },
    text: {
        fontSize: 16,
        marginTop: 5,
        flex: 1
    }
});
