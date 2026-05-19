import React from 'react'
import {useState,useEfect} from'react'
import AdminPortal from './AdminPortal'
function Shop() {    
const[select,setSelect]=useState('All')
const[item,setItem]=useState([])

// Add useEffect hook
useEfect(()=>{fetch('http://localhost:8000/coffee')
    .then(r=>{if(r.ok){
        return r.json()
    }else{
        console.log('fetch request failed')
    }})
    .then(items=>setItem(items))
    .catch(error=>console.log(error))
},[])

function handleAddItem(newItem){
    setItem([...items,newItem])
}
  return (
    <div>
        <AdminPortal onAddItem={handleAddItem}/>
    </div>
  )
}

export default Shop
