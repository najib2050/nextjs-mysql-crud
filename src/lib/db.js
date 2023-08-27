
import mysql from 'mysql2/promise'
export async function query({query,values=[0]}){
    
    const databaseConnection= await mysql.createConnection({
        host:process.env.MYSQL_HOST,
        database:process.env.MYSQL_DATABASE,
        user:process.env.MYSQL_USER,
        password:process.env.MYSQL_PASSSWORD
    })
    try {
        const resutl=await databaseConnection.execute(query,values)
        databaseConnection.end()
        return resutl
    } catch (error) {
        console.log("errror",error)
    }

}