import React, { Fragment, useState } from "react";
import ReactDom from 'react-dom';
import "./App.css";

function Index() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0)
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);
  const [cuisine, setCuisine] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const allRestaurants = async e => {
      //This function displays all restaurants, in case someone is uncertain of what they want.
    try {
    const response = await fetch(`http://localhost:3000/api/restaurants/`);

      const parseResponse = await response.json();

      setRestaurants(parseResponse);

    } catch (err) {
        console.error(err.message);
    }
};

const searchForm = async e => {
    e.preventDefault()
    try {
        const response = await fetch(`http://localhost:3000/api/restaurants/search/?name=${name}&rating=${rating}&distance=${distance}&price=${price}&cuisine=${cuisine}`);
        
        const parseResponse = await response.json();
        setRestaurants(parseResponse);
        
        //One could set the values to reset here but it's more usesful to keep track of the parameters you input.
    } catch (err) {
        console.error(err.message);
    }
};


return (
    <Fragment>
      <div className="container text-center">
        <h1 className="my-5">What are we eating?</h1>
        <p>
        <button className="btn btn-success" onClick={allRestaurants}>All Restaurants</button>
        </p>
        <form className="d-flex" onSubmit={searchForm}>
        <div className="restaurant">
            <label>Restaurant</label>
            
            <input
             type="text"
             name="name"
             className="form-control"
             value={name}
            onChange={e => setName(e.target.value)}
            />
        </div>


        <div className="cuisine">
            <label>Cuisine</label>

            <input
            type="text"
            name="cuisine"
            className="form-control"
            value={cuisine}
            onChange={e => setCuisine(e.target.value)}
            />

        </div>
        
        <div className="rating">
        
            <label>Rating</label>
            
            <input
            type="text"
            name="rating"
            className="form-control"
            value={rating}
            onChange={e => setRating(e.target.value)}
            />

         </div>
        
         <div className="distance">
         
            <label>Distance </label>
            <input
            type="text"
            name="distance"
            className="form-control"
            value={distance}
            onChange={e => setDistance(e.target.value)}
            />

        </div>


        <div className="price">
            <label>Price</label>
            
            <input
            type="text"
            name="price"
            className="form-control"
            value={price}
            onChange={e => setPrice(e.target.value)}
            />

        </div>

        <button className="btn btn-success">Submit</button>
        
        </form>
        <table className="table my-5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Distance</th>
              <th>Price</th>
              <th>Cuisine</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map(restaurants => (
              <tr key={restaurants.id}>
                <td>{restaurants.name}</td>
                <td>{restaurants.customer_rating}</td>
                <td>{restaurants.distance}</td>
                <td>{restaurants.price}</td>
                <td>{restaurants.cuisine.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {restaurants.length === 0 && <p>No Results Found</p>}
      </div>
    </Fragment>
  );
}


ReactDom.render(<Index />, document.getElementById('root'));