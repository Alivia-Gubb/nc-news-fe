import { Text, Image, Container, Divider, Title, Group, Button } from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";
import { getSingleArticle, updateVote } from "../api";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import Error from "../Error";
import Comments from "./Comments";
import { IconExclamationCircle, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const SingleArticle = () => {

    const { article_id } = useParams();

    const [error, setError] = useState(undefined);
    const [article, setArticle] = useState(undefined);
    const [votes, setVotes] = useState(0);

    const handleUpVote = () => {
        updateVote(article_id, 1).then(() => {
            setVotes(votes + 1);
        }).catch((err) => {
            notifications.show({
                title: "Error!",
                message: `An error has occurred: ${err}`,
                icon: <IconExclamationCircle />,
                color: "red"
            });
        });
    };      

    const handleDownVote = () => {
        updateVote(article_id, -1).then(() => {
            setVotes(votes - 1);
        }).catch((err) => {
            notifications.show({
                title: "Error!",
                message: `An error has occurred: ${err}`,
                icon: <IconExclamationCircle />,
                color: "red"
            });
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
                        <Button variant="subtle" onClick={handleUpVote} size="compact-sm">
                            <IconThumbUp />
                        </Button>
                        <Text c="dimmed">{votes}</Text>
                        <Button variant="subtle" onClick={handleDownVote} size="compact-sm">
                            <IconThumbDown />
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