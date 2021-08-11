import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import Colors from '../constants/Colors'

import Main from '../screens/Main'
import Login from '../screens/Login'
import signUp1 from '../screens/signUp1'
import signUp2 from '../screens/signUp2'
import signUp3 from '../screens/signUp3'
import guestScreen from '../screens/guestScreen'
import adminProfile from '../screens/adminProfile'

const AppNavigator = createStackNavigator({
    Main:{ screen: Main ,headerTitle: 'EAR ME'},
    Login:{ screen: Login ,headerTitle: 'EAR ME'},
    signUp1:{ screen: signUp1 ,headerTitle: 'EAR ME'},
    signUp2:{ screen: signUp2 ,headerTitle: 'EAR ME'},
    signUp3:{ screen: signUp3 ,headerTitle: 'EAR ME'},
    guestScreen:{ screen: guestScreen ,headerTitle: 'EAR ME'},
    adminProfile:{ screen: adminProfile ,headerTitle: 'EAR ME'}
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