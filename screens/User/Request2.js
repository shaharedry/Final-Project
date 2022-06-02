import React, { useRef, useCallback, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Button, Alert } from 'react-native';
import Firebase, { db } from '../../FireBase/fire';
import colors from '../../constants/Colors';
import Input from '../../components/Input';
import { TextInput } from 'react-native-paper';
//import AsyncStorage from '@react-native-async-storage/async-storage';


var width = Dimensions.get('window').width
const Request2 = props => {

    const [FullnameInput, setFname] = useState('');
    const FullnameHandler = FullnameText => {
        setFname(FullnameText.replace(/[^A-Za-z]+[^A-Za-z]/))
    }

    const [EmailInput, setEmail] = useState('');
    const EmailHandler = EmailText => {
        setEmail(EmailText.replace(/^[0-9](9,12)/))
    }

    const [PhoneInput, setPhone] = useState('');
    const PhoneHandler = PhoneText => {
        setPhone(PhoneText.replace(/^[0-9](9,12)/))
    }

    const [IDInput, setID] = useState('');
    const IDHandler = IDText => {
        setID(IDText.replace(/^[0-9](9,9)/))
    }

    const [PassInput, setPass] = useState('');
    const PassHandler = PassText => {
        setPass(PassText)
    }

    const [VerifyPass, setVerifyPass] = useState('');
    const VerifyHandler = VerifyPassText => {
        setVerifyPass(VerifyPassText)
    }

    const signup = async () => {
        try {
            const response = await Firebase.auth().createUserWithEmailAndPassword(EmailInput, PassInput)
            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    email: EmailInput,
                    fullname: FullnameInput,
                    phone: PhoneInput,
                    id: IDInput,
                    Role: '2',
                    checked: false,
                    TranslatorHours: null,
                    Verified: 'false',
                    BasketMoney: 3000
                }
                db.collection('User')
                    .doc(FullnameInput)
                    .set(user)
                //AddItem('ChildFullname',user.fullname);
                //AddItem('ChildId', user.id)
                //AddItem('ChildPhone', user.phonenum)

                Alert.alert(
                    "Created Succesfully",
                    "Deaf user " + FullnameInput + " User has been created succesfully!",
                    [
                        { text: "OK", onPress: () => props.navigation.navigate({ routeName: 'Main' }) } //fix later
                    ]
                );
            }

        } catch (e) {
            if (e.code == 'auth/invalid-email') {
                Alert.alert("Bad Email!", e.message)
                console.log(e);
            }
            if (e.code == 'auth/email-already-in-use') {
                Alert.alert("This Email is already Registered!", "The email address is already in use by another account.")
                console.log(e);
            }
            else {
                Alert.alert(e.code, e.message)
                console.log(e);
            }
        }
    }

    const ref_email = useRef(null);
    const ref_phone = useRef();
    const ref_id = useRef();
    const ref_pass = useRef();
    const ref_verify = useRef();
    return (
        <View style={styles.InputContainer}>
            <Text style={{ color: "darkblue" }}>Request to Sign Up as Deaf User</Text>
            <Input
                testID={'fullname'}
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                autoFocus={true}
                placeholder='Full Name'
                keyboardType="ascii-capable"
                onChangeText={FullnameHandler}
                value={FullnameInput}
                //returnKeyType="next"
                //onSubmitEditing={() => { ref_email.current.focus() }}
            />
            <Input
                testID={'email'}
                ref={ref_email}
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Email'
                keyboardType="email-address"
                onChangeText={EmailHandler}
                value={EmailInput}
                //returnKeyType="next"
                //onSubmitEditing={() => { this.ref_phone.focus(); }}
            />
            <Input
                testID={'phone'}
                ref={ref_phone}
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Phone'
                keyboardType="phone-pad"
                onChangeText={PhoneHandler}
                value={PhoneInput}
                //returnKeyType="next"
                //onSubmitEditing={() => { this.ref_id.focus(); }}
            />
            <Input
                testID={'id'}
                ref={ref_id}
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='ID number'
                keyboardType="number-pad"
                onChangeText={IDHandler}
                value={IDInput}
                //returnKeyType="next"
                //onSubmitEditing={() => { this.ref_password.focus(); }}
            />
            <Input
                testID={'password'}
                ref={ref_pass}
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Password'
                keyboardType="visible-password"
                onChangeText={PassHandler}
                value={PassInput}
                secureTextEntry={true}
                //returnKeyType="next"
                //onSubmitEditing={() => { this.ref_verify.focus(); }}
            />
            <Input
                style={styles.inputField}
                ref={ref_verify}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Verify Password'
                keyboardType="visible-password"
                onChangeText={VerifyHandler}
                value={VerifyPass}
                secureTextEntry={true}
                // returnKeyType="Done"
                // onSubmitEditing={() => { }}
            />
            <View style={styles.box}>
                <Button title="Sign Up" onPress={() => {
                    if (PassInput != '') {
                        if (VerifyPass == PassInput) {
                            signup();
                        }
                        else {
                            Alert.alert(
                                'Error',
                                'Passwords do no match!',
                                [
                                    { text: 'OK' }
                                ],
                                { cancelable: false },
                            );
                            console.log(VerifyPass);
                        }
                    }
                    else {
                        Alert.alert(
                            'Error',
                            'Please enter a Password',
                            [
                                { text: 'OK' }
                            ],
                            { cancelable: false },
                        );
                        console.log("No Password!");
                    }
                }} color={colors.secondery} />
            </View>
        </View>
        //</TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({
    screen: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        borderColor: '#acc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    box: {
        backgroundColor:colors.background,
        height: 40,
        width: width / 2 - 10,
        margin: 5,
        marginBottom: 35,
        borderRadius: 16,
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
        marginTop: 15,
        marginBottom: 10,
        fontSize: 16,
        width: 240,
        borderRadius: 30,
        borderWidth: 1
    },
    // buttonContainer:{
    //     width: 250,
    //     height: 150,
    //     justifyContent: 'center',
    //     paddingBottom: 100 ,
    //     borderRadius: 10
    // }
})


export default Request2;