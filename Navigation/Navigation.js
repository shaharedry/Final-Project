import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import Colors from '../constants/Colors'

import Main from '../screens/Main'
import LoginV2 from '../screens/LoginV2'

//Admin
import adminProfile from '../screens/Administrator/adminProfile'
import AdminHomePage from '../screens/Administrator/AdminHomePage';

//Club
import ClubHomePage from '../screens/Club/ClubHomePage';
import signUp4 from '../screens/Club/signUp4';
import ClubInfo from '../screens/Club/ClubInfo';

//Social
import SocialHomePage from '../screens/Social/SocialHomePage';
import signUp1 from '../screens/Social/signUp1'
import SocialInfo from '../screens/Social/SocialInfo';
import VerifyUser from '../screens/Social/VerifyUser';

//Translator
import TransHomePage from '../screens/Trans/TransHomePage';
import signUp3 from '../screens/Trans/signUp3'
import TransInfo from '../screens/Trans/TransInfo';
import Request3 from '../screens/Trans/Request3';
import VerifyTransUser from '../screens/Social/VerifyTransUser';

//User
import UserHomePage from '../screens/User/UserHomePage';
import signUp2 from '../screens/User/signUp2'
import UserInfo from '../screens/User/UserInfo';
import Request2 from '../screens/User/Request2';

//Guest
import GuestHomePage from '../screens/Guest/GuestHomePage';
import guestScreen from '../screens/Guest/guestScreen'

import TextToSpeach from '../screens/TextToSpeach';
import Test from '../screens/Test.js';

const AppNavigator = createStackNavigator({
    Main:{ screen: Main ,headerTitle: 'EAR ME'},
    LoginV2:{ screen: LoginV2 ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Login"}},
    signUp1:{ screen: signUp1 ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Create Social User"}},
    signUp2:{ screen: signUp2 ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Create User"}},
    signUp3:{ screen: signUp3 ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Create Translator User"}},
    signUp4:{ screen: signUp4 ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Create Club User"}},
    VerifyUser:{ screen: VerifyUser , headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Verify User"}},
    Request2: { screen: Request2 , headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Create User"}},
    Request3: { screen: Request3 , headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Create Translator User"}},
    guestScreen:{ screen: guestScreen ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Guest Screen"}},
    adminProfile:{ screen: adminProfile ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Admin Profile"}},
    AdminHomePage:{ screen: AdminHomePage ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Admin"}},
    ClubHomePage:{ screen: ClubHomePage ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Club HomePage"}},
    SocialHomePage:{ screen: SocialHomePage ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Social HomePage"}},
    TransHomePage:{ screen: TransHomePage ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Translator HomePage"}},
    UserHomePage:{ screen: UserHomePage ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"User HomePage"}},
    GuestHomePage:{ screen: GuestHomePage ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Guest HomePage"}},
    TextToSpeach:{ screen: TextToSpeach ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Text to Speach"}},
    VerifyTransUser:{ screen: VerifyTransUser ,headerTitle: 'EAR ME',navigationOptions:{ headerTitle:"Verify Translator User"}},

    UserInfo:{ screen: UserInfo ,headerTitle: 'EAR ME'},
    SocialInfo:{ screen: SocialInfo ,headerTitle: 'EAR ME'},
    ClubInfo:{ screen: ClubInfo ,headerTitle: 'EAR ME'},
    TransInfo:{ screen: TransInfo ,headerTitle: 'EAR ME'},
    Test:{ screen: Test ,headerTitle: 'EAR ME'},
},
{
    defaultNavigationOptions : {
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