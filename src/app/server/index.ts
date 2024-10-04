import express, {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//routes
import routesProduct from '../routes/product.routes';
import routesAuth from '../routes/auth.routes';
import routesSales from '../routes/sales.routes';

//For env File 
dotenv.config();

let app = express();

app.use(cors());
app.use(express.json())

app.set('port', process.env.PORT || 4000 );

app.use(routesProduct);
app.use(routesAuth);
app.use(routesSales);

app.get('/', (req: Request, res: Response) => {
   res.send('Welcome to Express and TypeScript Server');
 });


export default app;