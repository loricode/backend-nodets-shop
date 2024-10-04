import { getConnection } from '../config/connection';

type ProcedureResult = any[];

export const getProductsSales = async () => {

   try {

      const sql = 'CALL sp_sales_products()'

      const conn = await getConnection();

      let [results] = await conn.execute<ProcedureResult>(sql);
            
      return results[0];

   } catch (error) {
      
      return { error:error, message:"" }

   }

}