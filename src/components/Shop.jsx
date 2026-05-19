import React from 'react'
import {useState,useEffect} from'react'
import AdminPortal from './AdminPortal'
import { Pencil, Trash } from 'lucide-react'

function Shop() {    
const[select,setSelect]=useState('All')
const[items,setItems]=useState([])
const [editingItem, setEditingItem] = useState(null)

// Add useEffect hook
useEffect(() => {
    fetch('http://localhost:8000/coffee')
        .then(r => {
            if (r.ok) {
                return r.json()
            } else {
                throw new Error('Fetch request failed') // Use throw to skip the next .then()
            }
        })
        .then(data => {
            if (data) setItems(data) // Only set state if data is valid
        })
        .catch(error => console.error(error))
}, [])


function handleAddItem(newItem){
    setItems([...items,newItem])
}

function handleEdit(id){
    console.log("item has been edited")
        const itemToEdit = items.find(item => item.id === id)
    setEditingItem(itemToEdit)

}
function handleDelete(id){
    console.log("item has been deleted")
    fetch(`http://localhost:8000/coffee/${id}`, {
        method: "DELETE"
    }) // Removed the closing } from here
    .then(r => {
        if(r.ok){
            setItems(items.filter(i => i.id !== id))
        } else {
            console.error('Server error')
        }
    })
} 
function handleUpdateItem(updatedItem) {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item))
    setEditingItem(null) // Close out of edit mode
}

  return (
    <>
        {/* Fixed: Added a responsive grid so cards don't stack in a single column */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {items.map((item) => (
                // Fixed: Added the critical unique key prop here
                <div key={item.id} className='flex flex-col justify-between p-4 border border-gray-300 rounded-lg relative w-80 min-h-[200px]'>
                    
                    <div>
                        <h2 className='text-blue-500 font-semibold text-xl'>{item.coffeeName}</h2>
                        <p className='font-bold text-2xl mt-1'>{item.description}</p>
                        <p className='text-gray-600 text-lg mt-1'>{item.origin}</p>
                    </div>

                    {/* Fixed: Moved layout structure into a clean bottom rows flex block to prevent overlap */}
                    <div className='flex justify-between items-center mt-4 pt-2 border-t border-gray-100'>
                        <div className='flex gap-2'>
                            <button
                                type='button'
                                className='p-2 hover:bg-gray-200 rounded-full transition-colors'
                                onClick={() => handleEdit(item.id)}
                            >
                                <Pencil size={20}/>
                            </button>
                            <button
                                type='button'
                                className='p-2 hover:bg-red-100 text-red-600 rounded-full transition-colors'
                                onClick={() => handleDelete(item.id)}
                            >
                                <Trash size={20}/>
                            </button>
                        </div>
                        <p className='font-bold text-xl text-green-700'>{item.price}</p>
                    </div>

                </div>
            ))}
        </div>

        <AdminPortal onAddItem={handleAddItem} editingItem={editingItem} onUpdateItem={handleUpdateItem} />
    </>
  )
}

export default Shop
