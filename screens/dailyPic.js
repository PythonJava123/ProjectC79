import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, SafeAreaView, Image, ImageBackground, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios'


export default class DailyPic extends React.Component{
    constructor(props){
        super(props)
        this.state={
            apod: {},
            date:'',
            explanation:'',
            mediaType:'',
            title:'',
            url:''
        }
    }
    getAPOD=()=>{
        axios.get("https://api.nasa.gov/planetary/apod?api_key=qaaKUFGgfmzstmc6cFgUPLPRknWt5T45aiFow1TU")
        .then(response=>{
            this.setState({
                apod: response.data,
            })
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }
    componentDidMount=()=>{
        this.getAPOD()
    }
    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}/>
                <ImageBackground
                    source={require('../assets/star-background.jpg')}
                    style={styles.bgImage}>
                <Text 
                    style={styles.routeText}>Astronomy Picture of the Day</Text>
                <Text 
                    style={styles.titleText}>{this.state.apod.title}</Text>
                <TouchableOpacity 
                        style={styles.listContainer}
                        onPress={()=>Linking.openURL(this.state.apod.url).catch(err=>console.error("couldnt load the page", err))}>
                <View 
                    style={styles.iconContainer}>
                <Image
                    source={require('../assets/play-video.ong')}
                    style={{width:50, height: 50}}></Image>
                </View>
                </TouchableOpacity>
                <Text style={styles.explanationText}>{this.state.apod.explanation}</Text>
                    </ImageBackground>
                    </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    safeArea:{
            marginTop: "Platform.OS === android"? StatusBar.currentHeight
                                                : 0
        },
    bgImage:{
        flex: 1,
        resizeMode: 'cover'

    },
    routeText:{
        fontSize: 50,
        fontWeight: 'bold',
        color: 'rgba(255, 0, 234, 1)',
        marginTop: 25,
        paddingLeft: 30
    },

    titleText:{
        fontSize: 30,
        color:'white',
        fontWeight: 'bold'
    },

    explanationText:{
        fontSize:'18',
        color: 'grey'
    }

})