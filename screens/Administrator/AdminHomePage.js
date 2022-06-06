import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions } from 'react-native';
import colors from '../../constants/Colors'
import { NavigationActions, StackActions } from 'react-navigation'

import { LogBox } from 'react-native'; /// unfreeze for running on phones
import AsyncStorage from '@react-native-async-storage/async-storage';

//LogBox.ignoreLogs(['Setting a timer']); /// unfreeze for running on phones

var width = Dimensions.get('window').width

const AdminHomePage = props => {

    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });
    return (
        <View style={styles.screen}>
            <View style={styles.title}>
                <Text style={styles.setFontSizeOne}>Admin Profile Screen</Text>
            </View>
            <Text></Text><Text></Text><Text></Text><Text></Text>
            <Text></Text><Text></Text><Text></Text><Text></Text>
            <View style={styles.box2}>
                <View >
                    <Button title="Create a Social Worker User" onPress={() => {
                        props.navigation.navigate({ routeName: 'signUp1' })
                    }} color={colors.secondery} />
                </View>
            </View>
            <View style={styles.box}>
                <View >
                    <Button title="Logout" onPress={() => {
                        props.navigation.dispatch(resetAction);
                        // props.navigation.reset(
                        //     AsyncStorage.clear()
                        //     [NavigationActions.navigate({routeName: 'Main'})],
                        //     0,
                        // );
                    }} color={colors.secondery} />
                </View>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 25,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    }, setFontSizeOne: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "bold",
        //paddingBottom: 10,
        paddingTop: 10
    },
    title: {
        alignItems: "center",
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
    buttonContainer: {
        width: 250,
        height: 90,
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 10,
        color: 'red'
    },
    box: {
        backgroundColor: colors.background,
        height: 40,
        width: width / 2 - 110,
        margin: 5,
        marginBottom: 35,
        borderRadius: 16,
        alignSelf:'center'
    },
    box2: {
        backgroundColor: colors.background,
        height: 40,
        width: width / 2 + 50,
        margin: 5,
        marginBottom: 35,
        borderRadius: 16,
        alignSelf:'center'
    },
})



export default AdminHomePage;