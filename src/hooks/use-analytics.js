import useAppContext from './use-app-context';
import { URL_ANALYTICS } from '../url-constants';

// Hook that exposes a method to notify the analytics url, prebound with the given
// category.
// Example:
// let track = useAnalytics(CATEGORY_TODOS);
// track(ACTION_ADD);
export default (category) => {
    let { notifyServer, getUrl } = useAppContext();
    
    return (action, data) =>
        notifyServer(getUrl(URL_ANALYTICS), { category, action, ...data });
};
