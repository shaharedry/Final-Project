import {View, Text , TextInput, StyleSheet ,Button ,Alert, TouchableOpacity , setState} from 'react-native';
import React, { useState } from 'react';
import Input from '../components/Input';
import colors from '../constants/Colors';
import firebase ,{db} from '../FireBase/fire';
import ModalSelector from 'react-native-modal-selector'


class LoginV2 extends React.Component{
        constructor(){
            super()
            this.state= {
                email: null,
                password: null,
                textInputValue: 'User',
                textInputNum: 0,
                selectedLanguage : null,
                From: ['User', 'Translator','Social Worker','Club','Admin'],
                data: [],
                Loaded: true,
                checked: false
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

    CheckMe(){
        if(this.state.email != null && this.state.password !=null)
            return true;
        return false;
    }

    GoTo(type){
        if(type=='Admin'){
            this.props.navigation.navigate({routeName: 'AdminHomePage'})
        }
        if(type=='User'){
            this.props.navigation.navigate({routeName: 'UserHomePage'})
        }
        if(type=='Translator'){
            this.props.navigation.navigate({routeName: 'TransHomePage'})
        }
        if(type=='Social Worker'){
            this.props.navigation.navigate({routeName: 'SocialHomePage'})
        }
        if(type=='Club'){
            this.props.navigation.navigate({routeName: 'ClubHomePage'})
        }
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
                        onChangeText={(val)=>this.setState({email:val})}
                        //value={this.state.email}
                    />
                    <Input 
                        testID={'password'}
                        style={styles.inputField}
                        blurOnSubmit
                        autoCorrect={false}
                        placeholder='Password'
                        keyboardType="visible-password"
                        onChangeText={(val)=>this.setState({password:val})}
                        //value={this.state.password}
                        secureTextEntry={true}
                    />
                    <View style={styles.buttoncontainer}>
                        <Button title="Sign In" onPress={() => {
                            if(this.CheckMe()==true){
                                this.setState({checked:true})
                            }
                            else{
                                if(this.state.email==null && this.state.password==null)
                                    Alert.alert('Error!','Please enter an email and password!')
                                else{
                                    if(this.state.email==null)
                                        Alert.alert('Error!','Please enter an email!')
                                    if(this.state.password==null)
                                        Alert.alert('Error!','Please enter a password!')
                                }
                            }
                            let type = this.state.textInputValue
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

                            firebase
                            .auth()
                            .signInWithEmailAndPassword(this.state.email, this.state.password)
                            .then((res) => {
                                this.GoTo(type)
                            }
                            ).catch(error => this.setState({ errorMessage: error.message }))
                            }} color={colors.secondery} />
                    </View>
                    <View style={styles.Selection}>
                    <Text>Login as: 
                        <ModalSelector
                            // data={this.state.data}
                            // initValue="Select User to login"
                            // supportedOrientations={['landscape']}
                            // accessible={true}
                            // scrollViewAccessibilityLabel={'Scrollable options'}
                            // cancelButtonAccessibilityLabel={'Cancel Button'}
                            // onChange={(option)=>{ this.setState({textInputValue:option.label})}}>
                            data={this.state.data}
                            initValue='User'
                            keyExtractor= {item => item.id}
                            labelExtractor= {item => item.key}
                            onChange={(option)=>{ this.setState({textInputValue:option.key}), this.setState({textInputNum:option.id})}}>
                            {/* {Alert.alert('Picked',''+this.state.textInputValue+' value is : '+this.state.textInputNum)} */}

                            </ModalSelector>
                            {/* <TextInput
                                style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                                editable={false}
                                placeholder="Select User to login"
                                value={this.state.textInputValue} />
                            > */}
                         {/* </ModalSelector> */}
                         </Text>
                    </View>
                    <Text>Login as <Button title="Guest" onPress={() => {
                            firebase.auth().signInAnonymously().then(()=>{
                                this.props.navigation.navigate({routeName: 'GuestHomePage'})
                            }) .catch((error) =>{
                                Alert.alert('Error!',error)
                            })
                        } } color={colors.secondery} /></Text>
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