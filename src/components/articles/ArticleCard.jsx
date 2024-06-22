import { Card, Text, Group, Badge, Image, Button, Stack } from "@mantine/core";
import { IconMessageDots, IconThumbUp } from "@tabler/icons-react";
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

            <Card.Section mb="md">
                <Image
                    src={article.article_img_url}
                    height={160}
                    alt={article.title}
                />
            </Card.Section>
            <Stack gap="xs">
                <Badge component="span">{article.topic}</Badge>
                <Text fw={500} size="lg" component="span">{article.title}</Text>
            </Stack>
                
            <Text c="dimmed" size="sm">
                    by {article.author} on {new Date(article.created_at).toDateString()} 
            </Text>

            <Group gap="xs" h="100%" justify="flex-end" align="flex-end">
                <Button
                    rightSection={ <IconMessageDots /> }
                    component="span"
                    variant="transparent"
                    size="compact-sm"
                >
                    {article.comment_count}
                </Button>
                <Button
                    rightSection={ <IconThumbUp /> }
                    component="span"
                    variant="transparent"
                    size="compact-sm"
                >
                    {article.votes}
                </Button>
            </Group>
        </Card>
    );
};

export default ArticleCard;