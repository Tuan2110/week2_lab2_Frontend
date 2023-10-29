import {Link} from 'react-router-dom'
import {ShoppingCart} from 'phosphor-react'
import './navbar.css'

export const Navbar = ({ isLoggedIn, handleLogOut }) => {
  return (
    <div className='navbar'>
        <div className='links'>
            <Link to="/home">Shop</Link>
            <Link to="/cart">
                <ShoppingCart size={32}/>
            </Link>
            {isLoggedIn ? (
              <Link to="/" onClick={handleLogOut}>Logout</Link>
            ) : (
              <Link to="/">Login</Link>
            )}
        </div>
    </div>
  )
}
