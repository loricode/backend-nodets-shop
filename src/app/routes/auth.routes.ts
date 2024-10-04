import { Router, Request, Response } from 'express';
const router = Router();

import { loginPortal, currentUserPortal, loginAdm, createUserPortal } from '../repository/auth.repository';

router.post('/api/auth/loginPortal', async(req: Request, res: Response) => {
   const { email, password } = req.body;
   const data = await loginPortal(email, password);
   res.json(data); 
});

router.post('/api/auth/loginAdm', async(req: Request, res: Response) => {
   const { email, password } = req.body;
   const data = await loginAdm(email, password);
   res.json(data); 
});

router.post('/api/auth/create', async(req: Request, res: Response) => {
   const { email, password, username } = req.body;
   const data = await createUserPortal(email, password, username);
   res.json(data); 
});

router.post('/api/auth/currentUser', async(req: Request, res: Response) => {
   const { token } = req.body;

   if(!token) {
      res.status(401).json({});
   }else{
      const data = await currentUserPortal(token);
      res.json(data); 
   }
});



export default router;