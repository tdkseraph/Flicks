import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ListView,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import Tarbar from '../components/tarbar.js'
import URI from '../global/uri.js'
import AppStyles from '../stylesheet/decoration.js'
        
export default class Movie extends Component {
    constructor() {
        super();
        this.renderMovieCell = this.renderMovieCell.bind(this);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(['']),
            isRefreshing: false,
            previousDataSource:{
                nowPlaying:[],
                topRated:[]
            },
            currentData:[],
            currentState:{
                NowPlayingPage:'nowPlaying',
                TopRatedPage:'topRated'
            }
        };
    }

    componentDidMount() {
        this.getMoviesFromApiAsync(URI.NowPlaying);
        this.refs.searchBar.focus();
    }

_pressRow(rowData){
   this.props.navigator.push({
     title:'DetailPage',
     passProps:rowData
   });
  }

    renderMovieCell(rowData) {
        return (           
            <TouchableOpacity onPress={() => this._pressRow(rowData)}>
                <View
                    style={AppStyles.cell_color}>
                    <View
                        style={AppStyles.poster_margin}>
                        <Image
                            style={AppStyles.poster_height}
                            source={{
                            uri: URI.Image + rowData.poster_path
                        }}/>
                    </View>

                    <View style={AppStyles.flex7}>
                        <Text
                            style={AppStyles.cell_title}>
                            {rowData.title}</Text>
                        <Text numberOfLines={4}>{rowData.overview}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    getMoviesFromApiAsync(uri) {
        return fetch(uri).then((response) => response.json()).then((responseJson) => {
            this.setState({
                dataSource: this
                    .state
                    .dataSource
                    .cloneWithRows(responseJson.results),
                isRefreshing: false,
                currentData:responseJson.results
            });

        }).catch((error) => {
            alert("Please check your network connection and try again later.");
            console.error(error);
        });
    }

    onRefeshListView() {
        this.setState({isRefreshing: true});
        this.getMoviesFromApiAsync();
    }

    searchMoviesList(text){
        if (!text){
            this.cancelSearchMoviesList();
            return;
        }

        var matchingMovies =[];
        this.state.currentData.forEach(function(movie)
         {
             if (movie.title.toLowerCase().match(text.toLowerCase())) 
                matchingMovies.push(movie)  
        })
        
        this.setState({
            dataSource: this
                    .state
                    .dataSource
                    .cloneWithRows(matchingMovies)
        })
    }

    cancelSearchMoviesList(){
       this.setState({
            dataSource: this
                    .state
                    .dataSource
                    .cloneWithRows(this.state.currentData)
        })
    }

    handleGetDataAgain(page){
        if (this.state.currentState.NowPlayingPage.match(page))
        {
            this.getMoviesFromApiAsync(URI.NowPlaying);           
        }
        else
         this.getMoviesFromApiAsync(URI.TopRated);
    }

    render() {
        let maxHeight = Dimensions.get('window').height;
        return (
            <View style={AppStyles.movie_container}>
                <View >
                    <SearchBar backgroundColor='orange'
                        ref='searchBar'
                        textColor='black'
                        placeholder='Search'
                        showsCancelButton={true}
                        hideBackground={true}
                        onChangeText={(text) => this.searchMoviesList(text)}
                        onSearchButtonPress={this.searchMoviesList}
                        onCancelButtonPress={() => this.cancelSearchMoviesList()}
                        barStyle="default"
                        searchBarStyle="default"/>
                </View>
                <View style={{height:maxHeight*0.81}}>
                   <ListView style={AppStyles.flex_column} 
                   refreshControl={
                    <RefreshControl refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onRefeshListView.bind(this)}/>} 
                            dataSource={this.state.dataSource} renderRow={this.renderMovieCell}/>
                </View>

                <View style={AppStyles.tarbar_height}>
                    <Tarbar getDataAgain={(page) => this.handleGetDataAgain(page)}/>
                </View>
            </View>
        )
    }
}