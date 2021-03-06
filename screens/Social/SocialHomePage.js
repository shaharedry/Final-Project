import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Button, Alert } from 'react-native';
import colors from '../../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigation } from 'react-navigation';
import { NavigationActions, StackActions } from 'react-navigation'
import { LogBox } from 'react-native'; /// unfreeze for running on phones
import Navigation from '../../Navigation/Navigation';

//LogBox.ignoreLogs(['Setting a timer']); /// unfreeze for running on phones

var width = Dimensions.get('window').width
class SocialHomePage extends React.Component {
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
            AsyncStorage.getItem('SocialWorkerName')
                .then(value => {
                    if (value != null) {
                        username = value;
                        this.setState({ Username: username })
                        //Alert.alert('Title','name from async is: '+username)
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
                            <Button title="Create User" onPress={() => {
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
                            <Button title="Create Club User" onPress={() => {
                                this.props.navigation.navigate({ routeName: 'signUp4' })
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Verify User" onPress={() => {
                                this.props.navigation.navigate({ routeName: 'VerifyUser' })
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Verify Translator User" onPress={() => {
                                this.props.navigation.navigate({ routeName: 'VerifyTransUser' })
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Club Info" onPress={() => {
                                this.props.navigation.navigate({ routeName: 'SocialInfo' })
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Approve Hours" onPress={() => {
                                this.props.navigation.navigate({ routeName: 'ApproveHours' })
                            }} color={colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <Button title="Logout" onPress={() => {
                                this.props.navigation.dispatch(StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'Main' })],
                                }));
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
        backgroundColor: colors.background,
        height: 40,
        width: width / 2 - 10,
        margin: 5,
        marginBottom: 35,
        borderRadius: 16,

    },
    setFontSizeOne: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 50
    },
    // buttonContainer: {
    //     width: 250,
    //     height: 80,
    //     justifyContent: 'center',
    //     paddingBottom: 3,
    //     paddingTop: 3,
    //     borderRadius: 1,
    //     color: 'red'
    // }
})



export default SocialHomePage;