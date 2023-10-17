import React, { useState } from "react";

const ProductList = ({ addToCart }) => {
  const products = [
    { id: 1, name: "Product 1", price: 20 },
    { id: 2, name: "Product 2", price: 30 },
    { id: 3, name: "Product 3", price: 40 },
  ];

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Total Quantity: {totalQuantity}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} - Quantity: {item.quantity}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TotalPrice = ({ totalProductPrice }) => {
  return (
    <div>
      <h2>Total Price of All Products</h2>
      <p>${totalProductPrice.toFixed(2)}</p>
    </div>
  );
};

const App01 = () => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productQuantities, setProductQuantities] = useState({});

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Update total quantity, total price, and product quantities
    setTotalQuantity(totalQuantity + 1);
    setTotalPrice(totalPrice + product.price);
    setProductQuantities({
      ...productQuantities,
      [product.id]: (productQuantities[product.id] || 0) + 1,
    });
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    // Update total quantity, total price, and product quantities
    setTotalQuantity(totalQuantity - 1);
    const removedProduct = cart.find((item) => item.id === productId);
    setTotalPrice(totalPrice - removedProduct.price);
    setProductQuantities({
      ...productQuantities,
      [productId]: productQuantities[productId] - 1,
    });
  };

  return (
    <div>
      <h1>E-commerce Cart</h1>
      <ProductList addToCart={addToCart} />
      <Cart cart={cart} removeFromCart={removeFromCart} />
      <TotalPrice totalProductPrice={totalPrice} />
      <p>Total Quantity for All Products: {totalQuantity}</p>
      <p>Individual Product Quantities: {JSON.stringify(productQuantities)}</p>
    </div>
  );
};

export default App01;
