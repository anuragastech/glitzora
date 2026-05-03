import { useState } from "react";
import "./contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = "Customer Feedback";
    const body = `Name: ${form.name}\nMessage: ${form.message}`;

    window.location.href = `mailto:yourmail@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contact-page">

      {/* HERO BANNER */}
      <div className="hero-banner">
        <img
          src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1777807718/895faec9-88a3-41fd-bb0f-e76279cdb9cf_dlohut.png"
          alt="Glitzora"
        />
        <div className="overlay">
          {/* <h1>Contact Glitzora</h1>
          <p>Premium Fashion • Kerala</p> */}
        </div>
      </div>

      {/* CONTACT CARD */}
      <div className="contact-card">

        <p>📍 Calicut, Kerala</p>
        <p>📞 +91 9995937035</p>

        {/* MAP */}
        {/* <iframe
          src="https://www.google.com/maps?q=Calicut&output=embed"
          className="map"
        ></iframe> */}

        {/* WHATSAPP */}
        <a href="https://wa.me/919876543210" target="_blank">
          <button className="wa-btn">Chat on WhatsApp</button>
        </a>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="form">
          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>

      </div>
    </div>
  );
}

export default Contact;