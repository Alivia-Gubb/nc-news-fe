import { Card, Text, Group, Badge } from "@mantine/core";

const CommentCard = ({comment}) => {
    return (
        <Card
            withBorder
            shadow="xs"
            padding="xs"
            h="100%"
        >
            <Text> {comment.body}</Text>

            <Group justify="space-between" component="section">
                <Badge>
                    {comment.votes}
                </Badge>
                <Text mt="xs" c="dimmed" size="sm">
                    by {comment.author} 
                </Text>
            </Group>
        
            
            
        </Card>
    );
};

export default CommentCard;