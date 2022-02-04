import request from './request';

// 获取博客列表数据

export async function getBlogs(page= 1, limit = 10, categoryid=-1){ //当前页码 页容量  所属分类，-1表示全部
    // console.log(page, limit, categoryid)
    return await request.get('/api/blog',{ // 返回给我们一个结果   
        params: {
            page,
            limit,
            categoryid,
        }
    })
}

// 获取博客分类
export async function getBlogCategories(){
    return await request.get('/api/blogtype'); 
}

// 获取单个博客
export async function getBlog(id){
    return await request.get(`/api/blog/${id}`);
}

// 提交评论
export async function postComment(commentInfo){
    return await request.post(`/api/comment`, commentInfo); // 请求地址，请求数据
}

// 获取评论
// 当前页码 页容量 所属文章，-1表示不限 模糊查询的关键字
export async function getComments(blogid, page=1, limit=10){
    return await request.get("/api/comment", {
        params: { // 表示地址栏里？后面的东西
            blogid,
            page,
            limit,
        }
    })
}