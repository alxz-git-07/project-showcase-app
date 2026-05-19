import React, { useState, useEffect } from 'react'

function AdminPortal({ onAddItem, editingItem, onUpdateItem }) {
    const [shop, setShop] = useState({
        coffeeName: '',
        description: '',
        origin: '',
        price: ''  
    })

    // Automatically fill the form fields whenever editingItem changes
    useEffect(() => {
        if (editingItem) {
            setShop(editingItem)
        } else {
            setShop({ coffeeName: '', description: '', origin: '', price: '' })
        }
    }, [editingItem])

    function handleSubmit(event) {
        event.preventDefault()
        
        // Determine URL and Method dynamically based on edit mode
        const url = editingItem ? `http://localhost:8000/coffee/${editingItem.id}` : 'http://localhost:8000/coffee'
        const method = editingItem ? 'PATCH' : 'POST'

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shop)
        })
        .then(r => {
            if (r.ok) {
                return r.json()
            } else {
                throw new Error('Server request failed')
            }
        })
        .then(savedItem => {
            if (savedItem) {
                if (editingItem) {
                    onUpdateItem(savedItem) // Update existing item in UI
                } else {
                    onAddItem(savedItem) // Append brand new item to UI
                }
                // Reset form fields
                setShop({ coffeeName: '', description: '', origin: '', price: '' })
            }
        }) 
        .catch(error => console.error(error))
    }

    return (
        <div className='border border-violet-800 bg-gray-300 max-w-2xl my-6 mx-auto p-10 rounded-md'>
            {/* Dynamic header title based on state context */}
            <h1 className='text-xl font-bold mb-4'>{editingItem ? 'Edit Coffee Item' : 'Shop Form'}</h1>

            <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
                <label htmlFor="coffee name">Coffee Name</label>
                <input className="border outline-violet-800 rounded-md p-2 w-full" type="text" value={shop.coffeeName} id='coffee name' onChange={(e) => setShop({...shop, coffeeName: e.target.value})} required/>
                
                <label htmlFor="description">Description</label>
                <input className="border outline-violet-800 rounded-md p-2 w-full" type="text" value={shop.description} id='description' onChange={(e) => setShop({...shop, description: e.target.value})} required/>
                
                <label htmlFor="origin">Origin</label>
                <input className='border outline-violet-800 rounded-md p-2 w-full' id='origin' type='text' value={shop.origin} onChange={(e) => setShop({...shop, origin: e.target.value})} required/>
                
                <label htmlFor="price">Price</label>
                <input className="border outline-violet-800 rounded-md p-2 w-full" type="text" value={shop.price} id='price' onChange={(e) => setShop({...shop, price: e.target.value})} required/>
                
                <div className='flex gap-4 mt-4'>
                    <button className="border bg-violet-800 rounded-md text-white cursor-pointer px-4 py-2" type='submit'>
                        {editingItem ? 'Save Changes' : 'Submit'}
                    </button>
                    {/* Optional: Add a cancel button if they decide not to finish editing */}
                    {editingItem && (
                        <button className="border bg-gray-500 rounded-md text-white cursor-pointer px-4 py-2" type='button' onClick={() => onUpdateItem(editingItem)}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default AdminPortal
