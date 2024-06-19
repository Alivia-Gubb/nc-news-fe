import { getComments } from "../api";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Loader, Stack, Text } from "@mantine/core";
import CommentCard from "./CommentCard";

const Comments = ({articleId}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(articleId).then((commentResponse) => {
            setComments(commentResponse);
        });
    }, [articleId]);

    if(comments.length === 0) return (
        <Container>
            <Loader />
        </Container>
    );

    return(
        <Stack>
            {
                comments.map((comment) => {
                    return (
                        <section key="comment_id">
                            <CommentCard comment={comment} />
                        </section>
                    );
                })
            }
            
        </Stack>
    );
};

export default Comments;