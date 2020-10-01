const env = process.env.NODE_ENV;

const domain = (env === 'development') ? ('http://localhost:3005') : '';
const apiPath = '/api';

export default {
  domain,
  apiPath,
  apiUrl: domain + apiPath,
};
