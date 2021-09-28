import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import Colors from '../constants/Colors'

import Main from '../screens/Main'
import Login from '../screens/Login'
import LoginV2 from '../screens/LoginV2'
import signUp1 from '../screens/signUp1'
import signUp2 from '../screens/signUp2'
import signUp3 from '../screens/signUp3'
import guestScreen from '../screens/guestScreen'
import adminProfile from '../screens/adminProfile'
import AdminHomePage from '../screens/Admin/AdminHomePage';
import ClubHomePage from '../screens/Club/ClubHomePage';
import SocialHomePage from '../screens/Social/SocialHomePage';
import TransHomePage from '../screens/Trans/TransHomePage';
import UserHomePage from '../screens/User/UserHomePage';
import GuestHomePage from '../screens/Guest/GuestHomePage';
import signUp4 from '../screens/SignUp4';

const AppNavigator = createStackNavigator({
    Main:{ screen: Main ,headerTitle: 'EAR ME'},
    Login:{ screen: Login ,headerTitle: 'EAR ME'},
    LoginV2:{ screen: LoginV2 ,headerTitle: 'EAR ME'},
    signUp1:{ screen: signUp1 ,headerTitle: 'EAR ME'},
    signUp2:{ screen: signUp2 ,headerTitle: 'EAR ME'},
    signUp3:{ screen: signUp3 ,headerTitle: 'EAR ME'},
    signUp4:{ screen: signUp4 ,headerTitle: 'EAR ME'},
    guestScreen:{ screen: guestScreen ,headerTitle: 'EAR ME'},
    adminProfile:{ screen: adminProfile ,headerTitle: 'EAR ME'},
    AdminHomePage:{ screen: AdminHomePage ,headerTitle: 'EAR ME'},
    ClubHomePage:{ screen: ClubHomePage ,headerTitle: 'EAR ME'},
    SocialHomePage:{ screen: SocialHomePage ,headerTitle: 'EAR ME'},
    TransHomePage:{ screen: TransHomePage ,headerTitle: 'EAR ME'},
    UserHomePage:{ screen: UserHomePage ,headerTitle: 'EAR ME'},
    GuestHomePage:{ screen: GuestHomePage ,headerTitle: 'EAR ME'}
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