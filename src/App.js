import React, { useState } from 'react';
import './App.css';
import Items from './Items';
import Cart from './Cart';




function App() {
  //cart state is passed between both Cart and Items to keep track of what the user is considering
  const [cart, setCart] = useState([]);
  
  //for clean use of React Hooks, functional classes are called only on the higher level in order.
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