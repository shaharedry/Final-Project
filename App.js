import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation';
//import Tabs from './Navigation/Tab';

import SpeechToText from './screens/SpeechToText'


//const Tab = createBottomTabNavigator();
export default function App() {
  return (
    // <NavigationContainer>
    //   {/* <Navigation/> */}
    //   <Tab.Navigator>
    //     <Tab.Screen name="Main" component={Main} />
    //     <Tab.Screen name="TextToSpeach" component={TextToSpeach} />
    //     <Tab.Screen name="LoginV2" component={LoginV2} />
    //   </Tab.Navigator>
    // </NavigationContainer>
    
  <Navigation>

  </Navigation>
  
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
