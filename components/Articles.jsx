import { useEffect } from "react";
import { getArticles } from "./api";
import { useState } from "react";


const Articles = () => {
    const [articles,setArticles] = useState([]);

    useEffect(() => {
        getArticles().then((articlesResponse) => {
            setArticles(articlesResponse);
        }); 
    }, []);

    return (
        <ul>
            {
                articles.map((article) => {
                    return (
                        <li key={article.article_id}>
                            <h3>
                                {article.title}
                            </h3>
                        </li>
                    );
                })
            }
        </ul>
    );
};

export default Articles;