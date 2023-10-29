import React from 'react'
import { PRODUCTS } from '../products'
import { Menu } from './menu'
import './product.css'
import { Link } from 'react-router-dom'

export const Product = () => {
    return (
        <div className="product-container">
            <h1>Management</h1>
            <Menu />
            <br />
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Update Price</th>
                        <th>View Chart Price</th>
                    </tr>
                </thead>
                <tbody>
                    {PRODUCTS.map((product, index) => (
                        <tr key={index}>
                            <td>{product.productName}</td>
                            <td>{product.price}</td>
                            <td><img src={product.productImage} alt="" width={100} /></td>
                            <td>{product.description}</td>
                            <td>
                                <Link to={`/updateprice?id=${product.id}`}>
                                <button className="update-button">Update Price</button>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/chart?id=${product.id}`}>
                                <button className="delete-button">View Price Chart</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
