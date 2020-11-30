import React, { useState } from 'react';

//constants to be used later
const LAND_ROVER = 'Land Rover Motors';
const BMW = 'BMW';
const MERCEDES = 'Mercedes-Benz';
const TOYOTA = 'Toyota'
const EV = 'Electric Vehicles'
const SEDAN = 'Sedan'
const SUV = 'Sports Utility Vehicles'
const SPORTS = 'Sports Cars'
const ALL = 'All'
const INC = '(+)Low To High'
const DEC = '(-)High to Low'

export default function Items({ setCart, cart }) {
    //array of cars to simulate information from backend
  const [items] = useState([
    {
        category: SUV,
        brand: LAND_ROVER,
        name: 'Range Rover Sport',
        cost: 499.99,
        image:
        'https://img2.carmax.com/img/vehicles/19059353/1.jpg?width=800',
    },{
        category: SUV,
        brand: LAND_ROVER,
        name: 'Land Rover Discovery Sport',
        cost: 399.99,
        image:
        'https://img2.carmax.com/img/vehicles/19548398/1.jpg?width=800',
    },{
        category: EV,
        brand: BMW,
        name: 'BMW i3',
        cost: 199.99,
        image:
          'https://img2.carmax.com/img/vehicles/19191561/1.jpg?width=800',
      },{
        category: SEDAN,
        brand: BMW,
        name: 'BMW 335i',
        cost: 349.99,
        image:
          'https://img2.carmax.com/img/vehicles/19060279/1.jpg?width=800',
      },{
        category: SEDAN,
        brand: MERCEDES,
        name: 'Mercedes-Benz C-Class',
        cost: 379.99,
        image:
          'https://img2.carmax.com/img/vehicles/19422508/1.jpg?width=800',
      },{
        category: SPORTS,
        brand: MERCEDES,
        name: 'Mercedes-Benz SL',
        cost: 699.99,
        image:
          'https://img2.carmax.com/img/vehicles/19380792/1.jpg?width=800',
      },{
        category: SUV,
        brand: TOYOTA,
        name: 'Toyota 4Runner',
        cost: 239.99,
        image:
          'https://img2.carmax.com/img/vehicles/19482400/1.jpg?width=800',
      },{
        category: SUV,
        brand: LAND_ROVER,
        name: 'Range Rover Velar',
        cost: 499.99,
        image:
          'https://img2.carmax.com/img/vehicles/19684809/1.jpg?width=800',
      },{
        category: SUV,
        brand: TOYOTA,
        name: 'Toyota RAV4',
        cost: 179.99,
        image:
          'https://img2.carmax.com/img/vehicles/19491368/1.jpg?width=800',
      },{
        category: SEDAN,
        brand: BMW,
        name: 'BMW M3',
        cost: 599.99,
        image:
          'https://img2.carmax.com/img/vehicles/19582043/1.jpg?width=800',
      },{
        category: SEDAN,
        brand: MERCEDES,
        name: 'Mercedes-Benz S-Class',
        cost: 599.99,
        image:
          'https://img2.carmax.com/img/vehicles/19388148/1.jpg?width=800',
      },{
        category: SUV,
        brand: BMW,
        name: 'BMW X3',
        cost: 419.99,
        image:
          'https://img2.carmax.com/img/vehicles/18885508/1/385.jpg',
      },
  ]);

  //append the new element to the existing cart
  const addToCart = (car) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => car.name === item.name
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...car,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };
  //default settings to show all cars low to high price initially
  const [category, setCategory] = useState(ALL);
  const [brand, setBrand] = useState(ALL);
  const [sortMethod, setSortMethod] = useState(INC);

  //filters cars in a certain category
  const getCarsInCategory = () => {
    if (category === ALL) {
        return items;
    } else {
        return items.filter((car) => car.category === category);
    }
    
  };
  //filters cars that are a certain brand
  const getCarsInBrand = () => {
    if (brand === ALL) {
        return items;
    } else {
        return items.filter((car) => car.brand === brand);
    }
    
  };
  //gets the intersecting set of cars from preferred attributes and applies sorting method
  const getPreferredCars = () => {
    let d1 = getCarsInBrand();
    let d2 = getCarsInCategory();

    if(d2.length === items.length) {
        return sortCars(getCarsInBrand());
    }
    if (d1.length === items.length) {
        return sortCars(getCarsInCategory());
    }
    
    var temp = d1.filter((x) => {
        return d2.indexOf(x) != -1
      });
    
    return sortCars(temp);
  }
  //listedCars will be a number that is -1 for increasing order and 1 for decreasing
  //helper to sort the cars to be displayed by price.
  const sortCars = (listedCars) => {
    return listedCars.sort((a, b) => {
       var cof = 1;
       let c = a.cost;
       let d = b.cost;
       if (sortMethod === INC) {
            cof = -1;
       }
       if (c > d)
           return -1 * cof;
       if (c < d)
           return cof;
       return 0;
   });
 }

//returns filtered list of components and displays sorting buttons in HTML template
  return (
    <>
      <h1>Go-Dutch Motors</h1>
      <p>Go-Dutch is a website where you can browse cars
           that are not used by their owners for a period of time, and you can 
           lease a variety of secondhand cars while paying a small shipping cost while 
           we switch your car within the same lease period. 
           Respectively, you have your filtering options, a catalog of cars where you can save 
           cars you want into your cart, and a section where you can see what cars are in your cart 
           along with costs/discounts and checkout option. </p>
      
      <div className = "filtering">
      
      <div className = "filteringItem">
      <p>Category:</p>
      <select onChange={(e) => setCategory(e.target.value)} multiple>
        <option value={ALL} selected="selected">{ALL}</option>
        <option value={SEDAN}>{SEDAN}</option>
        <option value={SUV}>{SUV}</option>
        <option value={EV}>{EV}</option>
        <option value={SPORTS}>{SPORTS}</option>
      </select>
      </div>
      <div className = "filteringItem">
      <p>Brand:</p>
      <select onChange={(e) => setBrand(e.target.value)} multiple>
        <option value={ALL} selected="selected">{ALL}</option>
        <option value={BMW}>{BMW}</option>
        <option value={LAND_ROVER}>{LAND_ROVER}</option>
        <option value={TOYOTA}>{TOYOTA}</option>
        <option value={MERCEDES}>{MERCEDES}</option>
      </select>
      </div>
      <div className = "filteringItem">
      <p>Sort By:</p>
      <select onChange={(e) => setSortMethod(e.target.value)}>
        <option value={INC}>{INC}</option>
        <option value={DEC}>{DEC}</option>
      </select>
      </div>
      </div>
      <div className="cars">
        {getPreferredCars().map((car, idx) => (
          <div className="car" key={idx}>
            <h3>{car.name}</h3>
            <h4>{car.category} from {car.brand}</h4>
            <h4>Est. Monthly Cost: <b>${car.cost}</b></h4>
            <img src={car.image} alt={car.name} class="centerIMG"/>
            <button onClick={() => addToCart(car)}>
              +Add {car.name} for one month
            </button>
          </div>
        ))}
      </div>
    </>
  );
}