import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./Pages/LoginPage";
// import PageNotFound from "./Pages/PageNotFound/PageNotFound";
// import SearchPage from "./Pages/SearchPage/SearchPage";
// import CategoryPage from "./Pages/CategoryPage/CategoryPage";
// import ProductPage from "./Pages/ProductPage/ProductPage";
// import Navbar from "./components/navbar";
import { UserContextProvider } from "./context/UserContext";
import RegitserForm from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import SearchPage from './Pages/SearchPage';

function App() {
  return (
    <>
      <div>
        <UserContextProvider>
          <Toaster position="top-right" />
          <Router>
          <Routes>
            <Route path="/" element={<RegitserForm />} />
            { <Route path="/login" element={<LoginPage />} /> }
            { <Route
              path="/home"
              element={
                <>
                   <SearchPage />
                </>
              }
            />
            /*<Route
              path="/category"
              element={
                <>
                  <Navbar />
                  <CategoryPage />
                </>
              }
            />
            <Route
              path="/products"
              element={
                <>
                  <Navbar /> <ProductPage />
                </>
              }
            />
            <Route path="*" element={<PageNotFound />} /> */} 
          </Routes>
          </Router>
        </UserContextProvider>
      </div>
    </>
  );
}

export default App;
