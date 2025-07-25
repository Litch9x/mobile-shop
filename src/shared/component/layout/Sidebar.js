import { getImageSidebar } from "../../untils";
import { useEffect, useState } from "react";
import { getSidebar } from "../../../services/Api";
import { SIDEBAR_SORT, SIDEBAR_LIMIT } from "../../constant/App";

function Sidebar() {
  const [sidebar, setSidebar] = useState([]);
  useEffect(() => {
    getSidebar({
      params: {
        sort: SIDEBAR_SORT,
        limit: SIDEBAR_LIMIT,
      },
    })
      .then(({ data }) => setSidebar(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
      <div id="banner">
        {sidebar?.map((item, index) => (
          <div key={index} className="banner-item">
            <a href="#">
              <img className="img-fluid" src={getImageSidebar(item?.image)} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Sidebar;
