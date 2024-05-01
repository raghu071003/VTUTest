import React, { useState, useEffect } from 'react';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Phone');
  const [selectedCompany, setSelectedCompany] = useState('AMZ');
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000);
    
  useEffect(() => {
    fetchProducts(selectedCategory, selectedCompany);
  }, [selectedCategory, selectedCompany, minPrice, maxPrice]);

  const fetchProducts = async (category, company) => {
    const apiUrl = `/test/companies/${company}/categories/${category}/products?top=10&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE0NTQ4NDQ1LCJpYXQiOjE3MTQ1NDgxNDUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYxODQ2OWViLWZkZTktNDVlYS1hYzgzLThlNjNmZmM0NzlhYiIsInN1YiI6InZ0dTIwMjg0QHZlbHRlY2guZWR1LmluIn0sImNvbXBhbnlOYW1lIjoidnR1U3R1ZGVudCIsImNsaWVudElEIjoiNjE4NDY5ZWItZmRlOS00NWVhLWFjODMtOGU2M2ZmYzQ3OWFiIiwiY2xpZW50U2VjcmV0IjoicEhZT0hybUtZeVRqZlBLRSIsIm93bmVyTmFtZSI6IlNhaSBSYWdodSBWYW1zaGkgS29uZXRpIiwib3duZXJFbWFpbCI6InZ0dTIwMjg0QHZlbHRlY2guZWR1LmluIiwicm9sbE5vIjoiMjAyODQifQ.vLm7agwpxfB22Zrq4-bH-fDDjZ9KIonIBk-spdCVVNM', // Replace with your authorization token
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
    setProducts(data);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCompanyChange = (company) => {
    setSelectedCompany(company);
  };

  return (
    <div>
      <h1>All Products</h1>
      <label htmlFor="categorySelect">Select Category:</label>
      <select id="categorySelect" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
        {[
          "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", 
          "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", 
          "Speaker", "Headset", "Laptop", "PC"
        ].map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <label htmlFor="companySelect">Select Company:</label>
      <select id="companySelect" value={selectedCompany} onChange={(e) => handleCompanyChange(e.target.value)}>
        {["AMZ", "FLP", "SNP", "MYN", "AZO"].map(company => (
          <option key={company} value={company}>{company}</option>
        ))}
      </select>
      <label htmlFor="minPrice">Min Price:</label>
      <input id="minPrice" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      <label htmlFor="maxPrice">Max Price:</label>
      <input id="maxPrice" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

      <div>
        {products.map(product => (
          <div key={product.id}>
            <img src="https://via.placeholder.com/150" alt="product" />
            <div>
              <h3>{product.name}</h3>
              <p>Company: {product.company}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Discount: {product.discount}%</p>
              <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
              <button>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
