
import { Route, Routes } from "react-router-dom";
import Articles from "./components/articles/Articles";
import { AppShell, createTheme, MantineProvider, Group, Text, Anchor } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { NavLink as Link } from "react-router-dom";
import SingleArticle from "./components/single-article/SingleArticle";
import Error from "./components/Error";
import Topics from "./components/topics/Topics";


// Mantine theme
const theme = createTheme({
    fontFamily: "Montserrat, sans-serif",
    defaultRadius: "md",
    colors: {
        "magenta": [
            "#ffe9f6",
            "#ffd1e6",
            "#faa1c9",
            "#f66eab",
            "#f24391",
            "#f02881",
            "#f01879",
            "#d60867",
            "#c0005c",
            "#a9004f"
        ]
    },
    primaryColor: "magenta"
});

function App() {
    
    return (
        <MantineProvider theme={theme}>
            <Notifications position="top-right" zIndex={1000} />
            <AppShell
                header={{ height: 60 }}
                padding="md"
            >
                <AppShell.Header>
                    <Group justify="space-between" h="100%" px="md">
                        <Text
                            variant="gradient"
                            gradient={{ from: "magenta", to: "yellow" }}
                            size="32px"
                            fw={600}
                        >
                            NC News
                        </Text>
                        <Group h="100%" gap="lg">
                            <Anchor
                                component={ Link }
                                to="/"
                                underline="never"
                            >
                                Home
                            </Anchor>
                            <Anchor
                                component={ Link }
                                to="/topics"
                                underline="never"
                            >
                                Topics
                            </Anchor>
                        </Group>
                    </Group>
                </AppShell.Header>
                <AppShell.Main>
                    <Routes>
                        <Route path='/' element={<Articles />} />

                        <Route path='/article/:article_id' element={<SingleArticle />} />

                        <Route path='/topics' element={<Topics />}>
                            <Route path=':topic_slug' element={<Articles />} />
                        </Route>
                        
                        <Route path='*' element={<Error />} />
                    </Routes>
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}

export default App;
