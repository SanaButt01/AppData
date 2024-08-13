import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox, View, Image, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { StripeProvider } from '@stripe/stripe-react-native';

import { icons,COLORS } from './constants';
import UserProfile from './screens/UserProfile'
import { BookDetail, Home } from './screens/';
import Register from './screens/Register';
import ShoppingCart from './screens/ShoppingCart';
import LoginForm from './screens/LoginForm';
import BookData from './screens/BookData';
import FeedBack from './screens/FeedBack';
import AddressForm from './screens/AddressForm';
import MyCars from './screens/MyCars';
import PreviewScreen from './screens/PreviewScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import BookScreen from './screens/BookScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import ForgotPassword from './screens/ForgotPassword';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: 'transparent',
    },
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <Image source={icons.logo2} style={{ width: 110, height: 150 }} />
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const DrawerScreens = () => {
    return (
        <Drawer.Navigator
            // initialRouteName={'Dashboard'}
            drawerContent={CustomDrawerContent}
            screenOptions={{
                headerShown: true,
                drawerLabelStyle: {
                    fontSize: 20,
                    color: 'black',
                    fontFamily: 'PlayfairDisplay-Bold',
                },
                headerStyle: {
                    backgroundColor:"black",
                    height: 70,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontSize: 20,
                    fontFamily: 'PlayfairDisplay-Bold',
                },
                drawerStyle: {
                    width: 300,
                    backgroundColor: 'white',
                },
            }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={BookData}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Image source={icons.read_icon} style={{ width: 35, height: 35 }} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Clearance Sale"
                component={Home}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Image source={icons.sale} style={{ width: 30, height: 45 }} />
                    ),
                }}
            />
            <Drawer.Screen
                name="ShoppingCart"
                component={ShoppingCart}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Image source={icons.claim_icon} style={{ width: 35, height: 35 }} />
                    ),
                }}
            />
              <Drawer.Screen
                name="Profile"
                component={UserProfile}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Image source={icons.page_icon} style={{ width: 35, height: 35 }} />
                    ),
                }}
            />
                <Drawer.Screen
                name="FeedBack"
                component={FeedBack}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Image source={icons.card_icon} style={{ width: 35, height: 35 }} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Contact us"
                component={ContactUsScreen}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Image source={icons.contact} style={{ width: 35, height: 35 }} />
                    ),
                }}
            />
            <Drawer.Screen
                name="About us"
                component={AboutUsScreen}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Image source={icons.About} style={{ width: 35, height: 35 }} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

const App = () => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    const handleLogout = () => {
        // Implement your logout logic here
        console.log('User logged out');
        // Example: Clear user session, navigate to login screen, etc.
    };

    return (
      <StripeProvider publishableKey="pk_test_51Ok46fKWEwsvQglH9hhqE9YhYSWHDpXG84EM5EaASAA4dnyBSAPzomo4ZDfcWJvK9EloBaQ8eOASrlgoBZhUBq7d00X4PRp02d">
      <NavigationContainer theme={theme}>
          <Stack.Navigator
              initialRouteName="Dasboard"
              screenOptions={{
                  headerShown: false,
              }}
          >
              <Stack.Screen name="DrawerScreens" component={DrawerScreens} />
              <Stack.Screen name="OrderCheckout" component={AddressForm} options={{ headerShown: true }} />
              <Stack.Screen name="BookInsight" component={BookDetail} options={{ headerShown: true }} />
              <Stack.Screen name="BookScreen" component={BookScreen} options={{ headerShown: true }}/>
              <Stack.Screen name="PreviewDisplay" component={PreviewScreen} options={{ headerShown: true, }}/>
              <Stack.Screen name="MyCars" component={MyCars} options={{ headerShown: false }}/>
              <Stack.Screen name="Signup" component={Register} options={{ headerShown: false }}/>
              <Stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }}/>
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
              <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>
          </Stack.Navigator>
      </NavigationContainer>
  </StripeProvider>
    );
};

export default App;
