import env from '../env/container';
import { getUrl } from './urls';
import { URL_LOGGING } from './url-constants';

export default (origin, message, level = 'INFO') =>
    env.beacon(getUrl(URL_LOGGING), { origin, message, level });
