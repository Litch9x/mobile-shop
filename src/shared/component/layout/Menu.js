import { Link } from "react-router-dom";
import { getCategories } from "../../../services/Api";
import { React, useEffect, useState } from "react";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then(({ data }) => setCategories(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <nav>
        <div id="menu" className="collapse navbar-collapse">
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="menu-item">
                <Link to={`/Category-${category._id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Menu;
