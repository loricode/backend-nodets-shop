import { Router, Request, Response } from 'express';
const router = Router();

import { getProductsSales } from '../repository/sales.repository';

router.get('/api/sales/products', async(req: Request, res: Response) => {
   const data = await getProductsSales();
   res.json(data); 
});


export default router;