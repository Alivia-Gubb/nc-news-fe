import { getComments, postComment } from "../api";
import { useEffect } from "react";
import { useState } from "react";
import { Stack, Title, Divider, Textarea, Group, Button } from "@mantine/core";
import CommentCard from "./CommentCard";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

const Comments = ({articleId}) => {
    const [comments, setComments] = useState([]);
    const [sendingComment, setSendingComment] = useState(false);

    useEffect(() => {
        getComments(articleId).then((commentResponse) => {
            setComments(commentResponse);
        });
    }, [articleId]);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            body: "",
        },
    
        validate: {
            body: (value) => (value.length >= 4 ? null : "A comment must have at least 4 characters"),
        },
    });

    const handleCommentSubmit = (values) => {
        setSendingComment(true);

        const username = "tickle122";
        const body = values.body;

        postComment(articleId, username, body).then((comment) => {
            setComments((prevComments) => {
                form.reset();
                setSendingComment(false);

                
                return [comment, ...prevComments];
            });
            notifications.show({
                title: "Comment posted!",
                message: `Thank you for sharing your thoughts, ${username}!`,
            });
        });
    };

    
    if(comments.length === 0) return <p>No comments yet</p>;     

    return(
        <>
            <Title order={4} mt="lg" mb="sm">Comments</Title>
            <Divider size="sm" my="md"/>
            <Stack>
                <section>
                    <form onSubmit={form.onSubmit((values) => handleCommentSubmit(values))}>
                        <Textarea
                            withAsterisk
                            label="Comment"
                            description="Share your thoughts"
                            autosize
                            minRows={2}
                            maxRows={4}
                            key={form.key("body")}
                            {...form.getInputProps("body")}
                            mb="sm"
                        />
                        <Group justify="flex-end">
                            <Button disabled={sendingComment} type="submit">Submit</Button>
                        </Group>
                    </form>
                </section>
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