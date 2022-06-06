import React, { Component } from 'react'
import { View, Button, StyleSheet, TextInput, Text } from 'react-native'
import * as Speech from 'expo-speech';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import colors from '../constants/Colors';

class TextToSpeach extends Component {
    constructor() {
        super()
        this.state = {
            txtSpeach: 'Enter Text please',
            pressed: false
        }
    }
    speak(txt, state) {
        Speech.speak(txt);
    };

    ChangeVal() {
        this.setState({ pressed: !this.state.pressed })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.setFontSizeOne}>Text To Speech</Text>
                <View style={styles.container2}>
                    <TextInput
                        backgroundColor= 'black'
                        style={styles.textInput}
                        placeholder=" Enter Your Text"
                        label='Enter Text'
                        onChangeText={(val) => this.setState({ txtSpeach: val })}
                    />
                    <View style={styles.box}>
                        <Button title="Speech" onPress={() => {
                            this.speak(this.state.txtSpeach)
                            this.ChangeVal()
                        }} color={colors.secondery} />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center'
    },
    textInput:{
        height: 200,
        width: 300,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical:10,
        color: "white",
        textAlignVertical: "top"
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
    }, setFontSizeOne: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "bold",
        //paddingBottom: 10,
        paddingTop: 10
    }, box: {
        backgroundColor: colors.background,
        height: 40,
        margin: 5,
        marginBottom: 35,
        borderRadius: 16,
    }
})

export default TextToSpeach;