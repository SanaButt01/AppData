import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox, View, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { StripeProvider } from '@stripe/stripe-react-native';

import { icons } from './constants';

import { BookDetail, Home } from './screens/';
import Register from './screens/Register';
import ShoppingCart from './screens/ShoppingCart';
import LoginForm from './screens/LoginForm';
import BookData from './screens/BookData';
import FeedBack from './screens/FeedBack';
import AddressForm from './screens/AddressForm';
import MyCars from './screens/MyCars';
import PreviewScreen from './screens/PreviewScreen'

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import BookScreen from './screens/BookScreen';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: 'transparent',
    },
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
      <StripeProvider publishableKey="pk_test_51Ok46fKWEwsvQglH9hhqE9YhYSWHDpXG84EM5EaASAA4dnyBSAPzomo4ZDfcWJvK9EloBaQ8eOASrlgoBZhUBq7d00X4PRp02d">
      <NavigationContainer theme={theme}>
          <Stack.Navigator
              initialRouteName="MyCars"
              screenOptions={{
                  headerShown: false,
              }}
          >
              <Stack.Screen name="DrawerScreens" component={DrawerScreens} />
              <Stack.Screen name="AddressForm" component={AddressForm} options={{ headerShown: true }} />
              <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: true }} />
              <Stack.Screen name="BookScreen" component={BookScreen} options={{ headerShown: true }}/>
              <Stack.Screen name="PreviewScreen" component={PreviewScreen} options={{ headerShown: true }}/>
          </Stack.Navigator>
      </NavigationContainer>
  </StripeProvider>
    );
};

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
            initialRouteName={'MyCars'}
            drawerContent={CustomDrawerContent}
            screenOptions={{
                headerShown: true,
                drawerLabelStyle: {
                    fontSize: 20,
                    color: 'black',
                    fontFamily: 'PlayfairDisplay-Bold',
                },
                headerStyle: {
                    backgroundColor: 'black',
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
                        <Image source={icons.home} style={{ width: 30, height: 35 }} />
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
                name="Feedback"
                component={FeedBack}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Image source={icons.card_icon} style={{ width: 35, height: 35 }} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Signup"
                component={Register}
                options={{
                    drawerLabel: () => null,
                    title: null,
                    drawerIcon: () => null,
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="Login"
                component={LoginForm}
                options={{
                    drawerLabel: () => null,
                    title: null,
                    drawerIcon: () => null,
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="MyCars"
                component={MyCars}
                options={{
                    drawerLabel: () => null,
                    title: null,
                    drawerIcon: () => null,
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    );
};

export default App;
