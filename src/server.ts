import * as Express from 'express';
import errorHandler from "./middleware/errorHandler";
import * as Boom from "@hapi/boom";
import isRegulated from "./accessRegulation";

require('dotenv').config();
const app = Express();

app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    if (isRegulated(req)) {
      return next(Boom.notFound());
    }
    next();
});

app.get(
    '/',
    (req: Express.Request, res: Express.Response) => {
        return res.send('Hello world. api2');
    });

app.get(
    '/internal-api',
    (req: Express.Request, res: Express.Response) => {
        console.log(`req.headers: ${JSON.stringify(req.headers)}`);
        return res.json({
            data: { from: 'api2' }
        });
    });

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(
    port,
    () => {
        console.log(`Example app listening on port ${port}!`);
    });

export default app;
