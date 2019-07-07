import useAppContext from './use-app-context';
import { URL_LOGGING } from '../url-constants';

// Hook that exposes a method to notify the logging url, prebound with the given
// logging category.
// let log = useLogging('some-module');
// log({ data: 'to log in server logs' });
export default (origin) => {
    let { notifyServer, getUrl } = useAppContext();

    return (message, level = 'INFO') =>
        notifyServer(getUrl(URL_LOGGING), { origin, message, level });
};
