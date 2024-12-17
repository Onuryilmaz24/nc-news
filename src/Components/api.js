
import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://nc-news-project-w66a.onrender.com/api"
})

export const getAllArticles = (limit,page) => {
    return newsApi.get(`/articles`,{
        params:{
            limit: limit,
            p:page
        }
    }).then(({data})=>{
        return data.articles
    })
}

export const getSingleArticle = (article_id) => {
    return newsApi.get(`/articles/${article_id}`).then(({data})=>{
        return data.article
    })
}

export const getCommentsOfSingleArticle = (article_id) => {
    return newsApi.get(`/articles/${article_id}/comments`).then(({data})=>{
        return data.comments
    })
}