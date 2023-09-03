"use client"
import Image from 'next/image'
import Link from 'next/link'

import { useEffect, useRef, useState } from 'react'


export default function Page() {

  const productNameRef = useRef()
  const productIdUpdateRef = useRef()
  const productNameUpdateRef = useRef()
  const productDelteRef = useRef()
  // const productCreateRef=useRef()
  const [products, setProducts] = useState([])
  console.log(products)
  const [created, setCreated] = useState(false)
  const [update, setUpdate] = useState(false)
  const [deletting, setDeletting] = useState(false)
  const [updateError, setUpdateError] = useState(false)
  const [delettingError, setDelettingError] = useState(false)

  async function getProduct() {
    const data = {
      method: "GET",
      Headers: { "Content-Type": "aplication/json" }
    }
    const res = await fetch(`http://localhost:3000/api/products`, data)
    //chenge to json 
    const response = await res.json()

    setProducts(response.Newproducts)
    console.log(response.Newproducts)
  };
  async function addProduct() {
    //if you want not to leave an extra space use trim()
    const productName = productNameRef.current.value
    const posData = {
      method: "POST",
      Headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify({ product_name: productName })
    };
    try {
      const res = await fetch(`http://localhost:3000/api/products`, posData)
      const responses = await res.json();
      console.log("response aded", responses)
      if (responses) return;
      setCreated(true)
      const newProduct = responses.response.product;
      setProducts([
        ...products,
        {
          product_i: newProduct.product_id,
          product_name: newProduct.product_name
        }
      ])

    } catch (error) {
      console.log("error on post ", error)
    }
  };
  async function uppdateProduct(){ 
    const updatedProductId=productIdUpdateRef.value
    const updatedProductName=productNameUpdateRef.value
    if(!productIdUpdateRef.length) return;
    const posData = {
      method: "PUT",
      Headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify({
        product_id:updatedProductId,
        product_name:updatedProductName
      })};
      const res= await fetch('http://localhost:3000/api/products',posData)
      const response=res.json()
      if(response) return;
      setUpdate(true)

      const productId=parseFloat(response.response.products.product_id)
      const productUpdatedName=response.response.products.product_name
    
      const productUpdatedState=products.map((product)=>{
        if(product.product_id===productId){
          const productUpdate={
            ...product,
            product_name:productUpdatedName
          }
          return productUpdate
        }
        else{
          return{
            ...product
          }
        }
      })
      setProducts(productUpdatedState)
      
    }
      
      
  async function deleteProduct (id) { 
    if(!id) return 
    const posData = {
      method: "DELETE",
      Headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify({
        product_id:id,
    })};

    const res=await fetch("http://localhost:3000/api/products",posData)
    const response=res.json()
    if(!response) return
    setDeletting(true)

    const deltedId=parseFloat(response.response.product_id)
    const deleteProductState=products.filter((p)=>p.product_id !==deltedId)
    setProducts(deleteProductState)

  };

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div className='container'>
      <section>
        <h1>CRUD WITH NEST JS AND MYSQL</h1>
        <div className='heading'>
          <Link href='/api/products'>
            Database API data Products
          </Link>
        </div>
      </section>
      <section className='read'>
        <div className='read'>
          <h1>Read</h1>
          <div className='products'> list
            {console.log(products)}
            {products.map((product) => {
              return (
                <div key={product.product_id} style={{ backgroundColor: "grey", padding: 10, }}>
                  <span style={{ margin: 20 }}>id: {product.product_id}</span>
                  <span>name: {product.product_name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className='create'>
        <div className='craete'>
          <h2>create</h2>
          <div className='input'>
            <div className='label'>Product name</div>
            <input type="text"
              placeholder='product_name'
              ref={productNameRef}
            />

          </div>

          {created ? <><div>success</div></> : <><div>fail</div></>}
          <div className='buttonarea'>
            <input type='button' value="Create" onClick={addProduct} />
          </div>
        </div>
      </section>
      <section className='update'>
        <h1>update</h1>
        <input type='text' placeholder='product_id' ref={productIdUpdateRef} />
        <input type='text' placeholder='product_name' ref={productNameUpdateRef} />
          {update? <><div>success</div></> : <><div>fail</div></>}
        <button onClick={uppdateProduct}>Update</button>
      </section>
      <div className='delete'>
        <h1>Deletting</h1>
        <input type='number' placeholder='product_id' ref={productDelteRef} />
        <button onClick={()=>deleteProduct(products.product_id)}>Delete</button>
      </div>
    </div>
  )
}
