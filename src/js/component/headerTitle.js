import React from 'react'
import {View,Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
class HeaderTitle extends React.Component{
    render(){
        return(
            <View style={{height:50,position:'relative',backgroundColor:this.props.theme,justifyContent:'center'}}>
                <Text style={{textAlign:'center',color:'#FFF',fontSize:25,fontWeight:'bold'}}>{this.props.title}</Text>
                <View style={{position:'absolute',right:20,width:80,flexDirection:'row',justifyContent:'space-between'}}>
                    <Icon name="search" size={25} color="#FFF" />
                    <Icon name="th-list" size={25} color="#FFF" />
                </View>
            </View>
        );
    }
}
let mapStateToProps=function(state){
    return{
        theme:state.theme.bgColor
    }
}
export default connect(mapStateToProps,null)(HeaderTitle);