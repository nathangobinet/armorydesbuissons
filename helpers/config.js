const env = process.env.NODE_ENV;

const domain = (env === 'development') ? ('http://localhost:3005') : '';
const apiPath = '/api';

export default {
  cardUrl: 'https://armorydesbuissons.fr', // Only used for card who need static base url
  domain,
  apiPath,
  paypalId: (env === 'development')
    ? 'AVjsijz7YM8XK9sHmrETzj-smASi3dbjAMN0S7IzMAL7UiSPYfD41bXRbpfacjd_Z3DA_jFtj6tOMpe0'
    : 'AaCjFrOU1fQIpruC6FqlPnMWNkAqjBom6opmtcQlE8wGA9rMa8O7-SVEqTzmhWgK2xf0YPCEMgaMLAyQ',
  includeCredentials: (env === 'development')
    ? 'include'
    : 'same-origin',
  apiUrl: domain + apiPath,
};
