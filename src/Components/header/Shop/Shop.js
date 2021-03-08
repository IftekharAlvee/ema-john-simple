import React from 'react';
import { useState, useEffect } from 'react';
import fakeData from '../../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../../Cart/Cart';
import Product from '../../Products/Product';
import './Shop.css';
import { Link } from 'react-router-dom';


const Shop = () => {
    
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const  previousCart = productKeys.map(existingKey => {
            const product = fakeData.find( pd => pd.key === existingKey)
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    },[])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        // console.log("product Added", product);
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        products.map(items => <Product
                            key = {items.key}
                            showAddToCart={true}
                            product={items}
                        handleAddProduct={handleAddProduct}
                        ></Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review"><button className="main-button">Review Order</button></Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;