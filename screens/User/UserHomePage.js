import React,{ useState ,useEffect} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import colors from '../../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigation } from 'react-navigation';

import { LogBox } from 'react-native'; /// unfreeze for running on phones
import Navigation from '../../Navigation/Navigation';

//LogBox.ignoreLogs(['Setting a timer']); /// unfreeze for running on phones

class UserHomePage extends React.Component {
    constructor(){
        super()
        this.state={
            Username:null,
            isLoaded:false
        }
    }
    
        componentDidMount(){
            let username = null    
            try{
                AsyncStorage.getItem('UserName')
                    .then(value => {
                        if(value!= null) {
                            username=value;
                            this.setState({Username:username})
                        }
                    })
                } catch (error){
                    console.warn(error)
            }
            this.setState({isLoaded:true})
        }

    resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });

    render(){
        if(this.state.isLoaded){
            return (
                <View style={styles.screen}>
                    <Text>UserHomePage Profile Screen</Text>
                    <Text>Hello {this.state.Username}!</Text> 

                    <View style={styles.buttonContainer}>
                        <Button title="Personal Info" onPress={() => {
                        this.props.navigation.navigate({routeName: 'UserInfo'})
                            }} color={colors.secondery} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Logout" onPress={() => {
                                props.navigation.dispatch(resetAction);
                            }} color={colors.secondery} />
                    </View>
                </View>   
            );
        }
        else{
            return(
                <Text>Nothing Loaded,Please wait!</Text>
            )
        }
    }
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



export default UserHomePage;