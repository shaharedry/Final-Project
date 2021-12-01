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
    LoginV2:{ screen: LoginV2 ,headerTitle: 'EAR ME'},
    signUp1:{ screen: signUp1 ,headerTitle: 'EAR ME'},
    signUp2:{ screen: signUp2 ,headerTitle: 'EAR ME'},
    signUp3:{ screen: signUp3 ,headerTitle: 'EAR ME'},
    signUp4:{ screen: signUp4 ,headerTitle: 'EAR ME'},
    VerifyUser:{ screen: VerifyUser , headerTitle: 'EAR ME'},
    Request2: { screen: Request2 , headerTitle: 'EAR ME'},
    Request3: { screen: Request3 , headerTitle: 'EAR ME'},
    guestScreen:{ screen: guestScreen ,headerTitle: 'EAR ME'},
    adminProfile:{ screen: adminProfile ,headerTitle: 'EAR ME'},
    AdminHomePage:{ screen: AdminHomePage ,headerTitle: 'EAR ME'},
    ClubHomePage:{ screen: ClubHomePage ,headerTitle: 'EAR ME'},
    SocialHomePage:{ screen: SocialHomePage ,headerTitle: 'EAR ME'},
    TransHomePage:{ screen: TransHomePage ,headerTitle: 'EAR ME'},
    UserHomePage:{ screen: UserHomePage ,headerTitle: 'EAR ME'},
    GuestHomePage:{ screen: GuestHomePage ,headerTitle: 'EAR ME'},
    TextToSpeach:{ screen: TextToSpeach ,headerTitle: 'EAR ME'},

    UserInfo:{ screen: UserInfo ,headerTitle: 'EAR ME'},
    SocialInfo:{ screen: SocialInfo ,headerTitle: 'EAR ME'},
    ClubInfo:{ screen: ClubInfo ,headerTitle: 'EAR ME'},
    TransInfo:{ screen: TransInfo ,headerTitle: 'EAR ME'},
    Test:{ screen: Test ,headerTitle: 'EAR ME'},
},
{
    defaultNavigationOptions : {
        headerShown: true,
        
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