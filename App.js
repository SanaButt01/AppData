
import { createStackNavigator } from "@react-navigation/stack"; //react library stack
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';//react library navigation 
import { BookDetail } from "./screens/";
import Tabs from "./navigation/tabs";
import { useFonts } from 'expo-font';//built in expo fonts
import { LogBox } from 'react-native';
import { Provider } from "react-redux";
import React,{useState} from 'react';
import Store from "./Store";
import Main from "./Main";





const AppRedux = () => (
     //fat arrow funcation
  <Provider store={Store}><Main/></Provider>
 
    )


export default AppRedux;