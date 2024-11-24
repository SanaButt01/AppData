import React, { useEffect,useState } from 'react';
import { NavigationContainer, DefaultTheme,CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox, View, Image, TouchableOpacity,StyleSheet,Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { StripeProvider } from '@stripe/stripe-react-native';
import { clearCart } from './ACTIONS';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import EnterCodeScreen from './screens/EnterCodeScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import OrderSuccessScreen from './screens/OrderSuccessful';

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
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            // Clear the AsyncStorage item indicating the login status
            await AsyncStorage.removeItem('isLoggedIn');
            
            // Dispatch action to clear the cart
            dispatch(clearCart());

            // Navigate to the 'Login' screen by resetting the navigation state
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <DrawerContentScrollView {...props}>
        <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Image source={icons.logo2} style={{ width: 110, height: 150 }} />
        </View>
        <DrawerItemList {...props} />
        <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <View style={styles.logoutContent}>
                    <Text style={styles.logoutText}>Logout</Text>
                    <Image source={icons.logout} style={styles.logoutIcon} /> 
                </View>
            </TouchableOpacity>
        </View>
    </DrawerContentScrollView>
    
    
    );
};

const DrawerScreens = () => {
    return (
        <Drawer.Navigator
            initialRouteName={'Dashboard'}
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
    const [initialRouteName, setInitialRouteName] = useState(null);

    // Flag to check if we're in development mode
    const isDevelopment = true; // Static flag for development mode
    const isPresentationMode = false; // Flag for forcing MyCars during presentation
    
    useEffect(() => {
        const checkAppState = async () => {
            try {
                if (isPresentationMode) {
                    console.log('Presentation Mode: Forcing initialRouteName to MyCars');
                    setInitialRouteName('MyCars');
                    return; // Skip other logic
                }
    
                // Regular app state logic
                const devLaunchFlag = await AsyncStorage.getItem('devLaunch');
                console.log('Development Mode:', isDevelopment);
                console.log('Dev Launch Flag:', devLaunchFlag);
    
                if (isDevelopment) {
                    if (devLaunchFlag === null) {
                        console.log('First Dev Launch - Setting initialRouteName to MyCars');
                        setInitialRouteName('MyCars');
                        await AsyncStorage.setItem('devLaunch', 'true');
                    } else {
                        console.log('Checking regular flow for development mode');
                        const firstLaunchFlag = await AsyncStorage.getItem('isFirstLaunch');
                        const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
    
                        if (firstLaunchFlag === null) {
                            console.log('First Launch - Setting initialRouteName to MyCars');
                            await AsyncStorage.setItem('isFirstLaunch', 'false');
                            setInitialRouteName('MyCars');
                        } else {
                            console.log('User Logged In:', loggedInStatus === 'true');
                            setInitialRouteName(loggedInStatus === 'true' ? 'DrawerScreens' : 'Login');
                        }
                    }
                } else {
                    // Production logic
                    const firstLaunchFlag = await AsyncStorage.getItem('isFirstLaunch');
                    const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
    
                    if (firstLaunchFlag === null) {
                        console.log('First Launch - Setting initialRouteName to MyCars');
                        await AsyncStorage.setItem('isFirstLaunch', 'false');
                        setInitialRouteName('MyCars');
                    } else {
                        console.log('User Logged In:', loggedInStatus === 'true');
                        setInitialRouteName(loggedInStatus === 'true' ? 'DrawerScreens' : 'Login');
                    }
                }
    
                // Hide splash screen after logic
                SplashScreen.hide();
            } catch (error) {
                console.error('Failed to check app state', error);
            }
        };
    
        checkAppState();
    }, [isDevelopment, isPresentationMode]);

    if (initialRouteName === null) {
        return null; // Or a loading spinner
    }


    return (
      <StripeProvider publishableKey="pk_test_51Ok46fKWEwsvQglH9hhqE9YhYSWHDpXG84EM5EaASAA4dnyBSAPzomo4ZDfcWJvK9EloBaQ8eOASrlgoBZhUBq7d00X4PRp02d">
      <NavigationContainer theme={theme}>
      <Stack.Navigator
                initialRouteName={initialRouteName}
                screenOptions={{ headerShown: false }}
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
              <Stack.Screen name="Reset Password" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Verification Code" component={EnterCodeScreen} options={{ headerShown: true }}/>
              <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} options={{ headerShown: false }}/>

          </Stack.Navigator>
      </NavigationContainer>
  </StripeProvider>
    );
};
const styles = StyleSheet.create({
    logoutContainer: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: 'white',
        marginTop:35
    },
    logoutButton: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: 'black',
        borderRadius: 5,
    },
    logoutContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutIcon: {
        width: 60, // Adjust the size of the icon
        height: 30, // Adjust the size of the icon
        marginLeft: 10, // Space between the icon and text
        backgroundColor: 'white',
    },
    logoutText: {
        color: 'white',
        marginLeft: 50,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center', // Adjust font size as needed
    },
});

export default App;
