import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity, setState } from 'react-native';
import React, { useState } from 'react';
import Input from '../components/Input';
import colors from '../constants/Colors';
import firebase, { db } from '../FireBase/fire';
import ModalSelector from 'react-native-modal-selector'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationActions } from 'react-navigation'
import { State } from 'react-native-gesture-handler';

class LoginV2 extends React.Component {
    constructor() {
        super()
        this.state = {
            email: null,
            password: null,
            fullname: null,
            textInputValue: 'User',
            textInputNum: 0,
            selectedLanguage: null,
            From: ['User', 'Interpreter', 'Social Worker', 'Club Worker', 'Admin'],
            data: [],
            Loaded: true,
            checked: false
        }
    }
    componentDidMount() {
        let Temp = this.state.From
        let FormatData = []
        let lod = true
        for (let i = 0; i < Temp.length; i++) {
            FormatData.push({
                id: i,
                key: Temp[i]
            })
        }
        this.state.data = FormatData
        this.setState({ data: FormatData })
    }

    CheckMe() {
        if (this.state.email != null && this.state.password != null)
            return true;
        return false;
    }

    GoTo(type) {
        //Alert.alert('Name from GoTo is: ' + this.state.fullname)
        if (type == 'Admin') {
            //Alert.alert('Checking!','fullname is: '+this.state.whatchyamacallit)
            this.props.navigation.reset(
                [NavigationActions.navigate({ routeName: 'AdminHomePage' })],
                0,
            );
        }
        if (type == 'User') {
            this.AddItem('UserName', this.state.fullname);
            //Alert.alert('Checking!','fullname  is: '+this.state.whatchyamacallit)
            this.props.navigation.reset(
                [NavigationActions.navigate({ routeName: 'UserHomePage' })],
                0,
            );
        }
        if (type == 'Interpreter') {
            this.AddItem('TranslatorName', this.state.fullname);
            this.props.navigation.reset(
                [NavigationActions.navigate({ routeName: 'TransHomePage' })],
                0,
            );
        }
        if (type == 'Social Worker') {
            //Alert.alert('Title','name is: '+this.state.fullname )
            this.AddItem('SocialWorkerName', this.state.fullname);
            this.props.navigation.reset(
                [NavigationActions.navigate({ routeName: 'SocialHomePage' })],
                0,
            );
        }
        if (type == 'Club Worker') {
            this.AddItem('ClubName', this.state.fullname);
            this.props.navigation.reset(
                [NavigationActions.navigate({ routeName: 'ClubHomePage' })],
                0,
            );
        }
    }

    AddItem = async (saveas, save) => {
        try {
            console.log("saving to async storage: " + save)
            await AsyncStorage.setItem(saveas, save)
        } catch (error) {
            console.warn(error)
        }
    }

    render() {
        if (this.state.Loaded) {
            return (
                <View style={styles.screen}>
                    <Text style={styles.setFontSizeOne}>Login</Text>
                    <View style={styles.InputContainer}>
                        <View >
                            <Text>Login as:</Text>
                            <Text></Text>
                            <ModalSelector

                                data={this.state.data}
                                initValue='User'
                                keyExtractor={item => item.id}
                                labelExtractor={item => item.key}
                                onChange={(option) => { this.setState({ textInputValue: option.key }), this.setState({ textInputNum: option.id }) }}>

                            </ModalSelector>
                        </View>
                        <Text></Text>

                        <Text>Email:</Text>
                        <Input
                            label="Email"
                            testID={'email'}
                            style={styles.inputField}
                            blurOnSubmit
                            autoCorrect={false}
                            placeholder='Email'
                            keyboardType="email-address"
                            onChangeText={(val) => this.setState({ email: val })}
                        //value={this.state.email}
                        />
                        <Text>Password:</Text>
                        <Input
                            testID={'password'}
                            style={styles.inputField}
                            blurOnSubmit
                            autoCorrect={false}
                            placeholder='Password'
                            keyboardType="visible-password"
                            onChangeText={(val) => this.setState({ password: val })}
                            //value={this.state.password}
                            secureTextEntry={true}
                        />





                        <View style={styles.box}>
                            <View style={styles.buttoncontainer}>
                                <Button title="Sign In" onPress={() => {
                                    if (this.CheckMe() == true) {
                                        this.setState({ checked: true })
                                    }
                                    else {
                                        if (this.state.email == null && this.state.password == null)
                                            Alert.alert('Error!', 'Please enter an email and password!')
                                        else {
                                            if (this.state.email == null)
                                                Alert.alert('Error!', 'Please enter an email!')
                                            if (this.state.password == null)
                                                Alert.alert('Error!', 'Please enter a password!')
                                        }
                                    }
                                    let type = this.state.textInputValue
                                    //Alert.alert("Value is: "+this.state.textInputValue +"Num is: "+this.state.textInputNum)
                                    let EmailInput = this.state.email
                                    let PassInput = this.state.password
                                    // firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
                                    //    (res) => {
                                    //      this.GoTo(type)
                                    // }
                                    // ).catch(error => this.setState({ errorMessage: error.message }))
                                    // }} color={colors.secondery} />
                                    let tempname = null;
                                    firebase.auth().signInWithEmailAndPassword(EmailInput, PassInput)
                                        .then(
                                            (res) => {
                                                db.collection(type).where("email", "==", EmailInput).get().then(
                                                    snapshot => {
                                                        snapshot.forEach(
                                                            function (doc) {
                                                                // if(doc.data().email == EmailInput)
                                                                tempname = doc.data().fullname
                                                                //Alert.alert('Name from db is: '+tempname)
                                                                //Alert.alert('Checking!','fullname  is: '+tempname)
                                                                //this.GoTo(type);
                                                            }
                                                        )
                                                            ,
                                                            //Alert.alert('Checking!','fullname  is: '+tempname),
                                                            this.setState({ fullname: tempname }),
                                                            //Alert.alert('Name in fullname is: '+tempname)
                                                            this.GoTo(type)
                                                    }
                                                )
                                                //this.setState({whatchyamacallit:tempname})
                                                //Alert.alert('Checking!','fullname  is: '+this.state.whatchyamacallit+' should be '+tempname)
                                                //this.GoTo(type)
                                            }
                                        )
                                }}color={colors.secondery} />
                            </View>
                        </View>

                    </View>

                </View>
            )
        }
        else {
            return (
                <Text>Still Loading..</Text>
            )
        }
    }
};



// db.collection(type).where("Email", "==", this.state.email).get().then(function(querySnapshot) {
// querySnapshot.forEach(function(doc) {
//     if(querySnapshot!= null){
//         console.log("name from db collection: "+doc.data().fullname)
//         Alert.alert("Gothere")

//     }
//     else{
//         Alert.alert('Error!','Please check info again!\nEmail is case sensitive')
//         console.log('Error!\nPlease check info again!\nEmail is case sensitive')          
//     }
// })
// })

// firebase
// .auth()
// .signInWithEmailAndPassword(this.state.email, this.state.password)
// .then((res) => {

//     this.GoTo(type)
// }
// ).catch(error => this.setState({ errorMessage: error.message }))
// }} color={colors.secondery} />


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Selection: {
        //flex: 1,
        height: 100,
        width: 200,
        justifyContent: 'space-between',
    }, setFontSizeOne: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "bold",
        //paddingBottom: 10,
        paddingTop: 10
    },
    InputContainer: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: 250,
        //height: windowHeight /15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1
    },
    box: {
        backgroundColor: colors.background,
        height: 40,
        margin: 5,
        marginBottom: 35,
        borderRadius: 16,
    },
    // buttoncontainer: {
    //     width: 150,
    //     height: 50,
    //     justifyContent: 'center',
    //     paddingBottom: 10,
    //     paddingTop: 10,
    //     borderRadius: 10,
    //     color: 'blue'
    // },
})

export default LoginV2;