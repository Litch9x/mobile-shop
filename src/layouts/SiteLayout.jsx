import Header from '../shared/component/layout/Header';
import Menu from '../shared/component/layout/Menu';
import Slider from '../shared/component/layout/Slider';
import Footer from '../shared/component/layout/Footer';
import Sidebar from '../shared/component/layout/Sidebar';
import { Outlet } from "react-router-dom";
import React from 'react';
import { Helmet } from 'react-helmet'; // Import react-helmet

const SiteLayout = () => {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="css/bootstrap.css" id="site-style-1" />
        <link rel="stylesheet" href="fonts/css/all.css" id="site-style-2" />
        <link rel="stylesheet" href="css/home.css" id="site-style-3" />
        <link rel="stylesheet" href="css/product.css" id="site-style-4" />
        <link rel="stylesheet" href="css/cart.css" id="site-style-5" />
        <link rel="stylesheet" href="css/category.css" id="site-style-6" />
        <link rel="stylesheet" href="css/customer.css" id="site-style-7" />
        <link rel="stylesheet" href="css/index.css" id="site-style-8" />
        <link rel="stylesheet" href="css/login.css" id="site-style-9" />
        <link rel="stylesheet" href="css/order_details.css" id="site-style-10" />
        <link rel="stylesheet" href="css/order.css" id="site-style-11" />
        <link rel="stylesheet" href="css/register.css" id="site-style-12" />
        <link rel="stylesheet" href="css/search.css" id="site-style-13" />
        <link rel="stylesheet" href="css/success.css" id="site-style-14" />
        {/* <link href="/css/styles.css" rel="stylesheet" /> */}
      </Helmet>
      <Header />
      <div>
        <div className="container">
          <Menu />
          <div className="row">
            <div id="main" className="col-lg-8 col-md-12 col-sm-12">
              <Slider />
              <Outlet /> {/* Hiển thị route con */}
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default SiteLayout;
