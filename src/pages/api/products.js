import { query } from "@/lib/db"

export default async function handler(req,res){

    if(req.method==="GET"){
        const products=await query({
            query:"SELECT * FROM products.product_table",
            values:[],
        })
        res.status(200).json({AllProducts:products})
        console.log(products)
        // console.log(products[0].product_id)

    }
}