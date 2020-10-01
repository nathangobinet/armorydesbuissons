const env = process.env.NODE_ENV;

const domain = (env === 'development') ? ('http://localhost:3005') : '';
const apiPath = '/api';

export default {
  cardUrl: 'https://armorydesbuissons.fr', // Only used for card who need static base url
  domain,
  apiPath,
  apiUrl: domain + apiPath,
};
