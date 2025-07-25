import Header from '../shared/component/layout/admin/Header';
import Sidebar from '../shared/component/layout/admin/Sidebar';
import React from 'react';
import { Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet'; // Import react-helmet


const AdminLogin = () => {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link href="/admin/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/admin/css/datepicker3.css" rel="stylesheet" />
        <link href="/admin/css/bootstrap-table.css" rel="stylesheet" />
        <link href="/admin/css/styles.css" rel="stylesheet" />
      
      </Helmet>
      <Outlet />


    </>
  );
};

export default AdminLogin;
