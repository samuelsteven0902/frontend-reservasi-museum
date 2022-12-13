import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import '../assets/styles/admin/tailwind.css'

// components
import AdminNavbar from "components/superadmin/Navbars/AdminNavbar.js";
import SidebarSuperadmin from "components/superadmin/SidebarSuperadmin/SidebarSuperadmin.js";
import HeaderStats from "components/superadmin/Headers/HeaderStats.js";
import FooterAdmin from "components/superadmin/Footers/FooterAdmin.js";

// views
import Dashboard from "components/superadmin/Dashboard.js";
import Maps from "components/superadmin/Maps.js";
import MasterTiket from "components/superadmin/MasterTiket";
import Admin from "components/superadmin/Admin.js";
import Pemasukan from "components/superadmin/Pemasukan";
import Panduan from "components/superadmin/Panduan.js";
import FAQ from "components/superadmin/FAQ.js";
import About from "components/superadmin/About.js";
import 'tw-elements';
import CardTambahMuseum from "components/superadmin/Cards/CardTambahMuseum";

export default function SuperAdmin() {
  return (
    <>
      <SidebarSuperadmin />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar /> 
        {/* Header */}
        {/* <HeaderStats />  */}
        <div className="px-4 md:px-10 mx-auto w-full pt-24">
          <Switch>
            <Route path="/superadmin/dashboard" exact component={Dashboard} />
            <Route path="/superadmin/maps" exact component={Maps} />
            <Route path="/superadmin/master-tiket" exact component={MasterTiket} />
            <Route path="/superadmin/tambah-museum" exact component={CardTambahMuseum} />
            <Route path="/superadmin/admin" exact component={Admin} />
            <Route path="/superadmin/pemasukan" exact component={Pemasukan} />
            <Route path="/superadmin/panduan" exact component={Panduan} />
            <Route path="/superadmin/faq" exact component={FAQ} />
            <Route path="/superadmin/about" exact component={About} />
            <Redirect from="/superadmin" to="/superadmin/dashboard" />
            <Redirect from="/admin" to="/superadmin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
