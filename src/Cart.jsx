import React from 'react';

export default function Cart({ cart, setCart }) {
  const getTotalSum =()=>{
    return cart.reduce(
      (sum, { cost, quantity }) => sum + cost * quantity,
      0
    );
  };

  const totalMonthlyCost =()=>{
    return cart.reduce(
        (sum, { cost, quantity }) => ((((sum + cost * quantity)
        *(0.95**quantity))+(quantity*100))/quantity),0);
  }

  const discount =()=>{
    return cart.reduce(
        (sum, { cost, quantity }) => (getTotalSum()-
        getTotalSum()*(0.95**quantity)),0);
  }

  const clearCart = () => {
    setCart([]);
  };

  const setQuantity = (car, amount) => {
    const newCart = [...cart];
    newCart.find(
      (item) => item.name === car.name
    ).quantity = amount;
    setCart(newCart);
  };

  const removeFromCart = (carToRemove) => {
    setCart(
      cart.filter((car) => car !== carToRemove)
    );
  };

  const submitCart = () => {
    var confirmation = window.open("", "Congratulations", "width=30%,height=30%");
    confirmation.document.write("<p>Congratulations, you picked some nice rides. We will be in contact shortly about a possible timeline for the given cars.</p>");
    
  }

  return (
    <>
      <h1>Cart</h1>
      {cart.length > 0 && (
        <button onClick={clearCart}>Clear Cart</button>
      )}
      <div className="carsCart">
        {cart.map((car, idx) => (
          <div className="carCart" key={idx}>
            <h3>{car.name}</h3>
            <h4>${car.cost}</h4>
            <input
              value={car.quantity}
              onChange={(e) =>
                setQuantity(
                  car,
                  parseInt(e.target.value)
                )
              }
            />
            <img src={car.image} alt={car.name} />
            <button onClick={() => removeFromCart(car)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="checkout_amounts">
      <table>
  <tr>
    <td><div>Total Estimated Cost : ${getTotalSum().toFixed(2)}</div></td>
  </tr>
  <tr>
    <td><div>Estimated Discount : ${discount().toFixed(2)}</div></td>
  </tr>
  <tr>
    <td><div>Monthly Cost(Discount and Service Fees Included): ${totalMonthlyCost().toFixed(2)}</div></td>
  </tr>
  <tr>
    <td>
      <button onClick={() => submitCart()}>
              Checkout
            </button>
    </td>
  </tr>
</table>
</div>  
      
      
    </>
  );
}