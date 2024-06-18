import { Card, Text, Group, Badge, Image } from "@mantine/core";
import { NavLink } from "react-router-dom";

const ArticleCard = ({article}) => {
    return (
        <NavLink
            to={`/article/${article.article_id}`}
        >
            <Card
                withBorder
                shadow="xs"
                padding="md"
                h="100%"
            >

                <Card.Section>
                    <Image
                        src={article.article_img_url}
                        height={160}
                        alt={article.title}
                    />
                </Card.Section>
                <Group mt="md" mb="xs">
                    <Text fw={500} size="lg">{article.title}</Text>
                    <Badge>{article.topic}</Badge>
                </Group>
        
                <Text mt="xs" c="dimmed" size="sm">
                    {article.body}
                    {article.author}
                    
                </Text>
                <Text>
                    {article.votes}
                </Text>
            </Card>
        </NavLink>
    );
};

export default ArticleCard;