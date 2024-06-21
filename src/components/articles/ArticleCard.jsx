import { Card, Text, Group, Badge, Image } from "@mantine/core";
import { NavLink } from "react-router-dom";

const ArticleCard = ({article}) => {
    return (
        <Card
            withBorder
            shadow="xs"
            padding="md"
            h="100%"
            component={NavLink}
            to={`/article/${article.article_id}`}
        >

            <Card.Section>
                <Image
                    src={article.article_img_url}
                    height={160}
                    alt={article.title}
                />
            </Card.Section>
            <Group mt="md">
                <Text fw={500} size="lg">{article.title}</Text>
                <Badge>{article.topic}</Badge>
            </Group>

            <Group justify="space-between">
                <Text mt="xs" c="dimmed" size="sm">
                    by {article.author} 
                </Text>
                <Text>
                    {article.votes}
                </Text>
            </Group>
        
            
            
        </Card>
    );
};

export default ArticleCard;