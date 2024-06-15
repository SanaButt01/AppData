import { createStackNavigator } from "@react-navigation/stack"; //react library stack
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';//react library navigation 
import { BookDetail,Home} from "./screens/";
import Register from './screens/Register';
import { LogBox,View,TouchableOpacity,Text } from 'react-native';
import ShoppingCart from './screens/ShoppingCart';
import LoginForm from './screens/LoginForm'
import BookData from "./screens/BookData";
import FeedBack from  './screens/FeedBack';
import AddressForm from './screens/AddressForm';
import MyCars from './screens/MyCars'; // Importing MyCarouselScreen component
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import SidePanel from "./screens/SidePanel";
import { Image } from "react-native";
import { icons } from "./constants";
import SplashScreen from 'react-native-splash-screen'
import { useEffect } from "react";


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();// its function in stack library 
const App = () => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);
   
    useEffect(()=>{
      SplashScreen.hide();
    },[])
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
            initialRouteName="MyCars"
                screenOptions={{
                    headerShown: false,
                    
                }}> 
         
                <Stack.Screen name="DrawerScreens" component={DrawerScreens}/>
                 <Stack.Screen name="AddressForm" component={AddressForm} options={{ headerShown: true }}/>
                <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: true }}/>
                <Stack.Screen name="SidePanel" component={SidePanel} />
             </Stack.Navigator>
        </NavigationContainer>
    )
}

const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Image source={icons.logo2} style={{ width: 110, height:150 }} />
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
                // fontWeight: 'bold',
                fontSize: 20,
                color: 'black', // Customize color as needed
                fontFamily: 'PlayfairDisplay-Bold'
            },
            headerStyle: {
                backgroundColor: 'black',
                height:70
              // Set your header background color
              
            },
            headerTintColor: 'white', // Set your header text color
            headerTitleStyle: {
                // fontWeight: 'bold',
                fontSize: 20,
                fontFamily: 'PlayfairDisplay-Bold' // Set your header title text style
                // Add more title styling options as needed
            },
            // Add more styling options as needed
            drawerStyle: {
                width: 300, // Specify the desired width of the drawer
                backgroundColor: 'white',
              },
        }} >
              <Drawer.Screen name="Dashboard" component={BookData} 
             options={{
                drawerIcon: ({ focused, color, size }) => (
                  <Image
                    source={icons.read_icon} // Replace with the actual path to your image
                    style={{  
                      width: 35,
                      height: 35,
                     }}
                  />
                )
              }} />
            <Drawer.Screen name="Clearance Sale" component={Home} 
    options={{
      drawerIcon: ({ focused, color, size }) => (
        <Image
          source={icons.home} // Replace with the actual path to your image
          style={{  
            width: 30,
            height: 35, }}
        />
      )
    }}
  />

        
            <Drawer.Screen name="ShoppingCart" component={ShoppingCart} 
                 options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Image
                        source={icons.claim_icon} // Replace with the actual path to your image
                        style={{  
                          width: 35,
                          height: 35,
                         }}
                      />
                    )
                  }}/>
            <Drawer.Screen name="Feedback" component={FeedBack}
                            options={{
                                drawerIcon: ({ focused, color, size }) => (
                                  <Image
                                    source={icons.card_icon} // Replace with the actual path to your image
                                    style={{  
                                      width: 35,
                                      height: 35,
                                     }}
                                  />
                                )
                              }} />
           
                <Drawer.Screen name="Signup" component={Register}  options={{ 
          drawerLabel: () => null, 
          title: null, 
          drawerIcon: () => null ,
          headerShown: false
      }}  /> 
            <Drawer.Screen name="Login" component={LoginForm} 
            options={{ 
              drawerLabel: () => null, 
              title: null, 
              drawerIcon: () => null ,
              headerShown: false
          }} /> 
      <Drawer.Screen 
        name="MyCars" 
        component={MyCars} 
        options={{ 
          drawerLabel: () => null, 
          title: null, 
          drawerIcon: () => null ,
          headerShown: false
      }} 
      />

        </Drawer.Navigator>
    );
}

export default App;