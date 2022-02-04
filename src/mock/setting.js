import Mock from "mockjs";
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "https://circle-1306899586.cos.ap-shanghai.myqcloud.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220116142426.jpg",
    siteTitle: "喜你十二",
    github: "https://github.com/DuYi-Edu",
    qq: "1378990936",
    qqQrCode:
      "https://circle-1306899586.cos.ap-shanghai.myqcloud.com/QQ.jpg",
    weixin: "yycl3991",
    weixinQrCode:
      "https://circle-1306899586.cos.ap-shanghai.myqcloud.com/weixin.jpg",
    mail: "1378990936qq.com",
    icp: "黑ICP备17001719号",
    githubName: "Asian069",
    favicon: "https://circle-1306899586.cos.ap-shanghai.myqcloud.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220116142426.jpg",
  },
});
