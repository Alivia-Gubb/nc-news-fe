import { LoadingOverlay } from "@mantine/core";
const Loading = () => {
    return <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: "sm", blur: 1 }} />;
};

export default Loading;