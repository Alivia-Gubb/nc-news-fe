import axios from "axios";


const ncNews = "https://nc-news-b7ro.onrender.com";

export const getArticles = () => {
    const articlesURL = ncNews + "/api/articles";
    return axios
        .get(articlesURL)
        .then((response) => {
            return response.data?.articles;
        });
};
export const getSingleArticle = (articleId) => {
    console.log("fetching article id: ", articleId);
    const singleArticleURL = `${ncNews}/api/articles/${articleId}`;
    return axios 
        .get(singleArticleURL)
        .then((response) => {
            
            return response.data?.article;
        });
}; 
export const getComments = (articleId) => {
    const articleCommentsURL = `${ncNews}/api/articles/${articleId}/comments`;
    return axios
        .get(articleCommentsURL)
        .then((response) => {
            console.log(response);
            return response.data?.comments;
        });
};