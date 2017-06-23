import React, { Component } from "react";
import {
    ListView,
    RefreshControl,
    View,
    WebView,
    TouchableHighlight,
    StyleSheet,
    Text
} from "react-native";
import { RecordObservable } from "./API";

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.date !== r2.date
});

const RecordListItem = ({ record, navigator }) =>
    <TouchableHighlight
        onPress={() => {
            if (record.audio !== "") {
                navigator.push({
                    id: "RECORD_MP3",
                    title: record.date,
                    component: WebView,
                    passProps: {
                        type: "mp3",
                        source: {
                            html: `
            <video controls autoplay width="100%">
              <source src="${record.audio}" type="audio/mpeg">
              Your browser does not support the audio element.
            </video>
          `
                        }
                    }
                });
            }
        }}
    >
        <View>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Text style={record.audio === "" ? styles.noAudioText : {}}>
                        {record.date}
                    </Text>
                    <Text style={record.audio === "" ? styles.noAudioText : {}}>
                        {record.session}
                    </Text>
                </View>
                <View style={styles.right}>
                    <Text style={record.audio === "" ? styles.noAudioText : {}}>
                        {record.content}
                    </Text>
                </View>
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

export class RecordListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            refreshing: false
        };
    }

    componentWillMount() {
        this.fetchRecordList();
    }

    render() {
        //console.warn(this.props.navigator);
        const { navigator } = this.props;
        const { records, refreshing } = this.state;
        return (
            <ListView
                dataSource={ds.cloneWithRows(records)}
                renderRow={record => RecordListItem({ record, navigator })}
                renderSeparator={ListSeparator}
                enableEmptySections={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => this.fetchRecordList()}
                    />
                }
            />
        );
    }

    fetchRecordList() {
        this.setState({ refreshing: true });
        RecordObservable()
            .toArray()
            .subscribe(
                records => this.setState({ records: records }),
                err => console.error(err),
                () => this.setState({ refreshing: false })
            );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#ffffff"
    },
    noAudioText: {
        color: "#999999"
    },
    left: {
        flexDirection: "column",
        flex: 1
    },
    right: {
        flexDirection: "column",
        flex: 2
    }
});
