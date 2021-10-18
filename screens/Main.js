import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, Button } from 'react-native'
import colors from '../constants/Colors';
import firebase ,{db} from '../FireBase/fire';

class Main extends React.Component {
    render(){
        return (
            <View>
            <View style={styles.ImageContainer}>
                <Image
                    source={require('../assets/Logo/logo3.png')}
                    resizeMode="cover"
                    style={styles.image}
                />
            </View>
            <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={() => {
                    this.props.navigation.navigate({routeName: 'LoginV2'})
                    }} color={colors.secondery} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Speak" onPress={() => {
                    this.props.navigation.navigate({routeName: 'TextToSpeach'})
                    }} color={colors.secondery} />
            </View>
            <View style={styles.buttonContainer}>
            <Button title="Login as Guest" onPress={() => {
                firebase.auth().signInAnonymously().then(()=>{
                    this.props.navigation.navigate({routeName: 'GuestHomePage'})
                }) .catch((error) =>{
                    Alert.alert('Error!',error)
                })
                } } color={colors.secondery} />
            </View>

        </View>
        </View>
    );
    }
};


const styles = StyleSheet.create({
screen: {
    flex: 1,
    padding : 100,
    alignItems: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
},
buttonContainer:{
    width: 250,
    height: 150,
    justifyContent: 'center',
    paddingBottom: 100 ,
    borderRadius: 10
},
ImageContainer: {
    width: 200,
    height: 150,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
},
image: {
    width: '100%',
    height: '100%'
}
})

export default Main;