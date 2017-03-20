import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    View,
    StatusBar,
    Navigator
} from 'react-native';
import MoviePage from '../Apps/components/movies.js';
import DetailPage from '../Apps/components/detail.js'

const routers = [
    {
        title: 'MoviePage',
        index: 0,
        passProps: {}
    }, {
        title: 'DetailPage',
        index: 1,
        passProps: {}
    }
]

export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        var globalNavigatorProps = {
            navigator
        }
        switch (route.title) {
            case "MoviePage":
                {
                    return (
                        <View>
                            <MoviePage navigator={this.props.navigator} {...globalNavigatorProps}/>
                        </View>
                    )
                }
            case "DetailPage":
                {
                    return (<DetailPage
                        data={route.passProps}
                        navigator={this.props.navigator}
                        {...globalNavigatorProps}/>)
                }
        }
    }

    render() {
        return (<Navigator
            initialRoute={routers[0]}
            renderScene={(route, navigator) => this.renderScene(route, navigator)}/>)
    };
}