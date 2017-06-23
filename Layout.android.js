/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    DrawerLayoutAndroid,
    ListView,
    TouchableHighlight,
    Text,
    View
} from "react-native";

import { BookletView } from "./Booklet";
import { RecordView } from "./Record";

class DrawerView extends Component {
    constructor(props) {
        super(props);
        const { pages } = props;
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.title !== r2.title
        });
        this.state = {
            dataSource: ds.cloneWithRows(pages)
        };
    }

    render() {
        const { dataSource } = this.state;
        const { onPageSelect } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <ListView
                    dataSource={dataSource}
                    renderRow={(rowData, sectionID, rowID, highlightRow) =>
                        <TouchableHighlight
                            onPress={() => onPageSelect(rowData)}
                        >
                            <View>
                                <View style={styles.row}>
                                    <Text style={styles.menuText}>
                                        {rowData.title}
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>}
                />
            </View>
        );
    }
}

export default class CCCSTCApp extends Component {
    constructor(props) {
        super(props);
        const pages = [
            { title: "崇拜週刊", index: 0 },
            { title: "講道重溫", index: 1 }
        ];
        this.state = {
            pages: pages,
            currentPage: pages[0],
            toolbarActions: []
        };
    }

    renderContent() {
        const { currentPage } = this.state;
        if (currentPage.index === 0) {
            return (
                <BookletView onMenuIconClick={() => this.drawer.openDrawer()} />
            );
        } else if (currentPage.index === 1) {
            return (
                <RecordView onMenuIconClick={() => this.drawer.openDrawer()} />
            );
        } else {
            return <Text>發生錯誤</Text>;
        }
    }

    render() {
        const { pages } = this.state;
        return (
            <View style={styles.container}>
                <DrawerLayoutAndroid
                    drawerWidth={200}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() =>
                        <DrawerView
                            pages={pages}
                            onPageSelect={page => {
                                this.setState({ currentPage: page });
                                this.drawer.closeDrawer();
                            }}
                        />}
                    ref={ref => (this.drawer = ref)}
                >
                    {this.renderContent()}
                </DrawerLayoutAndroid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        justifyContent: "flex-start",
        alignItems: "stretch",
        backgroundColor: "#F5FCFF"
    },
    toolbar: {
        backgroundColor: "#e9eaed",
        height: 56
    },
    row: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 10,
        paddingLeft: 30,
        backgroundColor: "#ffffff"
    },
    menuText: {
        fontSize: 20
    }
});
