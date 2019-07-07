import useAppContext from './use-app-context';

// Hook that exposes the url collection api from the container
export default () => {
    let {
        getUrl,
        hasUrl,
        setUrl,
        removeUrl,
        setUrls,
        matchUrl,
    } = useAppContext();

    return {
        getUrl,
        hasUrl,
        setUrl,
        removeUrl,
        setUrls,
        matchUrl,
    };
};
