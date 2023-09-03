
import mysql from 'mysql2/promise'
export async function query({query,values=[]}){
    
    const databaseConnection= await mysql.createConnection({
        host:process.env.MYSQL_HOST,
        database:process.env.MYSQL_DATABASE,
        user:process.env.MYSQL_USER,
        password:process.env.MYSQL_PASSSWORD,
    })
    try {
        const resutl=await databaseConnection.execute(query,values)
        databaseConnection.end()
        console.log(resutl)
        return resutl[0]
    } catch (error) {
        console.log("errror",error)
    }

}