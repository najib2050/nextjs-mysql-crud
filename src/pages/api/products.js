import { query } from "@/lib/db"

export default async function handler(req,res){
    let message;
    
    if(req.method==="GET"){
        const products=await query({
            query:"SELECT * FROM products.product_table",
            values:[],
        })
        res.status(200).json({Newproducts:products})
        console.log(products)
        console.log("product_name",products.product_name)

    }
    if(req.method==="POST"){
        const productName=req.body.product_name;
        const addProduct=await query({
            query:"INSERT INTO products.product_table(product_name) VALUES(?)",
            // values:["abdhj"]
            values:[productName]
        });
        console.log('addproduct',addProduct)
        //use a prop name insertId
        if(addProduct.insertId){
            message="success"
        } else message="error"
        let product={
           product_id:addProduct.insertId,
           product_name:productName,
            
        }
        res.status(200).json({response:{message:message,product:product}})
        console.log(product,"data post")
    };

    if(req.method==="PUT"){
        const updateProductId=req.body.product_id
        const updateProductName=req.body.product_name;
        const updatePrdoducts=await query({
            query:"UPDATE products.product_table SET product_name=? WHERE product_id=? ",
            value:[updateProductId,updateProductName]
        })
        // to now whether it has update use a propert name affectedRows
        const result=updatePrdoducts.affectedRows
        if(result){
            message="success"
        }else message="not success"
        let products={
            product_id:updateProductId,
            product_name:updateProductName
        }
        res.status(200).json({product:products})

        if(method==="DELETE"){
            const prdoductId=req.body.product_id
            const data=await query({
                query:"DELETE FROM produts WHWRE product_id=?",
                value:[prdoductId]
            });
            let product={
                product_id:data.prdoductId
            }
            res.status(200).json({product:product})
        }
    }
}