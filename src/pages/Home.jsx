import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { FiShoppingBag } from "react-icons/fi";

function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const phoneNumber = "919995937035";

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `https://glitzorabackend.onrender.com/api/products?page=${page}&limit=6`
      );

      const newProducts = res.data.products;

      if (page === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => {
          const all = [...prev, ...newProducts];
          return [
            ...new Map(all.map((item) => [item._id, item])).values(),
          ];
        });
      }

      setPages(res.data.pages);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div>
      {/* HERO */}
      <div className="hero">
        <h1 className="hero-title">
          <FiShoppingBag className="icon" />
          Glitzora Collection
        </h1>
        <p>New Arrivals | Premium Quality</p>
      </div>

      {/* PRODUCTS */}
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            
            {/* ✅ FIXED IMAGE */}
            <img
              src={p.image?.url || "/no-image.png"}
              alt={p.name}
            />

            <div className="card-body">
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>

              <a
                href={`https://wa.me/${phoneNumber}?text=Hi, I want ${p.name}`}
                target="_blank"
                rel="noreferrer"
              >
                <button>Order Now</button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      {page < pages && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <button onClick={() => setPage(page + 1)}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;