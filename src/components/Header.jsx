import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="container">
        <h1>
          <Link to="/">Crypto</Link>
        </h1>
        <ul>
          <li>
            <Link to="/coins">coins</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
