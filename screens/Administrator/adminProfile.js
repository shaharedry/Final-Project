import React,{ useState } from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import colors from '../../constants/Colors'

import { LogBox } from 'react-native'; /// unfreeze for running on phones

//LogBox.ignoreLogs(['Setting a timer']); /// unfreeze for running on phones

const adminProfile = props => {

    const [user, setUser] = useState()

    return (
        <View style={styles.screen}>
            <Text>adminProfile Profile Screen</Text>
            <Text>Hello!</Text> 
            <View style={styles.buttonContainer}>
                <Button title="Sign Up as Social Worker" onPress={() => {
                    props.navigation.navigate({routeName: 'signUp1'})
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
    buttonContainer:{
        width: 150,
        height: 50,
        justifyContent: 'center',
        paddingBottom: 10 ,
        paddingTop: 10,
        borderRadius: 10,
        color: 'red'
    }
})



export default adminProfile;