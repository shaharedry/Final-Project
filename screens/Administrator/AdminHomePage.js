import React,{ useState } from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import colors from '../../constants/Colors'
import { NavigationActions ,StackActions } from 'react-navigation'

import { LogBox } from 'react-native'; /// unfreeze for running on phones
import AsyncStorage from '@react-native-async-storage/async-storage';

//LogBox.ignoreLogs(['Setting a timer']); /// unfreeze for running on phones

const AdminHomePage = props => {

    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Main' })],
      });
    return (
        <View style={styles.screen}>
            <Text>Admin Profile Screen</Text>
            <Text>Hello!</Text>
            <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text> 
            <View style={styles.buttonContainer}>
                <Button title="Crate a Social Worker User" onPress={() => {
                    props.navigation.navigate({routeName: 'signUp1'})
                    }} color={colors.secondery} />
            </View>
            <View style={styles.buttonContainer}>
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
    );
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding : 25,
        alignItems: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    buttonContainer:{
        width: 250,
        height: 90,
        justifyContent: 'center',
        paddingBottom: 10 ,
        paddingTop: 10,
        borderRadius: 10,
        color: 'red'
    }
})



export default AdminHomePage;