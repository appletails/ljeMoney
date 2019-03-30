// 百分比+保留两位小数
function numToFixed(num){
    num = (num*100).toFixed(2) + '%'
    return num
}

function parseFormatNum(number){
    number = parseFloat((number + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";  
    var sub_val = number.split(".")[0].split("").reverse(); 
    var sub_xs = number.split(".")[1];  
   
    var show_html = "";  
    for (var i = 0; i < sub_val.length; i++){  
        show_html += sub_val[i] + ((i + 1) % 3 == 0 && (i + 1) != sub_val.length ? "," : "");  
    }  
    return show_html.split("").reverse().join("") + "." + sub_xs;  

}

// 小时转换天数
function timeChange(times){
    if(times<24){
        return `${times}小时`
    }else{
        let day = Math.floor(times/24)
        let hours = times%24
        return `${day}天${hours}小时` 
    }
}

export{
    numToFixed,
    parseFormatNum,
    timeChange
}