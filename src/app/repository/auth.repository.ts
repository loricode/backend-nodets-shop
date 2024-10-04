import { getConnection } from '../config/connection';
import { createToken, verifyToken } from '../lib/jwt';

type ProcedureResult = any[];

export const loginPortal = async (email:string, password:string) => {

   try {

      const sql = 'CALL sp_auth_user_validate(?)'

      const conn = await getConnection();

      let [results] = await conn.execute<ProcedureResult>(sql, [email]);

      const obj = {
         ...results[0][0],
         token: createToken(results[0][0].email)
      }

      return obj

   } catch (error) {
      
      return { error:error, message:"" }

   }

}


export const loginAdm = async (email:string, password:string) => {

   try {

      const sql = 'CALL sp_auth_user_adm_validate(?)';

      const conn = await getConnection();

      let [results] = await conn.execute<ProcedureResult>(sql, [email]);
      
      const obj = {
         ...results[0][0],
         token: createToken(results[0][0].email)
      }

      return obj

   } catch (error:any) {
      
      return { error:'401', message:error.message }

   }

}

type ProcedureDtoUser = any[];

export const createUserPortal = async (email:string, password:string, username:string) => {

   try {

      const sql = 'CALL sp_auth_user_register(?, ?, ?)';

      const param = [email, password, username];

      const conn = await getConnection();

      const [results] = await conn.execute<ProcedureDtoUser>(sql, param);
      
      const obj = {
         ...results[0][0],
         token: createToken(results[0][0].email)
      }

      return obj


   } catch (error) {
      
      return { error:error, message:"" }

   }

}

export const currentUserPortal = async (token:string) => {

   try {

      const data = verifyToken(token)

      if(!data) return { error:"invalid", message:'token invalido'  } 

      const payload = data as { email:string }

      const sql = 'CALL sp_auth_user_getById(?)';

      const param = [payload.email];

      const conn = await getConnection();

      const [results] = await conn.execute<ProcedureDtoUser>(sql, param);
      
      const obj = {
         ...results[0][0],
         token: createToken(results[0][0].email)
      }

      return obj


   } catch (error) {
      
      return { error:error, message:"" }

   }

}


