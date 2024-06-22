import { useEffect } from "react";
import { getTopics } from "../api";
import { useState } from "react";
import { Group, ScrollArea, Text } from "@mantine/core";
import Loading from "../Loading";
import TopicCard from "./TopicCard";
import { Outlet } from "react-router-dom";


const Topics = () => {
    const [topics, setTopics] = useState([]);
    

    useEffect(() => {
        getTopics().then((topicsResponse) => {
            setTopics(topicsResponse);
        }); 
    }, []);

    if (topics.length === 0) return <Loading />;
    
    return (
        <>
            <Text size="xl" fw={600}>
                Topics
            </Text>
            <Group w="100%" mb="md">
                <ScrollArea w="100%" type="always">
                    <Group grow wrap="nowrap">
                        {
                            topics.map((topic) => {
                                return (
                                    <TopicCard key={topic.slug}topic={ topic } />
                                );
                            })
                        }
                    </Group>
                </ScrollArea>
            </Group>
            <Outlet />
        </>
    );
};

export default Topics;   