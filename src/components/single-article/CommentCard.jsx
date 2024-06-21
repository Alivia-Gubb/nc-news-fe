import { Card, Text, Grid, Button, Stack } from "@mantine/core";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";
import { IconTrash, IconExclamationCircle } from "@tabler/icons-react";
import { deleteComment } from "../api";
import { notifications } from "@mantine/notifications";

const CommentCard = ({comment, refreshComments}) => {
    // Context
    const { user } = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);

        deleteComment(comment.comment_id).then(() => {
            setLoading(false);
            notifications.show({
                title: "Success!",
                message: "Your comment has been deleted.",
            });
            refreshComments();
        })
            .catch((err) =>{
                notifications.show({
                    title: "Error!",
                    message: `An error has occurred: ${err}`,
                    icon: <IconExclamationCircle />,
                    color: "red"
                });
            });
    };

    return (
        <Card
            withBorder
            shadow="xs"
            padding="xs"
            h="100%"
        >
            <Grid>
                <Grid.Col span="auto">
                    <Text mt="xs" c="dimmed" size="sm">
                        {comment.author} 
                    </Text>
                    <Text size="sm"> {comment.body}</Text>
                </Grid.Col>
                <Grid.Col span={2} >
                    <Stack h="100%" gap="xs" justify="space-between">
                    
                        <Button variant="light" size="compact-xs">
                            {comment.votes}
                        </Button>

                        {
                            user === comment.author ?
                                <Button onClick={handleDelete} variant="subtle" size="compact-xs" loading={ loading } >
                                    <IconTrash size="20px" />
                                </Button> :
                                null
                        }
                    </Stack>
                </Grid.Col>
            </Grid>
        </Card>
    );
};

export default CommentCard;