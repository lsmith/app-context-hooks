import useAppContext from './use-app-context';

export default () => {
    let {
        getFromServer,
        addToServer,
        replaceOnServer,
        updateOnServer,
        deleteFromServer,
        notifyServer,
    } = useAppContext();

    return {
        getFromServer,
        addToServer,
        replaceOnServer,
        updateOnServer,
        deleteFromServer,
        notifyServer,
    };
};
