import { env } from '../../config/env';
import { httpYahubApi } from './httpYahubApi';
import { mockYahubApi } from './mockClient';

export const yahubApi = env.dataSource === 'api' ? httpYahubApi : mockYahubApi;
