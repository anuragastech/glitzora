import { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [products, setProducts] = useState([]);

  const API = "http://localhost:5000/api/products";

  const fetchProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data.products || res.data); // works for both cases
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    await axios.post(API, formData);

    setName("");
    setPrice("");
    setImage(null);
    setPreview("");

    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchProducts();
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {preview && <img src={preview} className="preview" />}

        <button type="submit">Add Product</button>
      </form>

      <h3>Products</h3>

      {/* PRODUCT GRID */}
      <div className="admin-grid">
        {products.map((p) => (
          <div className="admin-card" key={p._id}>
            <img
              src={`http://localhost:5000/uploads/${p.image}`}
              alt={p.name}
            />

            <div className="card-body">
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
              <button onClick={() => deleteProduct(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;