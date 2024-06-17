import axios from 'axios';

const ncNews = 'https://nc-news-b7ro.onrender.com'

export const getArticles = () => {
    const articlesURL = ncNews + '/api/articles'
    return axios
        .get(articlesURL)
        .then((response) => {
            return (response.data?.articles)
        })
}
