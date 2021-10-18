import React, {Component} from 'react'
import {View, Button, StyleSheet} from 'react-native'
import * as Speech from 'expo-speech';

export function Test() {
    const speak = () => {
      const thingToSay = ('אבאאיביאבואבה אבא קנה לי בייגלה הבייגלה היה טעים והראל גאון מדהים');
      Speech.speak(thingToSay);
    };
  
    return (
      <View style={styles.container}>
        <Button title="Press to hear some words" onPress={speak} />
      </View>
    );
  }

// function TextToSpeach(props) {
//     const handlevoice = ttsText => {
//         Tts.speak(ttsText)
//     }
//     return(
//         <View style={styles.container}>
//             <Text style={styles.text} onPress={()=> handlevoice(('Text for now'))}>
//                 Speak
//             </Text>
//         </View>
//     )
// }
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

// class TextToSpeach extends Component {
//     constructor(){
//         super()
//         this.state={
//             txtSpeach:'I LOVE YOU!'
//         }
//     }

//     onSpeak = () =>{
//         Speech.speak(this.state.txtSpeach,{
//             language:'he',
//             pitch: 1.5,
//             rate: 1
//         })
//         Speech.speak('Hello, world!', {
//             iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
//             rate: 0.5,
//           });
//         // Android
//         Speech.speak('Hello, world!', {
//             androidParams: {
//               KEY_PARAM_PAN: -1,
//               KEY_PARAM_VOLUME: 0.5,
//               KEY_PARAM_STREAM: 'STREAM_MUSIC',
//             },
//           });
//     }

//     render(){
//         return(
//             <View style={{paddingTop: 100}}>
//                 <Button title="Speak"
//                 onPress={this.onSpeak}/>
//             </View>
//         )
//     }
// }

export default Test;