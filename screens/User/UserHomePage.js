import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button } from 'react-native';
import colors from '../../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigation } from 'react-navigation';
import { NavigationActions, StackActions } from 'react-navigation'
import { LogBox } from 'react-native'; /// unfreeze for running on phones
import Navigation from '../../Navigation/Navigation';
import Colors from '../../constants/Colors';
LogBox.ignoreLogs(['new NativeEventEmitter']);

//LogBox.ignoreLogs(['Setting a timer']); /// unfreeze for running on phones

var width = Dimensions.get('window').width
class UserHomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            Username: null,
            isLoaded: false
        }
    }
    resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });

    componentDidMount() {
        let username = null
        try {
            AsyncStorage.getItem('UserName')
                .then(value => {
                    if (value != null) {
                        username = value;
                        this.setState({ Username: username })
                    }
                })
        } catch (error) {
            console.warn(error)
        }
        this.setState({ isLoaded: true })
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <View style={styles.screen}>
                    <Text style={styles.setFontSizeOne}>Hello,{"\n"} {this.state.Username}!</Text>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Personal Info      " onPress={() => {
                                this.props.navigation.navigate({ routeName: 'UserInfo' })
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Interpreter List      " onPress={() => {
                                this.props.navigation.navigate({ routeName: 'ListOfInterp' })
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Basket Info      " onPress={() => {
                                this.props.navigation.navigate({ routeName: 'ViewBasket' })
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Report Interpreter Hours      " onPress={() => {
                                this.props.navigation.navigate({ routeName: 'ReportInterpHours' })
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Text to Speech      " onPress={() => {
                                this.props.navigation.navigate({ routeName: 'TextToSpeach' })
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Speech to Text      " onPress={() => {
                                this.props.navigation.navigate({ routeName: 'SpeechToText2' })
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Logout      " onPress={() => {
                                this.props.navigation.dispatch(this.resetAction);
                                // props.navigation.reset(
                                //     AsyncStorage.clear()
                                //     [NavigationActions.navigate({routeName: 'Main'})],
                                //     1,
                                // );
                            }} color={colors.secondery} />
                        </View>
                    </View>
                </View>
            );
        }
        else {
            return (
                <Text>Nothing Loaded,Please wait!</Text>
            )
        }
    }
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 25,
        alignItems: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 130,
    },
    ImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    box: {
        borderRadius: 16,
        backgroundColor: Colors.background,
        height: 40,

        //width: width / 2 - 10,
        margin: 5,
        marginBottom: 30
    },
    setFontSizeOne: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "bold",
        paddingBottom: 10
    },
    buttonContainer: {
        // width: 230,
        // height: 60,
        // justifyContent: 'center',
        // paddingBottom: 10 ,
        // paddingTop: 10,
        // borderRadius: 10,
        // color: 'red'
    }
})



export default UserHomePage;