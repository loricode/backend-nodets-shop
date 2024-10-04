import { Router, Request, Response } from 'express';
const router = Router();

import { getProducts, getProduct } from '../repository/product.respository';

router.post('/api/products', async(req: Request, res: Response) => {
   const { offset, limit } = req.body;
   const data = await getProducts(offset, limit);
   res.json(data); 
});

router.post('/api/product', async(req: Request, res: Response) => {
   const { id } = req.body;
   const data = await getProduct(id);
   res.json(data); 
});

router.post('/api/sales/products', async(req: Request, res: Response) => {
   const { id } = req.body;
   const data = await getProduct(id);
   res.json(data); 
});


export default router;