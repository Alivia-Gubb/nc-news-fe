import { Card, Text, Group, Badge, Image, Container, Divider, Title } from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";
import { getSingleArticle } from "./api";
import { useParams } from "react-router-dom";

const SingleArticle = () => {

    const { article_id } = useParams();

    const [article, setArticle] = useState([]);

    useEffect(() => {
        getSingleArticle(article_id).then((articleResponse) => {
            console.log(articleResponse);
            setArticle(articleResponse);
        });
    }, [ article_id ]);

    if (!article) return null;

    return (
        <section>
            <Container>
                <Image src={article.article_img_url} mb="lg" />
                <Title order={1}>{article.title}</Title>
                <Text c="dimmed">{article.author}</Text>
                <Divider size="md" my="lg"/>

                { article.body }
                
            </Container>
        </section>
    );
};


export default SingleArticle;