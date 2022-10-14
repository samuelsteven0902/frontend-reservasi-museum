import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import '../assets/styles/admin/tailwind.css'

// components

import AdminNavbar from "components/admin/Navbars/AdminNavbar.js";
import Sidebar from "components/admin/Sidebar/Sidebar.js";
import HeaderStats from "components/admin/Headers/HeaderStats.js";
import FooterAdmin from "components/admin/Footers/FooterAdmin.js";

// views

import Dashboard from "components/admin/Dashboard.js";
import Maps from "components/admin/Maps.js";
import DataPengunjung from "components/admin/DataPengunjung";
import Jadwal from "components/admin/Jadwal";
import CardDataSanggahan from "components/admin/Cards/CardDataSanggahan";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/jadwal" exact component={Jadwal} />
            <Route path="/admin/datasanggahan" exact component={CardDataSanggahan} />
            <Route path="/admin/data-pengunjung" exact component={DataPengunjung} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
