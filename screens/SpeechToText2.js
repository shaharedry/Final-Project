import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableHighlight, Image, TouchableOpacity, View } from 'react-native';
import Voice from '@react-native-voice/voice';

const SpeechToText2 = () => {
    const [result, setResult] = useState('');
    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');
    const [end, setEnd] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState([]);
    const [partialResults, setPartialResults] = useState([]);

    const onSpeechStart = (e) => {
        setStarted('True')
    };
    const onSpeechEnd = () => {
        setStarted(null);
        setEnd('True');
    };
    const onSpeechError = (e) => {
        setError(JSON.stringify(e.error));
    };
    const onSpeechResults = (e) => {
        setResults(e.value)
    };
    const onSpeechPartialResults = (e) => {
        setPartialResults(e.value)
    };
    const onSpeechVolumeChanged = (e) => {
        setPitch(e.value)
    };

    const startSpeechRecognizing = async () => {
        setPitch('')
        setError('')
        setStarted('')
        setResults([])
        setPartialResults([])
        setEnd('')
        try {
            await Voice.start('en-US',
                { EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000 });
        } catch (e) {
            console.error(e);
        }
    };
    const stopSpeechRecognizing = async () => {
        try {
            await Voice.stop();
            setStarted(null);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

        //return Voice.destroy().then(Voice.removeAllListeners);
    })

    const onSpeechStartHandler = (e) => {
        console.log("start handler ==>", e)
    }

    const onSpeachEndHandler = (e) => {
        console.log("end handler ", e)
    }

    const onSpeechResultsHandler = (e) => {
        console.log("result ", e)
    }

    //  const startRecording = async() =>{
    //      try{
    //          await (Voice.start('en-US') || Voice.start('he-IL'))
    //      } catch (error){
    //          console.log('error raised',error)
    //      }
    //  }

    const stopRecording = async () => {
        try {
            await Voice.stop()
        } catch (error) {
            console.log('error raised', error)
        }
    }
    return (
        <View>
            <TouchableHighlight
                onPress={ startSpeechRecognizing }
                style={{ marginVertical: 100 }}>
                <Image
                    style={styles.button} source={{ uri: 'https://png.pngtree.com/png-vector/20190329/ourlarge/pngtree-vector-microphone-icon-png-image_889382.jpg', }}
                />
            </TouchableHighlight>

            <TouchableHighlight
                onPress={ stopSpeechRecognizing }
                style={{ marginVertical: 100 }}>
                <Image
                    style={styles.button} source={{ uri: 'https://preview.redd.it/axorctfsk4v01.jpg?auto=webp&s=b9f5f8c1a353bd10aa7f3fa61e24b756ff042a7b', }}
                />
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextInputStyle: {
        flexDirection: 'flow',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 16,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 0.4
    }
});


export default SpeechToText2;