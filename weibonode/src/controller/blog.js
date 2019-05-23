const getList = (author, keyword) => {
    // 先返回假数据，格式是正确的
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1546610491112,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 15466104924373,
            author: 'lisi'
        }
    ]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1546610491112,
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) => {
    // blogData默认空对象，是一个博客对象，包含title，content属性
    console.log('blogData...', blogData);
    return {
        id: 3, // 新建博客，插入到数据表中的id
    }
}

const updateBlog = (id, blogData ={}) => {
    // blogData默认空对象，是一个博客对象，包含title，content属性,id是要更新博客的id
    console.log('update blog', id, blogData)
    return false;
}

const delBlog = (id) => {
    // id 是要删除博客的id
    return true;
}

module.exports = {
    getList,
    getDetail, 
    newBlog, 
    updateBlog,
    delBlog,
}