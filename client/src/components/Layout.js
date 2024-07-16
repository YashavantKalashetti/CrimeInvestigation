import { Outlet } from "react-router-dom";

import React from 'react'
import NavBar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <main>
      <NavBar />
      <Outlet/>
      <Footer />
    </main>
  )
}

export default Layout
