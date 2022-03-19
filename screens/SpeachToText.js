// import Voice from '@react-native-community/voice';
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


// export default SpeachToText;