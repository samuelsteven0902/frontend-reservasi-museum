import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import '../assets/styles/admin/tailwind.css'

// components
import AdminNavbar from "components/kepalauptmuseum/Navbars/AdminNavbar.js";
import Sidebar from "components/kepalauptmuseum/Sidebar/Sidebar.js";
import FooterAdmin from "components/kepalauptmuseum/Footers/FooterAdmin.js";

// views
import Dashboard from "components/kepalauptmuseum/Dashboard.js";
import DataPengunjung from "components/kepalauptmuseum/DataPengunjung";
import GrafikPendapatan from "components/kepalauptmuseum/GrafikPendapatan";
import Pemasukan from "components/superadmin/Pemasukan";

export default function Kepalauptmuseum() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="px-4 md:px-10 mx-auto w-full pt-24">
          <Switch>
            <Route path="/kepalauptmuseum/dashboard" exact component={Dashboard} />
            <Route path="/kepalauptmuseum/grafikpendapatan" exact component={GrafikPendapatan} />
            <Route path="/kepalauptmuseum/data-pengunjung" exact component={DataPengunjung} />
            <Route path="/kepalauptmuseum/pemasukan" exact component={Pemasukan} />
            <Redirect from="/kepalauptmuseum" to="/kepalauptmuseum/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
