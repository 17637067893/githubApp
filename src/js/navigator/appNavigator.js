import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import WelcomePage  from '../page/welcome'
import HomePage  from '../page/homePage'
const Stack = createStackNavigator();

export const StackComponent =function(){ 
    return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="welcome" options={{title:'欢迎页'}} component={WelcomePage}></Stack.Screen>
              <Stack.Screen name="home" options={{title:'首页'}} component={HomePage}></Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
    )

}