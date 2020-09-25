import React from 'react'
import {View,Text} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyPage from './myPage'
import TrandPage from './trendPage'
import PopularPage from './popularPage'
import FavoritePage from './favoritePage'
const Tab = createBottomTabNavigator();
import {connect} from 'react-redux'
class IndexPage extends React.Component{
    render(){
        return(
            <Tab.Navigator initialRouteName='popular'
              tabBarOptions={{
                activeTintColor: '#FFF',
                activeBackgroundColor:this.props.theme,
                labelStyle:{
                  fontSize:13
                },
                tabStyle:{
                  paddingTop:10
                }
              }}
            >
                <Tab.Screen name="popular"
                  style={{color:"#000"}}
                  component={PopularPage}
                  options={{
                      tabBarLabel: 'Popular',
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="rocket" size={25} color="#000" />
                      )
                    }}
                />
                <Tab.Screen name="trand"
                  style={{color:"#000"}}
                  component={TrandPage}
                  options={{
                      tabBarLabel: 'Trand',
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="line-chart" size={25} color="#000"  />
                      )
                    }}
                />
                <Tab.Screen name="favorite"
                  style={{color:"#000"}}
                  component={FavoritePage}
                  options={{
                      tabBarLabel: 'Favorite',
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="heart" size={25} color="#000" />
                      )
                    }}
                />
                <Tab.Screen name="my"
                  style={{color:"#000"}}
                  component={MyPage}
                  options={{
                      tabBarLabel: 'My',
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="user" size={25} color="#000" />
                      )
                    }}
                />
            </Tab.Navigator>
        );
    }
}
let mapStateToProps=function(state){
  return{
    theme:state.theme.bgColor
  }
}
export default connect(mapStateToProps,null)(IndexPage);