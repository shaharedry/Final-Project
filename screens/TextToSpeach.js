import React, {Component} from 'react'
import {View, Button, StyleSheet, TextInput} from 'react-native'
import * as Speech from 'expo-speech';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput'
import colors from '../constants/Colors';

class TextToSpeach extends Component {
    constructor(){
        super()
        this.state={
            txtSpeach:'Enter Text please',
            pressed:false
        }
    }
    speak(txt,state){
            Speech.speak(txt);
    };

    ChangeVal(){
        this.setState({pressed:!this.state.pressed})
    }

    render(){
        return (
        <View style={styles.container}>
                <AutoGrowingTextInput
                    style={styles.textInput}
                    placeholder="Enter text"
                    onChangeText={(val)=>this.setState({txtSpeach:val})}
                />
                <Button title="Speak" onPress={() => {
                    this.speak(this.state.txtSpeach)
                    this.ChangeVal()
                }} color={colors.secondery}/>
            </View>
        );
    }}
    const styles =StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text:{
            fontSize:22,
        },
    })

export default TextToSpeach;