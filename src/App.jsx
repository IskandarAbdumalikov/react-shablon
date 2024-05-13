import { Fragment, useState } from "react";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Shopping from "./pages/shopping/Shopping";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";

function App() {
  return (
    <Fragment>
      <Header logoTitle="LOGO"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
