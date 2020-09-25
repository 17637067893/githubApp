import React from 'react';
import { TouchableOpacity, ActivityIndicator, View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import until from '../common/until'
import * as _ from 'lodash'
class PopularItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            list: [],
            loadOnOff: false,
            scrollOnOff:false,
        }
    }
    componentDidMount() {
        this.setState({
            list: this.props.item.list
        })
    }
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity >
                <View style={styles.box}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text tyle={styles.description}>{item.description}</Text>
                    <View style={styles.bottom}>
                        <View><Text style={styles.txt}>跟新:{item.updated_at.substring(0, 10)}</Text></View>
                        <View><Text style={styles.txt}>Stars:{item.stargazers_count}</Text></View>
                        <View><Icon style={styles.icon} name="rocket" size={25} color="#000" /></View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.list}
                    renderItem={this.renderItem}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refreshHandle.bind(this, this.props.item)}
                    onEndReachedThreshold={0.1}
                    onEndReached={this.onEndReachedHandle.bind(this, this.props.item)}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={() => this.renderLoadMoreView()}
                    onScroll={(val)=>{this.setState({scrollOnOff:true})}}
                ></FlatList>
            </View>
        );
    }
    //上拉加载布局
    renderLoadMoreView() {
        return <View style={[styles.loadMore, this.state.loadOnOff ? "null" : styles.hiden]}>
            <ActivityIndicator
                style={styles.indicator}
                size={"large"}
                color={"red"}
                animating={true}
            />
            <Text>正在加载更多</Text>
        </View>
    }
    refreshHandle = (val) => {
        console.log('refresh start')
        let url = 'https://api.github.com/search/repositories'
        this.setState({
            refreshing: true
        }, () => {
            until.get(url, {
                q: val.key,
                sort: "stars",
                per_page: 6,
                page: 1
            }).then(res => {
                this.setState({
                    refreshing: false,
                    list: res.items
                })
            })
        })

    }
    onEndReachedHandle = (val) => {
        if(this.state.scrollOnOff){
            let url = 'https://api.github.com/search/repositories'
            console.log('start',val)
            this.setState({
                loadOnOff: true
            }, () => {
                until.get(url, {
                    q: val.key,
                    sort: "stars",
                    per_page: 6,
                    page: ++val.page
                }).then(res => {
                    console.log('end',res)
                    this.setState({
                        loadOnOff: false,
                        scrollOnOff:false,
                        list:this.state.list.concat(res.items)
                    })
                })
            })
        }
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE'
    },
    box: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10
    },
    title: {
        marginBottom: 10,
        fontSize: 20
    },
    bottom: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: "space-between"
    },
    txt: {
        fontSize: 15,
        color: 'gray'
    },
    icon: {
        color: 'skyblue'
    },
    description: {
        marginTop: 10,
        color: 'gray'
    },
    loadMore: {
        alignItems: "center"
    },
    indicator: {
        color: "red",
        margin: 10
    },
    hiden: {
        display: "none"
    }
})
const stateToProps = (state) => ({
    list: state.tabData
})
export default connect(stateToProps, null)(PopularItem);