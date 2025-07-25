import Header from '../shared/component/layout/admin/Header';
import Sidebar from '../shared/component/layout/admin/Sidebar';
import React from 'react';
import { Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { useEffect } from "react";


const AdminLayout = () => {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link href="/admin/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/admin/css/datepicker3.css" rel="stylesheet" />
        {/*<link href="/admin/css/bootstrap-table.css" rel="stylesheet" />*/}
        <link href="/admin/css/styles.css" rel="stylesheet" />

        {/*<script src="/style/jquery-3.7.1.min.js"></script>
        <script src="/admin/js/bootstrap-table.js"></script>*/}


      </Helmet>
      <Header />
      <Sidebar />
      <Outlet />


    </>
  );
};

export default AdminLayout;
