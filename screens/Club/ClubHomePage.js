import React,{ useState ,useEffect} from 'react';
import {View, Text, Alert, StyleSheet, Image, Button} from 'react-native';
import colors from '../../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigation } from 'react-navigation';
import { NavigationActions ,StackActions } from 'react-navigation'
import { LogBox } from 'react-native'; /// unfreeze for running on phones
import Navigation from '../../Navigation/Navigation';
import firebase ,{db} from '../../FireBase/fire'

//LogBox.ignoreLogs(['Setting a timer']); /// unfreeze for running on phones

class ClubHomePage extends React.Component {
    constructor(){
        super()
        this.state={
            Username:null,
            isLoaded:false,
            TranslatorHours: 45,
        }
    }
    resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Main' })],
      });
    
        componentDidMount(){
            let username = null    
            try{
                AsyncStorage.getItem('ClubName')
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

        WhoAMi(){
            db.collection('User').get().then( snapshot =>{
                snapshot.forEach( doc =>{
                    this.setState({uid:doc.data().uid})
                    this.setState({email:doc.data().email})
                    this.setState({fullname:doc.data().fullname})
                    this.setState({phone:doc.data().phone})
                    this.setState({id:doc.data().id})
                    this.setState({Role:doc.data().Role})
                    this.setState({checked:doc.data().checked})
                    this.setState({TranslatorHours:doc.data().TranslatorHours})
                    this.setState({Verified:doc.data().Verified})  
                    this.setState({BasketMoney:doc.data().BasketMoney})
                }
                )
            })
            this.setState({isLoaded:true})
            this.setState({gotname:true})
            this.UpdateInfo();
        }
    
        UpdateInfo(){
          db.collection("User").doc().update({
            TranslatorHours:this.state.TranslatorHours}
            )
            Alert.alert('Reset Yearly Interpreter Hours', 'reseted interpreter hours for all users ',
            [
                {
                    text: "OK",
                },
            ])
        }



    render(){
        if(this.state.isLoaded){
            return (
                <View style={styles.screen}>
                    <Text>ClubHomePage Profile Screen</Text>
                    <Text>Hello {this.state.Username}!</Text> 

                    <View style={styles.buttonContainer}>
                        <Button title="Club Info" onPress={() => {
                        this.props.navigation.navigate({routeName: 'ClubInfo'})
                            }} color={colors.secondery} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Delete Interpreter" onPress={() => {
                        this.props.navigation.navigate({routeName: 'DeleteInterpreter'})
                            }} color={colors.secondery} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Set Basket" onPress={() => {
                        this.props.navigation.navigate({routeName: 'Basket'})
                            }} color={colors.secondery} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Yearly Reset Translation Hours" onPress={() => {
                            Alert.alert('Reset Yearly Interpreter hours?', 'Are you sure you would like to reset interpreter hours for all users?',
                            [
                                {
                                    text: "Yes",
                                    onPress: () => {
                                       this.WhoAMi();
                                    },
                                },
                                {
                                    text: "No",
                                    onPress: () => {
                                        this.props.navigation.navigate({ routeName: 'ClubInfo' })
                                    }
                                },
                            ])
                            }} color={colors.secondery} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Logout" onPress={() => {
                            this.props.navigation.dispatch(this.resetAction);
                            // props.navigation.reset(
                            //     AsyncStorage.clear()
                            //     [NavigationActions.navigate({routeName: 'Main'})],
                            //     1,
                            // );
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
        height: 80,
        justifyContent: 'center',
        paddingBottom: 10 ,
        paddingTop: 10,
        borderRadius: 10,
        color: 'red'
    }
})



export default ClubHomePage;