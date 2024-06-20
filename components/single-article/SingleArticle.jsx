import { Text, Image, Container, Divider, Title, Group, Button } from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";
import { getSingleArticle, updateVote } from "../api";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import Error from "../Error";
import Comments from "./Comments";

const SingleArticle = () => {

    const { article_id } = useParams();

    const [error, setError] = useState(undefined);
    const [article, setArticle] = useState(undefined);
    const [votes, setVotes] = useState(0);

    const handleUpVote = () => {
        updateVote(article_id, 1).then(() => {
            setVotes(votes + 1);
        }).catch((err) => {
            setError(err);
        });
    };      

    const handleDownVote = () => {
        updateVote(article_id, -1).then(() => {
            setVotes(votes - 1);
        }).catch((err) => {
            setError(err);
        });
    };

    useEffect(() => {
        getSingleArticle(article_id).then((articleResponse) => {
            setArticle(articleResponse);
            setVotes(articleResponse.votes);
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
                <Group justify="space-between" align="flex-end">
                    <Text c="dimmed">{article.author}</Text>
                    <Group>
                        <Button onClick={handleUpVote} size="compact-md">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg>
                        </Button>
                        <Text c="dimmed">{votes}</Text>
                        <Button onClick={handleDownVote} size="compact-md">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" /></svg>
                        </Button>
                    </Group>
                </Group>
                <Divider size="md" my="lg"/>

                <Text>
                    { article.body }
                </Text>

                <Comments articleId={article_id} />
                
                
            </Container>
        </section>
    );
};


export default SingleArticle;