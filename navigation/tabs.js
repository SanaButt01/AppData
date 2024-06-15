import React from "react";
import {Image,TouchableOpacity,View} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/";
import { icons, COLORS,SIZES } from "../constants";
import ShoppingCart from "../screens/ShoppingCart";

const Tab = createBottomTabNavigator();



const Tabs = ({ navigation }) => {
    const goToCart = () => {
        navigation.navigate('ShoppingCart'); // Make sure 'ShoppingCart' is defined as a screen in your navigation stack
      };
    return (
        <Tab.Navigator
            screenOptions={() => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: "10%",
                    backgroundColor: COLORS.black
                },

                tabBarIcon: () => {
                  
                            return (
                                <TouchableOpacity style={{backgroundColor: COLORS.primary, height: 40,
                                    paddingLeft: 3,
                                    paddingRight: SIZES.radius,
                                    borderRadius: 20,
                                    marginTop:30
                        
                                }}
                                onPress={goToCart}//this function helps to show alerts msgs when clicking on it
                            >
              
                                <View style={{ flex: 1, flexDirection: 'row'}}>
                                <Image
                                    source={icons.bookmark_icon}
                                    resizeMode="contain"
                                    style={{
                                    
                                     marginLeft:8,
                                      marginBottom:8,
                                        width: 45,
                                        height: 45,
                                    }}
                                />
                                    </View>
                                </TouchableOpacity>
                            )

                        
                    
                }
            })}
        >
            <Tab.Screen
                name="myhome"
                component={Home}
            />
        </Tab.Navigator>
    )
}

export default Tabs;