import { Card, Text, Group, Button } from "@mantine/core";

const CommentCard = ({comment}) => {
    return (
        <Card
            withBorder
            shadow="xs"
            padding="xs"
            h="100%"
        >
            <Text size="sm"> {comment.body}</Text>

            <Group justify="space-between" component="section">
                <Button variant="light">
                    {comment.votes}
                </Button>
                <Text mt="xs" c="dimmed" size="sm">
                    by {comment.author} 
                </Text>
            </Group>
        </Card>
    );
};

export default CommentCard;