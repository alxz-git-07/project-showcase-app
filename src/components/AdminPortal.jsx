import React from 'react'
import { useState } from 'react'
function AdminPortal({onAddItem}) {
    const[shop,setShop]=useState({
  coffeeName:'',
  description:'',
  origin:'',
  price:''  
})


    function handleSubmit(event){}
        event.preventDefault()
        
      // POST data to json server
     fetch('http://localhost:8000/coffee',{
    method: 'POST',
    headers:{
    'Content-Type':'application/json'
     },
    body: JSON.stringify(shop)
       })
       .then(r=>{if(r.ok){
        return r.json()}else{
        console.error('Server error')
       }})
        .then(newItem=>onAddItem(newItem))
                    // clear the form
       .then(
           setShop({
           coffeeName:'',
           description:'',
           origin:'',
           price:''  

        })
       ) 
     .catch(error=>console.log(error))
  
    
  return (
            <div className='border-violet-800 bg-gray-300 max-w-2xl my-0 mx-auto p-10 rounded-md'>
                <h1>Shop Form</h1>

        <form className='flex flex-col gap-1 ' onSubmit={handleSubmit}>

            <label htmlFor="coffee name">Coffee Name</label>
            <input className="border outline-violet-800 rounded-md p-2 w-full" type="text" value={shop.coffeeName} id='coffee name'onChange={(e)=>setShop({...shop,coffeeName:e.target.value})}required/>
            <label htmlFor="description">Description</label>
            <input className="border outline-violet-800 rounded-md p-2 w-full" 
 type="text" value={shop.description} id='description'onChange={(e)=>setShop({...shop,description:e.target.value})}required/>
            <label htmlFor="origin">Origin</label>
            <input className='border outline-violet-800 rounded-md p-2 w-full ' id='origin' type='text'value={shop.origin}  onChange={(e)=>setShop({...shop,origin:e.target.value})}required/>
            <label htmlFor="price">Price</label>
            <textarea className="border outline-violet-800 rounded-md p-2 w-full" value={shop.price}id='price'onChange={(e)=>setShop({...shop,price:e.target.value})}required/>
            <button className=" border bg-violet-800 rounded-md text-white cursor-pointer m-auto p-3" type='submit'>Submit</button>
        </form>
      
    </div>

  )

}
export default AdminPortal
