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
// import DataSanggahan from "components/admin/DataSanggahan";
import DataKehadiran from "components/admin/DataKehadiran";
import StatusPembayaran from "components/admin/StatusPembayaran";
import Jadwal from "components/admin/Jadwal";
import CardDataPengunjung from "components/admin/Cards/CardDataPengunjung";
import Pemasukan from "components/admin/Pemasukan";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="px-4 md:px-10 mx-auto w-full pt-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/jadwal" exact component={Jadwal} />
            <Route path="/admin/datapengunjung" exact component={CardDataPengunjung} />
            <Route path="/admin/data-pengunjung" exact component={DataPengunjung} />
            {/* <Route path="/admin/data-sanggahan" exact component={DataSanggahan} /> */}
            <Route path="/admin/data-kehadiran" exact component={DataKehadiran} />
            <Route path="/admin/status-pembayaran" exact component={StatusPembayaran} />
            <Route path="/admin/pemasukan" exact component={Pemasukan} />
            <Redirect from="/admin" to="/admin/dashboard" />
            <Redirect from="/superadmin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
