import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { View, Text, LogBox } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeIcon as HomeOutline, HeartIcon as HeartOutline, ShoppingBagIcon as BagOutline } from 'react-native-heroicons/outline';
import {HomeIcon as HomeSolid, HeartIcon as HeartSolid, ShoppingBagIcon as BagSolid} from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import ProductScreen from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function Navigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
        contentStyle: {backgroundColor: 'white'}
    }}>
      <Stack.Screen name="Home" options={{headerShown: false}} component={HomeTabs} />
      <Stack.Screen name="Product" options={{headerShown: false}} component={ProductScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

function HomeTabs() {
  return(
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarIcon: ({focused, color, size}) => menuIcons(route, focused),
      tabBarStyle:{
        marginBottom: 20,
        height: 75,
        alignItems: 'center',
        borderRadius: 100,
        marginHorizontal: 20,
        backgroundColor: themeColors.bgLight,
      },
      tabBarItemStyle:{
        marginTop: 0
      }
      })}>
      <Tab.Screen name="home" component ={HomeScreen} />
      <Tab.Screen name="favourite" component ={HomeScreen} />
      <Tab.Screen name="cart" component ={HomeScreen} />
    </Tab.Navigator>
  )
}


const menuIcons = (route, focused)=> {
  let icon;
  

  if (route.name === 'home') {
    icon =  focused? <HomeSolid size="30" color={themeColors.bgLight} /> : <HomeOutline size="30" strokeWidth={2} color="white" />
  } else if (route.name === 'favourite') {
    icon =  focused? <HeartSolid size="30" color={themeColors.bgLight} /> : <HeartOutline size="30" strokeWidth={2} color="white" />
  }else if(route.name==='cart'){
    icon =  focused? <BagSolid size="30" color={themeColors.bgLight} /> : <BagOutline size="30" strokeWidth={2} color="white" />
  }

  
  let buttonClass = focused? "bg-white": "";
  return (
    <View className={"flex items-center rounded-full p-3 shadow " + buttonClass}>
      {icon}
    </View>
  )
}