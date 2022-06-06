import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Colors from '../constants/Colors';


export default function TextToSpeach2() {
    const [recording, setRecording] = React.useState();

    // const speech = require('@google-cloud/speech');
    // const fs = require('fs');

    // async function speechClient(uri){
    //     const client = new speech.SpeechClient();
    //     const filename = uri

    //     const file = fs.readFileSync(filename);
    //     const audioBytes = file.toString('base64');

    //     const audio = { content:audioBytes};
    //     const config= {
    //         encoding: 'LINEAR16',
    //         sampleRateHertz: 16000,
    //         languageCode: 'he-IL'
    //     };

    //     const request = {
    //         audio:audio,
    //         config:config
    //     };

    //     const [response] = await client.recognize(request);
    //     const transcription = response.results.map(result =>
    //         result.alternatives[0].transcript).join('\n');
    //         console.log('Transcription: ' +transcription)
    // }

    function LogoTitle() {
        return (
            <Image
                style={{ width: 110, height: 40 }}
                source={require('../assets/mic.png')}
            />
        );
    }

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI()
        console.log('Recording stopped and stored at', uri);
        speechClient(uri);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.setFontSizeOne}>Speech To Text</Text>
            <Text></Text>
            <View style={styles.container2}>
                <Button
                    color='black'
                    title={recording ? 'Push to stop' : 'Push to start'}
                    onPress={recording ? stopRecording : startRecording}
                />
                <Text></Text>
                <View>
                    <TouchableOpacity style={styles.button} onPress={recording ? stopRecording : startRecording}>
                        <Image    style={{ width: 70, height: 70 , borderRadios: 50}} source={require("../assets/mic2.png")} />
                    </TouchableOpacity>
                </View>
                <Text></Text>
                {/* <View style={styles.box2}>              
                    <View style={styles.buttonContainer}>
                        <Button title="" onPress={() => {

                        }} color={Colors.secondery} />
                    </View>
                </View> */}
                <View style={styles.box}>
                    <View style={styles.buttonContainer}>
                        <Button title="" onPress={() => {

                        }} color={'black'} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //backgroundColor: '#ecf0f1',
        //padding: 10,
        alignItems: 'center'
    }, setFontSizeOne: {
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 40,
        //paddingBottom: 10,
        paddingTop: 10
    }, container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, textInput: {
        height: 200,
        width: 300,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10,
        color: "white",
        textAlignVertical: "top"
    }, box: {
        backgroundColor: 'black',
        height: 100,
        width: 200,
        margin: 5,
        marginBottom: 35,
        borderRadius: 16,
    }, box2: {
        backgroundColor: Colors.background,
        height: 90,
        width: 90,
        margin: 5,
        marginBottom: 35,
        borderRadius: 16,
    }, buttonGPlusStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 5,
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    buttonTextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginLeft: 10,
    },
});