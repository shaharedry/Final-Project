import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import Colors from '../constants/Colors'
import { View, Text, Image, Button } from 'react-native';

import Main from '../screens/Main'
import LoginV2 from '../screens/LoginV2'

//Admin
import adminProfile from '../screens/Administrator/adminProfile'
import AdminHomePage from '../screens/Administrator/AdminHomePage';

//Club
import ClubHomePage from '../screens/Club/ClubHomePage';
import signUp4 from '../screens/Club/signUp4';
import ClubInfo from '../screens/Club/ClubInfo';
import DeleteInterpreter from '../screens/Club/DeleteInterpreter';
import DeleteUser from '../screens/Club/DeleteUser';
import Basket from '../screens/Club/Basket';

//Social
import SocialHomePage from '../screens/Social/SocialHomePage';
import signUp1 from '../screens/Social/signUp1'
import SocialInfo from '../screens/Social/SocialInfo';
import ApproveHours from '../screens/Social/ApproveHours';
//import VerifyUser from '../screens/Social/VerifyUser';

//Translator
import TransHomePage from '../screens/Trans/TransHomePage';
import signUp3 from '../screens/Trans/signUp3'
import TransInfo from '../screens/Trans/TransInfo';
import Request3 from '../screens/Trans/Request3';
import ReportHours from '../screens/Trans/ReportHours';
//import VerifyTransUser from '../screens/Social/VerifyTransUser';

//User
import UserHomePage from '../screens/User/UserHomePage';
import signUp2 from '../screens/User/signUp2'
import UserInfo from '../screens/User/UserInfo';
import Request2 from '../screens/User/Request2';
import ViewInfo from '../screens/ViewInfo';
import ViewBasket from '../screens/User/ViewBasket'
import ReportInterpHours from '../screens/User/ReportInterpHours';

//Guest
import GuestHomePage from '../screens/Guest/GuestHomePage';
import guestScreen from '../screens/Guest/guestScreen'
//import SpeechToText from '../screens/SpeechToText';
//import SpeechToText2 from '../screens/SpeechToText2';
import TextToSpeach from '../screens/TextToSpeach';
import Test from '../screens/Test.js';



function LogoTitle() {
    return (
      <Image
        style={{ width: 110, height: 40 }}
        source={require('../assets/Logo/logo13.png')}
      />
    );
  }
  const MyCustomHeaderBackImage = () => (
    <Image
      source={require('../assets/back.png')}
      style={{width: 40, height: 40}}
    />
  );
const AppNavigator = createStackNavigator({
    Main:{ screen: Main ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    LoginV2:{ screen: LoginV2 ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    signUp1:{ screen: signUp1 ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    signUp2:{ screen: signUp2 ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    signUp3:{ screen: signUp3 ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    signUp4:{ screen: signUp4 ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
   // VerifyUser:{ screen: VerifyUser , headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    Request2: { screen: Request2 , headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    Request3: { screen: Request3 , headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    guestScreen:{ screen: guestScreen ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    adminProfile:{ screen: adminProfile ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    AdminHomePage:{ screen: AdminHomePage ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    ClubHomePage:{ screen: ClubHomePage ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    SocialHomePage:{ screen: SocialHomePage ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    TransHomePage:{ screen: TransHomePage ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    UserHomePage:{ screen: UserHomePage ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    GuestHomePage:{ screen: GuestHomePage ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    TextToSpeach:{ screen: TextToSpeach ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    DeleteInterpreter:{ screen: DeleteInterpreter ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    DeleteUser:{ screen: DeleteUser ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    ViewInfo:{ screen: ViewInfo ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    ViewBasket:{ screen: ViewBasket ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    Basket:{ screen: Basket ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    ReportHours:{ screen: ReportHours ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    ReportInterpHours:{ screen: ReportInterpHours ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    ApproveHours:{ screen: ApproveHours ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    //SpeechToText:{ screen: SpeechToText ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    //SpeechToText2:{ screen: SpeechToText2 ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    //VerifyTransUser:{ screen: VerifyTransUser ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},

    UserInfo:{ screen: UserInfo ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    SocialInfo:{ screen: SocialInfo ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    ClubInfo:{ screen: ClubInfo ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    TransInfo:{ screen: TransInfo ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
    Test:{ screen: Test ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:""}},
},

{
    defaultNavigationOptions : {
        headerShown: true,
        headerBackImage: MyCustomHeaderBackImage,
        headerRight:<LogoTitle />,
        headerBackTitleVisible: false,
        // headerLeft:(
        //   <Button
        //     onPress={() =>navigation.goBack(null)}
        //     title="<"
        //     color="#1b95f2"
        //     backgroundColor="#1b95f2"
        //   />
        // ),
        //headerTransparent: true,
        headerTitleAlign: 'center',
        //headerTitle: 'Ear Me',
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTintColor: Colors.title
    }
}
);

export default createAppContainer(AppNavigator);