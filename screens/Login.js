import {View, Text, StyleSheet ,Button ,Alert} from 'react-native';
import React, { useState } from 'react';
import Input from '../components/Input';
import colors from '../constants/Colors';
import Firebase ,{db} from '../FireBase/fire';

const Login = props => {
    const [EmailInput,setEmail]= useState('');
    const [PassInput,setPass]= useState('');
    const EmailHandler = EmailText => {
        setEmail(EmailText.replace(/^(9,12)/))
    }
    const PassHandler = PassText => {
        setPass(PassText)
    }

    
    return(
        <View style={styles.InputContainer}>
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
            <View style={styles.buttoncontainer}>
                <Button title="Sign In" onPress={() => {
                    console.log('pressed Sign In');
                    db.collection("Admin").where("Email", "==", EmailInput).get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        if(querySnapshot!= null){
                            console.log("name from db collection: "+doc.data().fullname)
                            props.navigation.navigate({routeName: 'adminProfile'})
                        }
                        else{
                            Alert.alert('Error!','Please check info again!\nEmail is case sensitive')
                            console.log('Error!\nPlease check info again!\nEmail is case sensitive')          
                        }
                    })
                    })}} color={colors.secondery} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    buttonContainer:{
        width: 150,
        height: 50,
        justifyContent: 'center',
        paddingBottom: 10 ,
        paddingTop: 10,
        borderRadius: 10,
        color: 'blue'
    }
})   

export default Login;