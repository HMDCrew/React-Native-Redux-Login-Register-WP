import React, { Component } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import * as Font from 'expo-font';

import Auth from '../screens/Auth'
import Home from '../screens/Home'
import Details from '../screens/Details'
import Profile from '../screens/Profile'
import Settings from '../screens/Settings'

let themeFonts = {
    BarlowRegular: require("../assets/fonts/ttf/Barlow-Regular.ttf"),
    BarlowMedium: require("../assets/fonts/ttf/Barlow-Medium.ttf"),
    BarlowSemiBold: require("../assets/fonts/ttf/Barlow-SemiBold.ttf"),
    BarlowBold: require("../assets/fonts/ttf/Barlow-Bold.ttf"),
};

export default class AppNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: {
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    background: "transparent"
                }
            },
            fontsLoaded: false,
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(themeFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    render() {

        const Stack = createStackNavigator();

        if (!this.state.fontsLoaded) {
            return null;
        }

        return (
            <NavigationContainer theme={this.state.theme}>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="Auth"
                >
                    <Stack.Screen name="Auth" component={Auth} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Details" component={Details} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Settings" component={Settings} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    };
};
