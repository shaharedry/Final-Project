import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import colors from '../constants/Colors';

const Main= props => {
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
                props.navigation.navigate({routeName: 'Login'})
                }} color={colors.secondery} />
        </View>
        <View style={styles.buttonContainer}>
            <Button title="Enter as guest" onPress={() => {
                props.navigation.navigate({routeName: 'guestScreen'});
                }} color={colors.secondery}/>
        </View>
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