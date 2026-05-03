import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const phoneNumber = "919995937035";

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    const res = await axios.get(
      `https://glitzorabackend.onrender.com/api/products?page=${page}&limit=6`
    );

    const newProducts = res.data.products;

    if (page === 1) {
      // first load → replace
      setProducts(newProducts);
    } else {
      // next pages → append + remove duplicates
      setProducts((prev) => {
        const all = [...prev, ...newProducts];
        return [
          ...new Map(all.map((item) => [item._id, item])).values(),
        ];
      });
    }

    setPages(res.data.pages);
  };

  return (
    <div>
      {/* HERO */}
      <div className="hero">
        <h1>✨ Trendy Dress Collection 👗</h1>
        <p>New Arrivals | Premium Quality</p>
      </div>

      {/* PRODUCTS */}
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <img
              src={`http://localhost:5000/uploads/${p.image}`}
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

      {/* FLOATING WHATSAPP */}
      {/* <a
        href={`https://wa.me/${phoneNumber}`}
        className="whatsapp"
        target="_blank"
        rel="noreferrer"
      >
        💬
      </a> */}
    </div>
  );
}

export default Home;