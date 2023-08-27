"use client"
import Image from 'next/image'
import Link from 'next/link'

import { useEffect, useRef, useState } from 'react'


export default  function Page() {

  const productNameRef=useRef()
  const productUpdateRef=useRef()
  const productDelteRef=useRef()
  // const productCreateRef=useRef()
  const [products,setProducts]=useState([])
  console.log(products)
  const [created, setCreated]=useState(false)
  const [update,setUpdate]=useState(false)
  const [deletting,setDeletting]=useState(false)
  const [updateError,setUpdateError]=useState(false)
  const [delettingError,setDelettingError]=useState(false)
  
  async function getProduct(){
    const data={
      method:"GET",
      Headers:{"Content-Type":"aplication/json"}
    }
    const res =await fetch(`/api/products`,data)
    //chenge to json 
    const response=await res.json()
    
    setProducts(response.AllProducts[0])
    console.log(response.AllProducts[0])
  };
  const addProduct=()=>{};
  const uppdateProduct=()=>{};
  const deleteProduct=()=>{};
  
  const oneproduct=products[0]
  useEffect(()=>{
    getProduct()
  },[])
  
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
        {/* {console.log(oneproduct)} */}
         {products.map((product)=>{
           return (
            <div key={product.product_id} style={{backgroundColor:"grey", padding:10, }}>
              <span style={{margin:20}}>id: {product.product_id}</span> 
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
          ref={productNameRef}
          />
        </div>
        {/* {created ? <div className='success'>success<div/> :<div>Null</div>} */}
        <div className='buttonarea'>
          <button>create</button>
        </div>
      </div>
    </section>
    <section className='update'>
      <h1>update</h1>
      <input type='text' placeholder='product_id' ref={productUpdateRef} />
      <input type='text' placeholder='product_name' ref={productUpdateRef} />
      <button>Update</button>
    </section>
    <div className='delete'>
      <h1>Deletting</h1>
      <input type='number' placeholder='product_id' ref={productDelteRef} />
      <button>Delete</button>
    </div>
   </div>
  )
}
