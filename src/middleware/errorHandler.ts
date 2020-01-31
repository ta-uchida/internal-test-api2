import * as boom from '@hapi/boom';
import * as Express from 'express';

const errorHandler = (err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  if (res.headersSent) return next(err);
  if (!err.statusCode) err = boom.boomify(err);

  if (err.isServer) {
    // boom通した500番台のエラーはisServerでtrueが返るので
    // 500番台のみsentryみたいなエラー監視saasに送信したりできる
  }
  return err.isBoom
    ? res.status(err.output.statusCode).json(err.output.payload)
    : res.status(err.statusCode).json(err)
}

export default errorHandler
