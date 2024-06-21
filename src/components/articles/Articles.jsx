import { useEffect } from "react";
import { getArticles } from "../api";
import { useState } from "react";
import { Grid, Text } from "@mantine/core";
import ArticleCard from "./ArticleCard";
import Loading from "../Loading";
import { useParams } from "react-router-dom";


const Articles = () => {
    const [articles, setArticles] = useState([]);

    const { topic_slug } = useParams();

    useEffect(() => {
        getArticles().then((articlesResponse) => {
            if (topic_slug) {
                setArticles(articlesResponse.filter((article) => article.topic === topic_slug));
            } else {
                setArticles(articlesResponse);
            }
        }); 
    }, [topic_slug]);

    if (topic_slug && articles.length === 0) return <Text>No articles found for topic: {topic_slug}</Text>;

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