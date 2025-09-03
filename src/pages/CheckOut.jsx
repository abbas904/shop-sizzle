import React, { useContext, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import toast, { Toaster } from 'react-hot-toast'

function CheckOut() {
  const navigate = useNavigate()
  const { cart, clearCart } = useContext(CartContext)

  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  })

  const totalItems = useMemo(() => cart.reduce((sum, it) => sum + (it.quantity || 0), 0), [cart])
  const cartTotal = useMemo(() => cart.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0), [cart])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function submitOrder(e) {
    e.preventDefault()

    if (cart.length === 0) {
      toast.error('Cart is empty')
      return
    }
    if (!form.fullName || !form.email || !form.address) {
      toast.error('Please enter your name, email, and address')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        customer: {
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          notes: form.notes,
        },
        itemsCount: totalItems,
        total: cartTotal,
        items: cart.map((it) => ({
          productId: it.id,
          title: it.title,
          price: it.price || 0,
          quantity: it.quantity || 0,
          subtotal: (it.price || 0) * (it.quantity || 0),
          thumbnail: it.thumbnail || '',
        })),
        status: 'pending',
      }

      const baseURL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
      const token = import.meta.env.VITE_STRAPI_TOKEN

      try {
        await axios.post(`${baseURL}/api/orders`, { data: payload }, {
          headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          timeout: 8000
        })
        toast.success('Order created successfully')
      } catch {
        const existing = JSON.parse(localStorage.getItem('orders') || '[]')
        existing.push({ id: Date.now(), ...payload })
        localStorage.setItem('orders', JSON.stringify(existing))
        toast.success('Order created successfully (saved locally)')
      }

      clearCart()
      navigate('/cart')
    } catch (err) {
      console.error(err)
      toast.error('Failed to complete the order, please try again')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-violet-50 py-6 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <form onSubmit={submitOrder} className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-4 sm:p-6 space-y-4">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input 
                name="fullName" 
                value={form.fullName} 
                onChange={handleChange} 
                className="border rounded-lg px-3 py-2 text-sm sm:text-base" 
                placeholder="Full Name" 
              />
              <input 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                className="border rounded-lg px-3 py-2 text-sm sm:text-base" 
                placeholder="Email" 
              />
              <input 
                name="phone" 
                value={form.phone} 
                onChange={handleChange} 
                className="border rounded-lg px-3 py-2 text-sm sm:text-base" 
                placeholder="Phone" 
              />
              <input 
                name="address" 
                value={form.address} 
                onChange={handleChange} 
                className="border rounded-lg px-3 py-2 sm:col-span-2 text-sm sm:text-base" 
                placeholder="Address" 
              />
              <textarea 
                name="notes" 
                value={form.notes} 
                onChange={handleChange} 
                className="border rounded-lg px-3 py-2 sm:col-span-2 text-sm sm:text-base" 
                rows="3" 
                placeholder="Notes (optional)" 
              />
            </div>
            <button 
              type="submit" 
              disabled={submitting} 
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 sm:py-3 rounded-xl font-semibold disabled:opacity-60 text-sm sm:text-base"
            >
              {submitting ? 'Submitting order...' : 'Confirm Order'}
            </button>
            <p className="text-xs text-gray-500">The order will be saved and your cart will be cleared.</p>
          </form>

          <aside className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 h-fit">
            <h3 className="text-base sm:text-lg font-bold mb-4">Order Summary</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm sm:text-base">No items in cart</p>
            ) : (
              <div className="space-y-3">
                {cart.map((it) => (
                  <div key={it.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <img 
                        src={it.thumbnail || ''} 
                        alt={it.title} 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover flex-shrink-0" 
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium truncate max-w-[8rem] sm:max-w-[12rem]">{it.title}</p>
                        <p className="text-xs text-gray-500">x{it.quantity || 0}</p>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">${((it.price || 0) * (it.quantity || 0)).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Total Items</span>
                  <span className="font-medium">{totalItems}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-indigo-600">${cartTotal.toFixed(2)}</span>
                </div>
                <Link to="/cart" className="inline-block text-violet-700 hover:underline text-xs sm:text-sm">Back to Cart</Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  )
}

export default CheckOut
