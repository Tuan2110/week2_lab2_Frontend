import React, { useContext } from 'react'
import { PRODUCTS } from '../../products'
import { ShopContext } from '../../context/shop-context'
import { CartItems } from './cart-item'
import './cart.css'
import { useNavigate } from 'react-router-dom'


export const Cart = () => {
  const { cartItems, getTotalAmount } = useContext(ShopContext);
  const totalAmount = getTotalAmount();
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div >
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItems data={product} />
          }
        })}
      </div>
      {totalAmount > 0 ? (
        <div className='checkout'>
          <p><b> Subtotal: ${totalAmount}</b></p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={() => navigate("/checkout")}>Checkout</button>
        </div>)
        : (<h1>Your Cart Is Empty</h1>)}
    </div>
  )
}
