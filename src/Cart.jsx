import React from 'react';

export default function Cart({ cart, setCart }) {

//function to determine costs from just leasing some cars
  const getTotalSum =()=>{
    return cart.reduce(
      (sum, { cost, quantity }) => sum + cost * quantity,
      0
    );
  };

  //estimated monthly costs including external costs and discounts and finds per month amount
  const totalMonthlyCost =()=>{
    return cart.reduce(
        (sum, { cost, quantity }) => ((((sum + cost * quantity)
        *(0.95**quantity))+(quantity*100))/quantity),0);
  }

  //calculates total discount
  const discount =()=>{
    return cart.reduce(
        (sum, { cost, quantity }) => (getTotalSum()-
        getTotalSum()*(0.95**quantity)),0);
  }

  //resets cart
  const clearCart = () => {
    setCart([]);
  };

  //changes quantity of a car in cart, takes in car element and quantity(int) as parameters
  const setQuantity = (car, amount) => {
    const updateCart = [...cart];
    updateCart.find(
      (item) => item.name === car.name
    ).quantity = amount;
    setCart(updateCart);
  };
  //filters out given car to remove, takes in a car element
  const removeFromCart = (carToRemove) => {
    setCart(
      cart.filter((car) => car !== carToRemove)
    );
  };

  //pops up a new window confirming checkout
  const submitCart = () => {
    var confirmation = window.open("", "Congratulations", "width=30%,height=30%");
    confirmation.document.write("<p>Congratulations, you picked some nice rides. We will be in contact shortly about a possible timeline for the given cars.</p>");
    
  }
  //returns items in cart and checkout costs with HTML template
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
              - Remove
            </button>
          </div>
        ))}
      </div>
      <div className="checkout_amounts">
      <table>
          <tr> <td>The first cost you see is your total cost over the desired lease period excluding external costs. 
              We make you a discount offer of 5% and show your total savings.
               Your final monthly estimate includes both discounts and shipping/cleaning costs. 
               Feel free to go up and edit in your cart which cars you want and for how long you want to drive them for. 
               \These costs are estimates and are subject to change after checkout.</td></tr>
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
        ✅Checkout
            </button>
    </td>
  </tr>
</table>
</div>  
      
      
    </>
  );
}