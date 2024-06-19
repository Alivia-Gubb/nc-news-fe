import { Text, Image, Container, Divider, Title } from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";
import { getSingleArticle } from "../api";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import Error from "../Error";
import Comments from "./Comments";

const SingleArticle = () => {

    const { article_id } = useParams();

    const [error, setError] = useState(undefined);
    const [article, setArticle] = useState(undefined);

    useEffect(() => {
        getSingleArticle(article_id).then((articleResponse) => {
            setArticle(articleResponse);
        }).catch((err) => {
            setError(err);
        });
    }, [ article_id ]);

    if (error) return <Error error={error} />;

    if (!article) return <Loading />;
    
    return (
        <section>
            <Container>
                <Image src={article.article_img_url} mb="lg" />
                <Title order={1}>{article.title}</Title>
                <Text c="dimmed">{article.author}</Text>
                <Divider size="md" my="lg"/>

                <Text>
                    { article.body }
                </Text>

                <Title order={4} my="lg">Comments</Title>
                <Divider size="md" my="lg"/>
                <Comments articleId={article_id} />
                
            </Container>
        </section>
    );
};


export default SingleArticle;