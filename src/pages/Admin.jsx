import { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = "https://glitzorabackend.onrender.com/api/products";

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}?page=1&limit=100`);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !image) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

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
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>

      {/* FORM */}
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />

          {preview && <img src={preview} className="preview" />}

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>

      <h3>Products</h3>

      {/* GRID */}
      <div className="admin-grid">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((p) => (
            <div className="admin-card" key={p._id}>
              <img
                src={`https://glitzorabackend.onrender.com/uploads/${p.image}`}
                alt={p.name}
              />

              <div className="card-body">
                <h4>{p.name}</h4>
                <p>₹{p.price}</p>

                <button onClick={() => deleteProduct(p._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Admin;