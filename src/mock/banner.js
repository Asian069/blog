import Mock from "mockjs"; 

Mock.mock("/api/banner", "get",{ // 要拦截的地址 要拦截的Ajax请求的类型 数据模板
    // code 为 0，会从data中获取业务数据
    // code 为 0，会把msg提示显示到页面上
    code: 0, // 错误码(根据自己公司定义的来)
    msg: "请求失败", // 信息(错误后显示的信息)
    data:[ // 数据(模拟的数据)
        {
            id: "1",
            midImg: "https://circle-1306899586.cos.ap-shanghai.myqcloud.com/%E7%B4%A0%E6%9D%90%E5%9B%BE%E7%89%87/%E7%83%AD%E6%B0%94%E7%90%83.jpg",
            bigImg: "https://circle-1306899586.cos.ap-shanghai.myqcloud.com/%E7%B4%A0%E6%9D%90%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202110251412558.jpg",
            title: "凛冬将至",
            description: "人唯有恐惧的时候方能勇敢",
          },
          {
            id: "2",
            midImg: "https://circle-1306899586.cos.ap-shanghai.myqcloud.com/%E7%B4%A0%E6%9D%90%E5%9B%BE%E7%89%87/%E5%A4%A9%E7%A9%BA.jpg",
            bigImg: "https://circle-1306899586.cos.ap-shanghai.myqcloud.com/%E7%B4%A0%E6%9D%90%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202110251412556.jpg",
            title: "血火同源",
            description: "如果我回头，一切都完了",
          },
          {
            id: "3",
            midImg: "https://circle-1306899586.cos.ap-shanghai.myqcloud.com/%E7%B4%A0%E6%9D%90%E5%9B%BE%E7%89%87/%E5%92%A9%E5%92%A9.jpg",
            bigImg: "https://circle-1306899586.cos.ap-shanghai.myqcloud.com/%E7%B4%A0%E6%9D%90%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202110251412557.jpg",
            title: "听我怒吼",
            description: "兰尼斯特有债必偿",
          },
    ]
})