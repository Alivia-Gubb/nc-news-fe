import { getComments } from "../api";
import { useEffect } from "react";
import { useState } from "react";
import { Stack, Title, Divider } from "@mantine/core";
import CommentCard from "./CommentCard";

const Comments = ({articleId}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(articleId).then((commentResponse) => {
            setComments(commentResponse);
        });
    }, [articleId]);

    
    if(comments.length === 0) return <p>No comments yet</p>;     

    return(
        <>
            <Title order={4} mt="lg" mb="sm">Comments</Title>
            <Divider size="sm" my="md"/>
            <Stack>
                {
                    comments.map((comment) => {
                        return (
                            <section key={comment.comment_id}>
                                <CommentCard comment={comment} />
                            </section>
                        );
                    })
                }
                
            </Stack>
        </>
    );
};

export default Comments;