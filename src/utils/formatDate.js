// 封装日期，把时间戳变成年月日
export default function(timestamp, showTime = false){ // timestamp 时间戳，事件属性，可返回一个时间戳
    const data = new Date(+timestamp);
    const month = (data.getMonth()+1).toString().padStart(2, "0");
    // toString() 将数组转化成字符串 
    // padStart(2, 0) 长度为2，不足2的时候，前面填充一个0
    const day = data.getDay().toString().padStart(2, "0");
    let str = `${data.getFullYear()}-${month}-${day}`;
    if(showTime){ // 如果showTime为 true的话把时分秒加上
        const hour = data.getHours().toString().padStart(2, "0");
        const minute = data.getMinutes().toString().padStart(2, "0");
        const second = data.getSeconds().toString().padStart(2, "0");
        str += `${hour}:${minute}:${second}`
    }
    return str;
}