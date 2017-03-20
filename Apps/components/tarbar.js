import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TabBarIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TabBar extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 'nowPlayingTab',
        };
    }

    render() {
        return (
            <TabBarIOS unselectedTintColor="gray" 
            tintColor="black" barTintColor="orange">
                <Icon.TabBarItem
                    title="Now Playing"
                    iconColor='gray'
                    selectedIconColor='black'
                    iconName="movie-creation"
                    selected={this.state.selectedTab === 'nowPlayingTab'}
                    onPress={() => {
                    this.setState({selectedTab: 'nowPlayingTab'});
                    this.props.getDataAgain('nowPlaying');
                }}>

                    <View>
                        <Text></Text>
                    </View>
                </Icon.TabBarItem>

                <Icon.TabBarItem
                    title="Top Rated"
                    iconColor='gray'
                    selectedIconColor='black'
                    iconName="stars"
                    selected={this.state.selectedTab === 'topRatedTab'}
                    onPress={() => {
                    this.setState({selectedTab: 'topRatedTab'});
                    this.props.getDataAgain('topRated');
                }}>
                    <View>
                        <Text></Text>
                    </View>
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
}

module.exports = TabBar;