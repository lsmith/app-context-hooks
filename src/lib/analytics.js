import env from '../env/container';
import { getUrl } from './urls';
import { URL_ANALYTICS } from './url-constants';

export default (category, action, data) =>
    env.beacon(getUrl(URL_ANALYTICS), { category, action, ...data });
