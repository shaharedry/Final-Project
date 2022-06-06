import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';


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
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
});