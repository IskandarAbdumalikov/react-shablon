import { Fragment } from "react";
// import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import { Route, Routes } from "react-router-dom";
import Shopping from "./pages/shopping/Shopping";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";
import Teacher from "./pages/teachers";
import Students from "./pages/students";
import SinglePage from "./pages/singlePage/SinglePage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Fragment>
      {/* <Header logoTitle="Teachers" /> */}
      <Routes>
        <Route path="/" element={<Teacher />} />
        <Route path="teachers/:id" element={<SinglePage />} />
        <Route path="/students" element={<Students />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Fragment>
  );
}

export default App;
