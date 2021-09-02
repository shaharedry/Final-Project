import {View, Text , TextInput, StyleSheet ,Button ,Alert, TouchableOpacity , setState} from 'react-native';
import React, { useState } from 'react';
import Input from '../components/Input';
import colors from '../constants/Colors';
import Firebase ,{db} from '../FireBase/fire';
import {Picker} from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector'

class LoginV2 extends React.Component {
        constructor(){
            super()
            this.state= {
                email: null,
                password: null,
                textInputValue: '',
                selectedLanguage : null,
                From: ['Social Worker', 'User','whatever'],
                data: [],
                Loaded: true
            }
        }
    componentDidMount(){
        let Temp = this.state.From
        let FormatData = []
        let lod = true
        for(let i=0;i<Temp.length;i++){
            FormatData.push({
                id:i,
                key:Temp[i]
            })
        }
        this.state.data=FormatData
        this.setState({data:FormatData})
    }

    EmailHandler(){

    }
    PassHandler(){
        
    }

    render() {
        if (this.state.Loaded){
            return(
                <View style={styles.screen}>
                <View style={styles.InputContainer}>
                    <Input
                        testID={'email'} 
                        style={styles.inputField}
                        blurOnSubmit
                        autoCorrect={false}
                        placeholder='Email'
                        keyboardType="email-address"
                        onChangeText={this.EmailHandler}
                        value={this.state.email}
                    />
                    <Input 
                        testID={'password'}
                        style={styles.inputField}
                        blurOnSubmit
                        autoCorrect={false}
                        placeholder='Password'
                        keyboardType="visible-password"
                        onChangeText={this.PassHandler}
                        value={this.state.password}
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
                    <View style={styles.Selection}>
                    <Text>Login as: </Text>
                        <ModalSelector
                            // data={this.state.data}
                            // initValue="Select User to login"
                            // supportedOrientations={['landscape']}
                            // accessible={true}
                            // scrollViewAccessibilityLabel={'Scrollable options'}
                            // cancelButtonAccessibilityLabel={'Cancel Button'}
                            // onChange={(option)=>{ this.setState({textInputValue:option.label})}}>
                            data={this.state.data}
                            keyExtractor= {item => item.id}
                            labelExtractor= {item => item.key}
    
                            // <TextInput
                            //     style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                            //     editable={false}
                            //     placeholder="Select User to login"
                            //     value={this.state.textInputValue} />
                            />
                         {/* </ModalSelector> */}
                    </View>
                </View>
                </View>
            );
        }
        else{
            return(
                <Text>Still Loading..</Text>
            )
        }
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Selection:{
        //flex: 1,
        height: 100,
        width: 200,
        justifyContent: 'space-between',
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

export default LoginV2;