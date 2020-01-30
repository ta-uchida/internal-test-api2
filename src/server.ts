import * as Express from 'express';

require('dotenv').config();
const app = Express();

app.get(
    '/',
    (req: Express.Request, res: Express.Response) => {
        return res.send('Hello world. api2');
    });

app.get(
    '/internal-api',
    (req: Express.Request, res: Express.Response) => {
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
