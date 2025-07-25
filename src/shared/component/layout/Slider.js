import { Link } from "react-router-dom";
import { getImageSlider } from "../../untils";
import { getSliders } from "../../../services/Api";
import { useEffect, useState } from "react";
import { SLIDER_LIMIT, SLIDER_SORT } from "../../constant/App";
function Slider() {
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    getSliders({
      params: {
        sort: SLIDER_SORT,
        limit: SLIDER_LIMIT,
      },
    })
      .then(({ data }) => setSliders(data.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div id="slide" className="carousel slide" data-ride="carousel">
      {/* Indicators */}
      <ul className="carousel-indicators">
        {sliders?.map((item, index) => (
          <li
            key={index}
            data-target="#slide"
            data-slide-to={`${index}`}
            className={index === 0 ? "active" : ""}
          />
        ))}
      </ul>
      {/* The slideshow */}
      <div className="carousel-inner">
        {sliders?.map((item, index) => (
          <div
            key={index}
            className={index === 0 ? "carousel-item active" : "carousel-item"}
          >
            <img src={getImageSlider(item?.image)} alt="Vietpro Academy" />
          </div>
        ))}
      </div>
      {/* Left and right controls */}
      <a className="carousel-control-prev" href="#slide" data-slide="prev">
        <span className="carousel-control-prev-icon" />
      </a>
      <a className="carousel-control-next" href="#slide" data-slide="next">
        <span className="carousel-control-next-icon" />
      </a>
    </div>
  );
}
export default Slider;
