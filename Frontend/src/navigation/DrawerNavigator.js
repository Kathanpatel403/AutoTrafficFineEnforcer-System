import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import { HomeScreen } from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import BookmarkScreen from "../screens/BookmarkScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    return(
        <Drawer.Navigator>
            <Drawer.Screen
                name = "Home"
                component={HomeScreen}/>
            <Drawer.Screen
                name = "Profile"
                component={ProfileScreen}/>
            <Drawer.Screen
                name = "Bookmarks"
                component={BookmarkScreen}/>
            <Drawer.Screen
                name = "Settings"
                component={SettingScreen}/>
            
        </Drawer.Navigator>
    )
};

export default DrawerNavigator;