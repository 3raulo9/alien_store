import { Link } from "react-router-dom";
import "../assets/css/Sidebar.css"; // Reference to the new CSS for sidebar
import TranslatorButton from '../components/TranslatorButton'

const Sidebar = () => {
  const lordIconStyle = {
    width: "60px",
    height: "60px",

    // additional properties specific to lord-icon can go here
  };
  

  return (
    <div className="sidebar">
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <Link
        to="/"
        className="brand-logo" // Remove the "button" class
        style={{
          marginLeft: "7x",
          color: "#21d07a",
          textShadow:
            "0 0 0.75px rgba(0, 255, 0, 0.7), 0 0 1.5px rgba(0, 255, 0, 0.5), 0 0 2.25px rgba(0, 255, 0, 0.3)",
          fontSize: "24px", // Adjust the font size as needed
        }}
      >
        <span className="arshop-button" style={{ fontSize: "24px" }}>
          <i>Nebuja</i>
        </span>{" "}
        {/* Apply the "arshop-button" class */}
      </Link>
      <ul className="nav-links">
        <li>
          {/* Use Link for navigation to cart */}
          <Link to="/cart">
            <lord-icon
              style={lordIconStyle}
              src="https://cdn.lordicon.com/odavpkmb.json"
              stroke="bold"
              trigger="hover"
              colors="primary:#ffffff,secondary:#21d07a"
            ></lord-icon>
            <br />
            <i>CART</i>
          </Link>
        </li>
        <Link to="/login">
          <lord-icon
            style={lordIconStyle}
            src="https://cdn.lordicon.com/uecgmesg.json"
            trigger="hover"
            stroke="bold"
            state="hover-squeeze"
            colors="primary:#ffffff,secondary:#21d07a"
          ></lord-icon>
          <br />
          <i>LOGIN</i>
        </Link>
        <Link to="/register" >
          <lord-icon
            style={lordIconStyle}
            src="https://cdn.lordicon.com/wzwygmng.json"
            stroke="bold"
            trigger="hover"

            colors="primary:#ffffff,secondary:#21d07a"
          ></lord-icon>
          <br />
          <i>REGISTER</i>
        </Link>
        <TranslatorButton />


      </ul>

      <div className="promo-message">
        FOR A LIMITED TIME, ALL ORDERS WILL ENJOY FREE SHIPPING TO PROXIMA
        CENTAURI. SHOP NOW
      </div>
    </div>
  );
};

export default Sidebar;
