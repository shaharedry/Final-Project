import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import colors from '../../constants/Colors';

const guestScreen= props => {
    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button title="Sign Up as Social Worker" onPress={() => {
                    props.navigation.navigate({routeName: 'signUp1'})
                    }} color={colors.secondery} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Sign Up as Deaf" onPress={() => {
                    props.navigation.navigate({routeName: 'signUp2'});
                    }} color={colors.secondery}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Sign Up as interpreter" onPress={() => {
                    props.navigation.navigate({routeName: 'signUp3'});
                    }} color={colors.secondery}/>
            </View>
        </View>
    );
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
    }
})


export default guestScreen;