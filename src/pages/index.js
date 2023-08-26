"use client"
import Image from 'next/image'

// import { useRef, useState } from 'react'


export default function Page() {

//   const productNameRef=useRef()
//   const [created, setCreated]=useState("")
  return (
   <div className='container'>
    <section>
      <h1>CRUD WITH NEST JS AND MYSQL</h1>
      <div className='heading'>
        <a href='/api/products'>
          Database API data Products
        </a>
      </div>
    </section>
    <section className='read'>
      <div className='read'>
        <h1>Read</h1>
        <div className='products'>Read the products</div>
      </div>
    </section>
    <section className='create'>
      <div className='craete'>
        <h2>create</h2>
        <div className='input'>
          <div className='label'>Product name</div>
          <input type="text" 
        //   ref={productNameRef}
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
      <input type='text' placeholder='product_id' />
      <input type='text' placeholder='product_name' />
      <button>Update</button>
    </section>
    <div className='delete'>
      <h1>Deletting</h1>
      <input type='number' placeholder='product_id' />
      <button>Delete</button>
    </div>
   </div>
  )
}
