import Voice from '@react-native-voice/voice';
import { TouchableHighlight } from "react-native";

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

Voice.onSpeechStart = onSpeechStart;
Voice.onSpeechEnd = onSpeechEnd;
Voice.onSpeechError = onSpeechError;
Voice.onSpeechResults = onSpeechResults;
Voice.onSpeechPartialResults = onSpeechPartialResults;
Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

{
    !started ?
    <TouchableHighlight
        onPress={startSpeechRecognizing}
        style={{ marginVertical: 100 }}>
        <Image
            style={styles.button} source={{ uri: 'https://png.pngtree.com/png-vector/20190329/ourlarge/pngtree-vector-microphone-icon-png-image_889382.jpg', }} />
    </TouchableHighlight>
    :
    <TouchableHighlight
        onPress={stopSpeechRecognizing}
        style={{ marginVertical: 100 }}>
        <Image
            style={styles.button} source={{ uri: 'https://preview.redd.it/axorctfsk4v01.jpg?auto=webp&s=b9f5f8c1a353bd10aa7f3fa61e24b756ff042a7b', }} />
    </TouchableHighlight>
}

const startSpeechRecognizing = async () => {
    setPitch('')
    setError('')
    setStarted('')
    setResults([])
    setPartialResults([])
    setEnd('')
    try {
        await Voice.start('en-US',
            {EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000});
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

<ScrollView style = {styles.messageBox}>
       {partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={ styles.resultBox }>
               {result}
            </Text>
          ); })}
</ScrollView>


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding : 40,
        alignItems: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button:{
        width: 250,
        height: 80,
        // justifyContent: 'center',
        // paddingBottom: 20 ,
        // borderRadius: 10
    }
})




















// import React, {useEffect, useState} from 'react';
// import { SafeAreaView, TouchableOpacity, View} from 'react-native';


// const [result,setResult] = useState('');

// const SpeachToText = () =>{
//     useEffect(()=> {
//         Voice.onSpeechStart = onSpeechStartHandler
//         Voice.onSpeechEnd = onSpeechEndHandler
//         Voice.onSpeechResults = onSpeechResultsHandler

//         return Voice.destroy().then(Voice.removeAllListeners);
//     })

//     const onSpeechStartHandler = (e) =>{
//         console.log("start handler ==>",e)
//     }

//     const onSpeachEndHandler = (e) =>{
//         console.log("end handler ",e)
//     }

//     const onSpeechResultsHandler = (e) =>{
//         console.log("result ",e)
//     }

//     const startRecording = async() =>{
//         try{
//             await (Voice.start('en-US') || Voice.start('he-IL'))
//         } catch (error){
//             console.log('error raised',error)
//         }
//     }

//     const stopRecording = async() =>{
//         try{
//             await Voice.stop()
//         } catch (error){
//             console.log('error raised',error)
//         }
//     }
//     return (
//         <View style={styles.container}>
//             <SafeAreaView>
//                 <View style={styles.TextInputStyle}>
//                     <TextInput
//                     value={result}
//                     placeholder="your text"
//                     style={{flex:1}}
//                     onChangeText={text=>setResult(text)}
//                     />
//                     <TouchableOpacity>
//                         onPress={startRecording}
//                         <Image
//                         source={{uri: 'https://raw.githubusercontent.com/AboutReact/samplesource/master/microphone.png'}}
//                         style={{width:25,height:25}}
//                         />
//                     </TouchableOpacity>
//                 </View>
//                 <TouchableOpacity
//                     style={{
//                         alignSelf:'center',
//                         marginTop:24,
//                         backgroundColor:'red',
//                         padding:8,
//                         borderRadius:4
//                     }}
//                     onPress={stopRecording}
//                     >
//                     <Text style={{color:'white',fontWeight:'bold'}}>Stop</Text>
//                 </TouchableOpacity>
//             </SafeAreaView>
//         </View>
//     );
// };

//     const styles = StyleSheet.create({
//         container:{
//             flex:1,
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         TextInputStyle:{
//             flexDirection: 'flow',
//             height:48,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'white',
//             borderRadius:20,
//             paddingHorizontal:16,
//             shadowOffset: {width:0, height:1},
//             shadowRadius:2,
//             elevation:2,
//             shadowOpacity:0.4
//         }
//   });


export default SpeachToText;