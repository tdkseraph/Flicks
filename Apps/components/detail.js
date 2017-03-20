import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    ListView,
    TextInput,
    Animated,
    Image,
    LayoutAnimation,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import URI from '../global/uri.js';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from '../stylesheet/decoration.js'

export default class Detail extends Component{
     constructor() {
     super();
     this.state = {
       height: 400,
       line : 4,
       marginScroll: 600
     }
  }

  clickToOpen(){
    var height = this.state.height;
    var line = this.state.line;
    var marginScroll = this.state.marginScroll;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({
      height,
      line,
      marginScroll
    })
  }

    render(){
     let maxHeight = (Dimensions.get('window').height * 0.8).toFixed(0);
    return(       
        <View style={AppStyles.flex1}>
         <View style={AppStyles.nav_btn}>
            <Button style={AppStyles.padd10} onPress={() => {
            this.props.navigator.pop({title:'MoviePage',passProps:''})
        }} color='gray' title='< Back'/>
        </View>

        <View style={AppStyles.flex9} >
        <Image style={AppStyles.detail_imageContainer} source={{uri: URI.ImageOriginal+ this.props.data.poster_path}}>       

        <ScrollView>
            <TouchableOpacity onPress={() => this.clickToOpen()}>
              <View style={AppStyles.detail_box}>
                     <Text style={AppStyles.txt_bold}>{this.props.data.title}</Text>
                
                <Text style={AppStyles.color_white}>
                <Icon name='local-play' size={16} color='white'/> {Moment(this.props.data.release_date).format ('MMMM Do, YYYY')}</Text>
                <View style={AppStyles.flexRow_space}>
                
                <Text style={AppStyles.txt_alignRight}>
                <Icon name='favorite' size={16} color='white'/> {this.props.data.popularity.toFixed(0)} %</Text>
                 <Text style={AppStyles.txt_alignLeft}>
                 <Icon name='rate-review' size={16} color='white'/> Vote: {this.props.data.vote_average}</Text>
                </View>
                <Text style={AppStyles.detail_overview}>
                  {this.props.data.overview}
                  </Text>
             
              </View>
            </TouchableOpacity>
        </ScrollView>
      
        </Image>
        </View>
        </View>
    )
}
}
