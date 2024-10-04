import mysql, { Connection }  from 'mysql2/promise';

let conn: Connection | null = null; 

export const getConnection = async () => {
   if (!conn) {

      conn = await mysql.createConnection({
         host: 'localhost',
         user: 'root',
         password: 'campillo',
         database: 'shopDB'
       });

   }
   return conn;
}
