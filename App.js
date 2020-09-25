
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import {Provider} from 'react-redux';
import store from './src/js/store/index'
import WelcomePage from './src/js/page/welcome'
import IndexPage from './src/js/page/index'
function HomeScreen() {
  return (
    <View style={{width:100,height:100,backgroundColor:'green'}}>
      <Text style={{fontSize:50,color:'red'}}>welcomePage</Text>
    </View>
  );
}
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor:'skyblue',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              flex: 1,
              textAlign:'center'
            },
          }}
        >
        <Stack.Screen
          name="home"
          component={WelcomePage}
          options={{
            title: '欢迎页',
            headerStyle: {
              backgroundColor: '#FF9880',
              height:0
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize:0
            },
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerStyle: {
              backgroundColor: 'skyblue',
              height:0
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize:0
            },
          }}
          component={IndexPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </>
  );
};

export default App;
