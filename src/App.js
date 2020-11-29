import React, { useState } from 'react';
import './App.css';
import Items from './Items';
import Cart from './Cart';




function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <header>
      </header>
      <div> <Items cart={cart} setCart={setCart}></Items></div>
      
      <div><Cart cart={cart} setCart={setCart} /></div>
      </div>
  );
}

export default App;