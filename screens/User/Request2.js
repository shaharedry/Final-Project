import React, { useCallback, useState } from 'react';
import {View, Text, StyleSheet ,Button, Alert } from 'react-native';
import Firebase, {db} from '../../FireBase/fire';
import colors from '../../constants/Colors';
import Input from '../../components/Input';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const Request2 = props => {
   
    const [FullnameInput,setFname]= useState('');
    const FullnameHandler = FullnameText => {
        setFname(FullnameText.replace(/[^A-Za-z]+[^A-Za-z]/))
    }

    const [EmailInput,setEmail]= useState('');
    const EmailHandler = EmailText => {
        setEmail(EmailText.replace(/^[0-9](9,12)/))
    }

    const [PhoneInput,setPhone]= useState('');
    const PhoneHandler = PhoneText => {
        setPhone(PhoneText.replace(/^[0-9](9,12)/))
    }
    
    const [IDInput,setID]= useState('');
    const IDHandler = IDText => {
        setID(IDText.replace(/^[0-9](9,9)/))
    }
    
    const [PassInput,setPass]= useState('');
    const PassHandler = PassText => {
        setPass(PassText)
    }
    
    const [VerifyPass, setVerifyPass] = useState ('');
    const VerifyHandler = VerifyPassText =>{
        setVerifyPass(VerifyPassText)
    }

    const signup = async() =>{ 
        try{
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
                    TranslatorHours:null,
                    Verified: 'false'
                }
                db.collection('User')
                    .doc(FullnameInput)
                    .set(user)
                //AddItem('ChildFullname',user.fullname);
                //AddItem('ChildId', user.id)
                //AddItem('ChildPhone', user.phonenum)
                
                Alert.alert(
                    "Created Succesfully",
                    "Deaf user "+FullnameInput+" User has been created succesfully!",
                    [
                      { text: "OK", onPress: () => props.navigation.navigate({routeName: 'Main'}) } //fix later
                    ]
                  );
            }

        } catch (e){
            if(e.code == 'auth/invalid-email'){
                Alert.alert("Bad Email!", e.message)
                console.log(e);
            }
            if(e.code == 'auth/email-already-in-use'){
                Alert.alert("This Email is already Registered!", "The email address is already in use by another account.")
                console.log(e);
            }
            else{
                Alert.alert(e.code,e.message)
                console.log(e);
            }
        }
    }

    return (
        <View style={styles.InputContainer}>
            <Text>Sign Up as User</Text>
            <Input
                testID={'fullname'}
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Full Name'
                keyboardType="ascii-capable"
                onChangeText={FullnameHandler}
                value={FullnameInput}
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
            />
            <Input 
                testID={'phone'}
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Phone'
                keyboardType="phone-pad"
                onChangeText={PhoneHandler}
                value={PhoneInput}
            />
            <Input
                testID={'id'}
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='ID number'
                keyboardType="number-pad"
                onChangeText={IDHandler}
                value={IDInput}
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
            />
            <View style={styles.buttonContainer}>
                        <Button title="Sign Up" onPress={() => {
                            if(PassInput!=''){
                                if(VerifyPass==PassInput){
                                    signup();
                                }
                                else{
                                    Alert.alert(
                                        'Error',
                                        'Passwords do no match!',
                                        [
                                          {text: 'OK'}
                                        ],
                                        {cancelable: false},
                                      );
                                      console.log(VerifyPass);
                                }
                            }
                            else{
                                Alert.alert(
                                    'Error',
                                    'Please enter a Password',
                                    [
                                      {text: 'OK'}
                                    ],
                                    {cancelable: false},
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
    width:180,
    borderRadius: 18,
    borderWidth: 1
},
buttonContainer:{
    width: 250,
    height: 150,
    justifyContent: 'center',
    paddingBottom: 100 ,
    borderRadius: 10
}
})


export default Request2;