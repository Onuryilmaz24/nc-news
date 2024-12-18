
import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://nc-news-project-w66a.onrender.com/api"
})

export const getAllArticles = (limit,page,slug) => {
    return newsApi.get(`/articles`,{
        params:{
            limit: limit,
            p:page,
            topic:slug
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

export const updateArticleVote = (article_id,vote) => {
    return newsApi.patch(`/articles/${article_id}`,vote)
}

export const updateCommentsVote = (comment_id,vote) => {
    return newsApi.patch(`/comments/${comment_id}`,vote)
}

export const getUserInformation = (username) => {
    return newsApi.get(`/users/${username}`).then(({data})=>{
        return data.user
    })
}

export const postNewComment = (article_id,body) => {
    return newsApi.post(`/articles/${article_id}/comments`,body).then(({data})=>{
        return data.comment
    })
}

export const deleteComment = (comment_id) => {
    return newsApi.delete(`/comments/${comment_id}`).then(({data})=>{
        return data
    })
}

export const getAllTopics = () => {
    return newsApi.get(`/topics`).then(({data})=>{
        return data.topics
    })
}

export const getAllUsers = () => {
    return newsApi.get(`/users`).then(({data})=>{
        return data.users
    })
}