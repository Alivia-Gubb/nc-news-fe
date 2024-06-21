import { useEffect } from "react";
import { getArticles } from "../api";
import { useState } from "react";
import { Grid } from "@mantine/core";
import ArticleCard from "./ArticleCard";
import Loading from "../Loading";


const Articles = () => {
    const [articles, setArticles] = useState([]);
    

    useEffect(() => {
        getArticles().then((articlesResponse) => {
            setArticles(articlesResponse);
        }); 
    }, []);

    if (articles.length === 0) return <Loading />;
    
    return (
        <Grid h="100%">
            {
                articles.map((article) => {
                    return (
                        <Grid.Col key={article.article_id} span={{ base: 12, md: 6, lg: 3 }}>
                            <ArticleCard article={article}/>
                        </Grid.Col>
                    );
                })
            }
        </Grid>
    );
};

export default Articles;   