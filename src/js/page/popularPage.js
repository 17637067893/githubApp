import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux'
import HeaderTitle from '../component/headerTitle'
import until from '../common/until'
import PopularItem from '../component/popularItem'
const Tab = createMaterialTopTabNavigator();
class PopularPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabDatas: []
    }
  }
  componentDidMount() {
    this.getList();
  }
  render() {
    console.log(2000,this.state.tabDatas);
    if(this.state.tabDatas.length>0){
       return (
      <>
          <HeaderTitle title="首页"></HeaderTitle>
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: '#FFF',
              inactiveTintColor: '#000',
              tabStyle: {
                backgroundColor: this.props.theme,
                minWidth: 100
              },
              scrollEnabled: true
            }}>
            {
              this.props.tabData.map((item, index) => {
                return (<Tab.Screen key={index} name={item.key} component={() => {
                  return (<PopularItem item={item}></PopularItem>)
                }} />)
              })
            }
          </Tab.Navigator>
      </>
    );
    }else{
      return(
        <>
        <HeaderTitle title="首页"></HeaderTitle>
        <View style={{height:'90%',justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:30,color:'gray'}}>数据加载中...</Text>
        </View>
        </>
      );
    }
  }
  getList = () => {
    let url = 'https://api.github.com/search/repositories'
    let tabData = this.props.tabData
    console.log('getList Start',tabData);
    for (let j = 0, len = tabData.length; j < len; j++) {
      until.get(url, {
        q: tabData[j].key,
        sort: "stars",
        per_page: 6,
        page: tabData[j].page
      }).then(res => {
        tabData[j].list = res.items
        console.log(res);
        if (j >= tabData.length - 1) {
          this.setState({
            tabDatas:tabData
          },()=>{
            this.props.saveList(tabData)
          })
          
        }
      })
      
    }
  }
}
let mapStateToProps = function (state) {
  return {
    theme: state.theme.bgColor,
    tabData: state.tabData
  }
}
let mapDispatcToProps = function (dispatch) {
  return {
    saveList: (val) => {
      dispatch({
        type: 'saveList',
        list: val
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatcToProps)(PopularPage);