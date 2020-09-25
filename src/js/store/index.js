import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
let defaultState = {
    theme: {
        bgColor: '#366DFF'
    },
    tabData: [
        { 
            'key': 'vue',
            page:'1',
            list:new Array()
         },
        { 
            'key':'react',
            page:'1',
            list:[]
        },
        { 
            'key': 'java',
             page:'1',
             list:[]
         }]
}
const reducer = function (state = defaultState, action) {
    switch (action.type) {
        case 'saveList':
            console.log('action',action)
            state.tabData = action.list
            break;
    }

    return { ...state }
}

let store = createStore(reducer, applyMiddleware(thunk))

export default store;