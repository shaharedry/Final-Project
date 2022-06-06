import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert , Dimensions} from 'react-native';
import Firebase, { db } from '../../FireBase/fire';
import Input from '../../components/Input';
import color from '../../constants/Colors'
//import AsyncStorage from '@react-native-async-storage/async-storage';

var width = Dimensions.get('window').width

const signUp1 = props => {

    const [FullnameInput, setFname] = useState('');
    const FullnameHandler = FullnameText => {
        setFname(FullnameText.replace(/[^A-Za-z]+[^A-Za-z]/))
    }

    const [EmailInput, setEmail] = useState('');
    const EmailHandler = EmailText => {
        setEmail(EmailText.replace(/^[0-9](9,12)/))
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
                    Role: '1',
                    Verified: 'false',
                    checked: false
                }
                db.collection('SocialWorker')
                    .doc(FullnameInput)
                    .set(user)
                //AddItem('ChildFullname',user.fullname);
                //AddItem('ChildId', user.id)
                //AddItem('ChildPhone', user.phonenum)

                Alert.alert(
                    "Created Succesfully",
                    "Social Worker " + FullnameInput + " User has been created succesfully!",
                    [
                        { text: "OK", onPress: () => props.navigation.navigate({ routeName: 'AdminHomePage' }) } //fix later
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

    return (
        <View style={styles.InputContainer}>
             <Text style={styles.setFontSizeOne}>Sign Up Social Worker Account</Text>
            <Input
                testID={'fullname'}
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Full Name'
                keyboardType="ascii-capable"
                onChangeText={FullnameHandler}
                value={FullnameInput}
                placeholderTextColor='black'
            />
            <Input
                testID={'email'}
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Email'
                keyboardType="email-address"
                onChangeText={EmailHandler}
                value={EmailInput}
                placeholderTextColor='black'
            />
            <Input
                testID={'password'}
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Password'
                keyboardType="visible-password"
                onChangeText={PassHandler}
                value={PassInput}
                secureTextEntry={true}
                placeholderTextColor='black'
            />
            <Input
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Verify Password'
                keyboardType="visible-password"
                onChangeText={VerifyHandler}
                value={VerifyPass}
                secureTextEntry={true}
                placeholderTextColor='black'
            />
            <View style={styles.box}>
                <View >
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
                    }} color={color.secondery} />
                </View>
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
        width: 180,
        borderRadius: 18,
        borderWidth: 1
    },
    buttonContainer: {
        width: 250,
        height: 150,
        justifyContent: 'center',
        paddingBottom: 100,
        borderRadius: 10
    },
    box: {
        backgroundColor: color.background,
        height: 40,
        width: width / 2 - 110,
        margin: 5,
        marginBottom: 35,
        borderRadius: 16,
        marginTop:150
    },
    setFontSizeOne: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 50
    },
})


export default signUp1;