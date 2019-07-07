import useAppContext from './use-app-context';

export default () => {
    let {
        getFromStorage,
        putInStorage,
        removeFromStorage,
        clearStorage,
    } = useAppContext();

    return {
        getFromStorage,
        putInStorage,
        removeFromStorage,
        clearStorage,
    };
};
