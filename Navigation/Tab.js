import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackNavigator, ContactStackNavigator } from "./StackNavigator";
const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{
                    //tabBarIcon: () => (<Image source={require("./../assets/icons/home-outline-svg.png")} style={{width: 20, height: 20}} />)
                }}
            />
        </Tab.Navigator>
    );
};
export default BottomTabNavigator;