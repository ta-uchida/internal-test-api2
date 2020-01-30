import * as Express from 'express';

require('dotenv').config();
const app = Express();

app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    console.log(`req.connection.remoteAddress: ${req.connection.remoteAddress}`);
    console.log(`req.headers['x-forwarded-for']: ${req.headers['x-forwarded-for']}`);
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

const port = process.env.PORT || 3000;
app.listen(
    port,
    () => {
        console.log(`Example app listening on port ${port}!`);
    });

export default app;
