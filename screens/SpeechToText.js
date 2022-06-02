// import Voice from '@react-native-voice/voice';
// import { TouchableHighlight } from "react-native";

// const [pitch, setPitch] = useState('');
// const [error, setError] = useState('');
// const [end, setEnd] = useState('');
// const [started, setStarted] = useState('');
// const [results, setResults] = useState([]);
// const [partialResults, setPartialResults] = useState([]);

// const onSpeechStart = (e) => {
//     setStarted('True')
// };
// const onSpeechEnd = () => {
//     setStarted(null);
//     setEnd('True');
// };
// const onSpeechError = (e) => {
//     setError(JSON.stringify(e.error));
// };
// const onSpeechResults = (e) => {
//     setResults(e.value)
// };
// const onSpeechPartialResults = (e) => {
//     setPartialResults(e.value)
// };
// const onSpeechVolumeChanged = (e) => {
//     setPitch(e.value)
// };

// Voice.onSpeechStart = onSpeechStart;
// Voice.onSpeechEnd = onSpeechEnd;
// Voice.onSpeechError = onSpeechError;
// Voice.onSpeechResults = onSpeechResults;
// Voice.onSpeechPartialResults = onSpeechPartialResults;
// Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

// {
//     !started ?
//     <TouchableHighlight
//         onPress={startSpeechRecognizing}
//         style={{ marginVertical: 100 }}>
//         <Image
//             style={styles.button} source={{ uri: 'https://png.pngtree.com/png-vector/20190329/ourlarge/pngtree-vector-microphone-icon-png-image_889382.jpg', }} />
//     </TouchableHighlight>
//     :
//     <TouchableHighlight
//         onPress={stopSpeechRecognizing}
//         style={{ marginVertical: 100 }}>
//         <Image
//             style={styles.button} source={{ uri: 'https://preview.redd.it/axorctfsk4v01.jpg?auto=webp&s=b9f5f8c1a353bd10aa7f3fa61e24b756ff042a7b', }} />
//     </TouchableHighlight>
// }

// const startSpeechRecognizing = async () => {
//     setPitch('')
//     setError('')
//     setStarted('')
//     setResults([])
//     setPartialResults([])
//     setEnd('')
//     try {
//         await Voice.start('en-US',
//             {EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000});
//         } catch (e) {
//         console.error(e);
//         }
// };
// const stopSpeechRecognizing = async () => {
//     try {
//         await Voice.stop();
//         setStarted(null);
//     } catch (e) {
//         console.error(e);
//     }
// };

// <ScrollView style = {styles.messageBox}>
//        {partialResults.map((result, index) => {
//           return (
//             <Text key={`partial-result-${index}`} style={ styles.resultBox }>
//                {result}
//             </Text>
//           ); })}
// </ScrollView>


// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         padding : 40,
//         alignItems: 'center',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     button:{
//         width: 250,
//         height: 80,
//         // justifyContent: 'center',
//         // paddingBottom: 20 ,
//         // borderRadius: 10
//     }
// })




















// import React, {useEffect, useState} from 'react';
// import { SafeAreaView, TouchableOpacity, View} from 'react-native';


// const [result,setResult] = useState('');

// const SpeechToText = () =>{
// useEffect(()=> {
// Voice.onSpeechStart = onSpeechStartHandler
// Voice.onSpeechEnd = onSpeechEndHandler
// Voice.onSpeechResults = onSpeechResultsHandler

//          return Voice.destroy().then(Voice.removeAllListeners);
//      })

//      const onSpeechStartHandler = (e) =>{
//          console.log("start handler ==>",e)
//      }

//      const onSpeachEndHandler = (e) =>{
//          console.log("end handler ",e)
//      }

//      const onSpeechResultsHandler = (e) =>{
//          console.log("result ",e)
//      }

//      const startRecording = async() =>{
//          try{
//              await (Voice.start('en-US') || Voice.start('he-IL'))
//          } catch (error){
//              console.log('error raised',error)
//          }
//      }

//      const stopRecording = async() =>{
//          try{
//              await Voice.stop()
//          } catch (error){
//              console.log('error raised',error)
//          }
//      }
//      return (
//          <View style={styles.container}>
//              <SafeAreaView>
//                  <View style={styles.TextInputStyle}>
//                      <TextInput
//                      value={result}
//                      placeholder="your text"
//                      style={{flex:1}}
//                      onChangeText={text=>setResult(text)}
//                      />
//                      {/* <TouchableOpacity>
//                          onPress={startRecording}
//                          <Image
//                          source={{uri: 'https:raw.githubusercontent.com/AboutReact/samplesource/master/microphone.png'}}
//                          style={{width:25,height:25}}
//                          />
//                      </TouchableOpacity> */}
//                  </View>
//                  <TouchableOpacity
//                      style={{
//                          alignSelf:'center',
//                          marginTop:24,
//                          backgroundColor:'red',
//                          padding:8,
//                          borderRadius:4
//                      }}
//                      onPress={stopRecording}
//                      >
//                      <Text style={{color:'white',fontWeight:'bold'}}>Stop</Text>
//                  </TouchableOpacity>
//              </SafeAreaView>
//          </View>
//      );
//  };

//      const styles = StyleSheet.create({
//          container:{
//              flex:1,
//              justifyContent: 'center',
//              alignItems: 'center',
//          },
//          TextInputStyle:{
//              flexDirection: 'flow',
//              height:48,
//              justifyContent: 'center',
//              alignItems: 'center',
//              backgroundColor: 'white',
//              borderRadius:20,
//              paddingHorizontal:16,
//              shadowOffset: {width:0, height:1},
//              shadowRadius:2,
//              elevation:2,
//              shadowOpacity:0.4
//          }
//    });


// export default SpeechToText;


// Speech to Text Conversion in React Native – Voice Recognition
// https://aboutreact.com/speech-to-text-conversion-in-react-native-voice-recognition/
 
// import React in our code
// import React, {useState, useEffect} from 'react';
 
// // import all the components we are going to use
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableHighlight,
//   ScrollView,
// } from 'react-native';
 
// // import Voice
// import Voice from '@react-native-voice/voice';
 
// const SpeechToText = () => {
//   const [pitch, setPitch] = useState('');
//   const [error, setError] = useState('');
//   const [end, setEnd] = useState('');
//   const [started, setStarted] = useState('');
//   const [results, setResults] = useState([]);
//   const [partialResults, setPartialResults] = useState([]);
 
//   useEffect(() => {
//     //Setting callbacks for the process status
//     Voice.onSpeechStart = onSpeechStart;
//     Voice.onSpeechEnd = onSpeechEnd;
//     Voice.onSpeechError = onSpeechError;
//     Voice.onSpeechResults = onSpeechResults;
//     Voice.onSpeechPartialResults = onSpeechPartialResults;
//     Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
 
//     return () => {
//       //destroy the process after switching the screen
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);
 
//   const onSpeechStart = (e) => {
//     //Invoked when .start() is called without error
//     console.log('onSpeechStart: ', e);
//     setStarted('√');
//   };
 
//   const onSpeechEnd = (e) => {
//     //Invoked when SpeechRecognizer stops recognition
//     console.log('onSpeechEnd: ', e);
//     setEnd('√');
//   };
 
//   const onSpeechError = (e) => {
//     //Invoked when an error occurs.
//     console.log('onSpeechError: ', e);
//     setError(JSON.stringify(e.error));
//   };
 
//   const onSpeechResults = (e) => {
//     //Invoked when SpeechRecognizer is finished recognizing
//     console.log('onSpeechResults: ', e);
//     setResults(e.value);
//   };
 
//   const onSpeechPartialResults = (e) => {
//     //Invoked when any results are computed
//     console.log('onSpeechPartialResults: ', e);
//     setPartialResults(e.value);
//   };
 
//   const onSpeechVolumeChanged = (e) => {
//     //Invoked when pitch that is recognized changed
//     console.log('onSpeechVolumeChanged: ', e);
//     setPitch(e.value);
//   };
 
//   const startRecognizing = async () => {
//     //Starts listening for speech for a specific locale
//     try {
//       await Voice.start('en-US');
//       setPitch('');
//       setError('');
//       setStarted('');
//       setResults([]);
//       setPartialResults([]);
//       setEnd('');
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };
 
//   const stopRecognizing = async () => {
//     //Stops listening for speech
//     try {
//       await Voice.stop();
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };
 
//   const cancelRecognizing = async () => {
//     //Cancels the speech recognition
//     try {
//       await Voice.cancel();
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };
 
//   const destroyRecognizer = async () => {
//     //Destroys the current SpeechRecognizer instance
//     try {
//       await Voice.destroy();
//       setPitch('');
//       setError('');
//       setStarted('');
//       setResults([]);
//       setPartialResults([]);
//       setEnd('');
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };
 
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         <Text style={styles.titleText}>
//           Speech to Text Conversion in React Native |
//           Voice Recognition
//         </Text>
//         <Text style={styles.textStyle}>
//           Press mike to start Recognition
//         </Text>
//         <View style={styles.headerContainer}>
//           <Text style={styles.textWithSpaceStyle}>
//             {`Started: ${started}`}
//           </Text>
//           <Text style={styles.textWithSpaceStyle}>
//             {`End: ${end}`}
//           </Text>
//         </View>
//         <View style={styles.headerContainer}>
//           <Text style={styles.textWithSpaceStyle}>
//             {`Pitch: \n ${pitch}`}
//           </Text>
//           <Text style={styles.textWithSpaceStyle}>
//             {`Error: \n ${error}`}
//           </Text>
//         </View>
//         <TouchableHighlight onPress={startRecognizing}>
//           <Image
//             style={styles.imageButton}
//             source={{
//               uri:
//                 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
//             }}
//           />
//         </TouchableHighlight>
//         <Text style={styles.textStyle}>
//           Partial Results
//         </Text>
//         <ScrollView>
//           {partialResults.map((result, index) => {
//             return (
//               <Text
//                 key={`partial-result-${index}`}
//                 style={styles.textStyle}>
//                 {result}
//               </Text>
//             );
//           })}
//         </ScrollView>
//         <Text style={styles.textStyle}>
//           Results
//         </Text>
//         <ScrollView style={{marginBottom: 42}}>
//           {results.map((result, index) => {
//             return (
//               <Text
//                 key={`result-${index}`}
//                 style={styles.textStyle}>
//                 {result}
//               </Text>
//             );
//           })}
//         </ScrollView>
//         <View style={styles.horizontalView}>
//           <TouchableHighlight
//             onPress={stopRecognizing}
//             style={styles.buttonStyle}>
//             <Text style={styles.buttonTextStyle}>
//               Stop
//             </Text>
//           </TouchableHighlight>
//           <TouchableHighlight
//             onPress={cancelRecognizing}
//             style={styles.buttonStyle}>
//             <Text style={styles.buttonTextStyle}>
//               Cancel
//             </Text>
//           </TouchableHighlight>
//           <TouchableHighlight
//             onPress={destroyRecognizer}
//             style={styles.buttonStyle}>
//             <Text style={styles.buttonTextStyle}>
//               Destroy
//             </Text>
//           </TouchableHighlight>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };
 
// export default SpeechToText;
 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: 5,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//   },
//   titleText: {
//     fontSize: 22,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   buttonStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     marginTop: 15,
//     padding: 10,
//     backgroundColor: '#8ad24e',
//     marginRight: 2,
//     marginLeft: 2,
//   },
//   buttonTextStyle: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   horizontalView: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 0,
//   },
//   textStyle: {
//     textAlign: 'center',
//     padding: 12,
//   },
//   imageButton: {
//     width: 50,
//     height: 50,
//   },
//   textWithSpaceStyle: {
//     flex: 1,
//     textAlign: 'center',
//     color: '#B0171F',
//   },
// });

// import { AppRegistry } from 'react-native';
// import App from '../App';

// AppRegistry.registerComponent('main',() => App);