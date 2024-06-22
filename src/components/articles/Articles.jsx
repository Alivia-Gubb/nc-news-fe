import { useEffect } from "react";
import { getArticles } from "../api";
import { useState } from "react";
import { Grid, Text, Group, Select, Divider } from "@mantine/core";
import ArticleCard from "./ArticleCard";
import Loading from "../Loading";
import { useParams } from "react-router-dom";


const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [sortOption, setSortOption] = useState("Date");
    const [orderOption, setOrderOption] = useState("Descending");

    const { topic_slug } = useParams();

    // Initial data fetching
    useEffect(() => {
        getArticles().then((articlesResponse) => {
            if (topic_slug) {
                setArticles(articlesResponse.filter((article) => article.topic === topic_slug));
            } else {
                setArticles(articlesResponse);
            }
        }); 
    }, [topic_slug, setArticles]);

    // Handle sorting
    useEffect(() => {
        setArticles((currentArticles) => {
            let sorted = [];

            // Handle sort option
            if (sortOption === "Date") {
                sorted = currentArticles.toSorted((articleA, articleB) => {
                    const aDate = new Date(articleA.created_at);
                    const bDate = new Date(articleB.created_at);
    
                    if (aDate > bDate) return 1;
                    if (bDate > aDate) return -1;
                    return 0;
                });
            }

            if (sortOption === "Comment count") {
                sorted = currentArticles.toSorted((articleA, articleB) => {
                    const aComments = articleA.comment_count;
                    const bComments = articleB.comment_count;
    
                    return aComments - bComments;
                });
            }

            if (sortOption === "Votes") {
                sorted = currentArticles.toSorted((articleA, articleB) => {
                    const aVotes = articleA.votes;
                    const bVotes = articleB.votes;
                    return aVotes - bVotes;
                });
            }

            // Handle sort order
            if (orderOption === "Ascending") {
                return sorted;
            } else if (orderOption === "Descending") {
                return sorted.reverse();
            }
        });
    }, [sortOption, orderOption, setArticles]);

    if (topic_slug && articles.length === 0) return <Text>No articles found for topic: {topic_slug}</Text>;

    if (articles.length === 0) return <Loading />;
    
    return (
        <>
            <Group w="100%" grow>
                <Select
                    value={sortOption}
                    onChange={setSortOption}
                    label="Sort by"
                    placeholder="Click to select"
                    data={["Date", "Comment count", "Votes"]}
                    allowDeselect={false}
                />
                <Select
                    value={orderOption}
                    onChange={setOrderOption}
                    label="Order by"
                    data={["Ascending", "Descending"]}
                    allowDeselect={false}
                />
            </Group>
            <Divider my="md" />
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
        </>
    );
};

export default Articles;   