import React, { Component } from "react";
import { TabBarIOS } from "react-native";

import { BookletTab } from "./Booklet";
import { RecordTab } from "./Record";

export default class CCCSTCApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1,
            hasProblem: null
        };
    }

    render() {
        const { currentTab } = this.state;
        return (
            <TabBarIOS>
                <BookletTab
                    selected={currentTab === 1}
                    onPress={() => this.setState({ currentTab: 1 })}
                />
                <RecordTab
                    selected={currentTab === 2}
                    onPress={() => this.setState({ currentTab: 2 })}
                />
            </TabBarIOS>
        );
    }
}
