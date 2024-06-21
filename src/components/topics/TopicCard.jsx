import { Card, Text, Group } from "@mantine/core";
import { NavLink } from "react-router-dom";

const TopicCard = ({topic}) => {
    const topicTitle = topic.slug[0].toUpperCase() + topic.slug.slice(1);
    return (
        <Card
            withBorder
            shadow="xs"
            padding="md"
            h="100%"
            miw={300}
            mb="md"
            component={NavLink}
            to={`/topics/${topic.slug}`}
        >
            <Group my="md">
                <Text fw={500} size="lg">{topicTitle}</Text>
            </Group>

            <Group justify="space-between">
                <Text mt="xs" c="dimmed" size="sm">
                    {topic.description} 
                </Text>
            </Group>
        
        </Card>
    );
};

export default TopicCard;