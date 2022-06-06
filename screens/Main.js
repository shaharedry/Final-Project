import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, Button, Linking } from 'react-native'
import colors from '../constants/Colors';
import firebase, { db } from '../FireBase/fire';
import { LogBox } from 'react-native';
import { Dimensions } from 'react-native-web';
import Colors from '../constants/Colors';
LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['Require cycle']);
LogBox.ignoreLogs(['Console Warning']);
LogBox.ignoreLogs(['AsyncStorage']);
LogBox.ignoreLogs(['']);


var width = Dimensions.get('window').width
class Main extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.title}>
                    <Text style={styles.setFontSizeOne}>Ear-Me</Text>
                </View>
                {/* should put in Header in Navigation */}
                {/* <View style={styles.ImageContainer}>
                    <Image
                        source={require('../assets/Logo/logo3.png')}
                        resizeMode="cover"
                        style={styles.image}
                    />
                </View>  */}
                <View style={styles.screen}>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Login" onPress={() => {
                                this.props.navigation.navigate('LoginV2')
                                //    this.props.navigation.navigate({routeName: 'LoginV2'})
                            }} color={colors.secondery} />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Text to Speach" onPress={() => {
                                this.props.navigation.navigate('TextToSpeach')
                                // this.props.navigation.navigate({ routeName: 'TextToSpeach' })
                            }} color={colors.secondery} />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Speach to Text" onPress={() => {
                                this.props.navigation.navigate({ routeName: 'SpeechToText2' })
                            }} color={colors.secondery} />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Create Deaf User" onPress={() => {
                                this.props.navigation.navigate({ routeName: 'Request2' })
                            }} color={colors.secondery} />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Create Translator User" onPress={() => {
                                this.props.navigation.navigate({ routeName: 'Request3' })
                            }} color={colors.secondery} />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Translator List" onPress={() => {
                                this.props.navigation.navigate({ routeName: '' })
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    {/* <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                        <Button title="Login as Guest" onPress={() => {
                            firebase.auth().signInAnonymously().then(() => {
                                this.props.navigation.navigate({ routeName: 'GuestHomePage' })
                            }).catch((error) => {
                                Alert.alert('Error!', error)
                            })
                        }} color={colors.secondery} />
                        </View>
                    </View> */}
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Interpreter Site" onPress={() => {
                                Linking.openURL('https://www.signnow.co.il/')
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    {/* <View style={styles.buttonContainer}>
            <Button title="Login as Guest" onPress={() => {
                firebase.auth().signInAnonymously().then(()=>{
                    this.props.navigation.navigate({routeName: 'GuestHomePage'})
                }) .catch((error) =>{
                    Alert.alert('Error!',error)
                })
                } } color={colors.secondery} />
            </View> */}
                </View>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 40,
        alignItems: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        //flexWrap:'wrap',
        justifyContent: 'space-between',
    },
    box: {
        backgroundColor: Colors.background,
        height: 40,
        width: width / 2 - 10,
        margin: 5,
        marginBottom: 35,
        borderRadius: 16,
    }, setFontSizeOne: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "bold",
        //paddingBottom: 10,
        paddingTop: 10
    },
    // buttonContainer: {
    //     width: 250,
    //     height: 80,
    //     // justifyContent: 'center',
    //     // paddingBottom: 20 ,
    //     // borderRadius: 10
    // },
    ImageContainer: {
        width: 200,
        height: 80,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        alignItems: "center",
    }
})

export default Main;