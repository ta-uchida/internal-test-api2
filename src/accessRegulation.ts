import * as Express from 'express';

interface RegulationRoute {
  route: string;
}

const regulationRouteList: RegulationRoute[] = [
  {
    route: '/internal-api'
  }
];

const isRegulated = (req: Express.Request): boolean => {
  const isRegulationRoute = regulationRouteList.map(r => r.route).some(r => r === req.originalUrl);
  if (!isRegulationRoute) return false;

  const remoteAddress = (process.env.NODE_ENV === 'production')
    ? req.headers['x-forwarded-for']
    : req.connection.remoteAddress;

  // for Server
  if (remoteAddress === process.env.SERVER_IP) return false;
  // for local development
  if (remoteAddress && remoteAddress.includes('127.0.0.1')) return false;
  return true;
};

export default isRegulated;