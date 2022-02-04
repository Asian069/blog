// 网站标题控制

var RouterTitle = "",
    SiteTitle = "";

function setTitle(){
    if(!RouterTitle || !SiteTitle){
        document.title = "loading...";
    }else if(!RouterTitle && SiteTitle){
        document.title = SiteTitle;
    }else if(RouterTitle && !SiteTitle){
        document.title = RouterTitle;
    }else{
        document.title = `${RouterTitle}-${SiteTitle}`
    }
}

export default{
    // 设置路由标题
    setRouterTitle(title){
        RouterTitle = title;
        setTitle();
        // console.log("设置路由标题",title)
    },
    // 设置网站标题
    setSiteTitle(title){
        SiteTitle = title;
        setTitle();
        // console.log("设置网站标题",title)
    }
}