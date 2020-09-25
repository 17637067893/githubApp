import React from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
class WelcomePage extends React.Component{
    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.props.navigation.replace('index')
        },2000)
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer)
    }
    render(){
        return(
            <View style={styles.box}>
                <Image style={{width:'100%',height:'100%',resizeMode:'cover'}} source={require('../../assets/img/wel.jpg')}></Image>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    box:{
        width:'100%',
        height:'100%',
    }
})
export default WelcomePage;