let until={};
until.get=function(url,params){  
    if (params) {  
        let paramsArray = [];  
        //拼接参数  
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
        if (url.search(/\?/) === -1) {  
            url += '?' + paramsArray.join('&')  
        } else {  
            url += '&' + paramsArray.join('&')  
        }  
    }  
    //fetch请求  
    return fetch(url,{  
        method: 'GET',  
    })  
    .then((response) =>response.json() )
    .catch((error) => {  
        alert(error)  
    })  
}  
until.debounce=function(fn,delay){
    let timer = null;
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(fn,delay)
    }
}
until.throttle=function (func, wait) {
    let previous = 0;
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
export default until;
 