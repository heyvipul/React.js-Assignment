import React, { useEffect, useState } from 'react'
import axios from "axios"
import "../App.css"
import { MDBBtn } from 'mdb-react-ui-kit';


const Home = () => {

  const[data,setData] = useState([])
  const[loading,setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState(''); 
  const [cart, setCart] = useState([]);

  async function getProducts(){
    try {
      const response = await axios.get("https://dummyjson.com/products")
      const data = response.data.products
      console.log(data);
      setData(data)
      setLoading(false)
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getProducts()
  },[])

  useEffect(() => {
    // Filter products based on search term
    const filteredResults = data.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedResults = filteredResults.sort((a, b) => {
      if (sortOption === 'ascending') {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortOption === 'descending') {
        return parseFloat(b.price) - parseFloat(a.price);
      } else {
        return 0;
      }
    });

    setFilteredData(sortedResults);
  }, [data,searchTerm,sortOption]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };


  if(loading){
    return <h2 className='m-2'>Loading...</h2>
  }

  return (
    <div>
    <div id='functionality'>
      <div>
      <label htmlFor="">Search :</label>
      <input type='text' placeholder='Search by product name'
             onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

        <div>
          <label>Sort By Price:</label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value=''>Select</option>
            <option value='ascending'>Ascending</option>
            <option value='descending'>Descending</option>
          </select>
        </div>

        <div>
          <p>Cart Count: {cart.length}</p>
          <p>
            Total Amount:{' '} ${cart.reduce((total, product) => total + parseFloat(product.price), 0)}
          </p>
      </div>
      
    </div>

    <div id='products'>
          {
            filteredData?.map(function(ele,index){
              return <div id='template'  key={index}>
                <img src={ele.thumbnail} alt="" width="90%" height="300px" />
                {/* <p>desc : {ele.description}</p> */}
                <h4>Product : {ele.title}</h4>
                <br />
                  <div id='discount'>
                    <h5>Price : {ele.price}$</h5>
                    <h5>Dicount : {ele.discountPercentage}% Off</h5>
                  </div>
                  <MDBBtn onClick={() => handleAddToCart(ele)} className="m-4">Add to Cart!</MDBBtn>
              </div>
            })
          }
        </div>
    </div>
  )
}

export default Home