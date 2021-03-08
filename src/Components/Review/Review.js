import React from 'react';
import { useEffect,useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../reviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart,setCart] = useState([]);
    useEffect(() => {
        // Cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    } , []);

    
    
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
            setCart([]);
            setOrderPlaced(true);
            processOrder();
    };

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>;
    }
    const removeProduct = (productKey) => {
        // console.log(productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        product={pd} key={pd.key}
                        removeProduct = {removeProduct}
                        ></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;