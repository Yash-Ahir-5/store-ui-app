import { useContext, useEffect, useState } from "react";
import axios from "axios";
import API from "../axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import "./SearchPage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { str } = useContext(UserContext);
  const { filter } = useContext(UserContext);
  const [notFound, setNotFound] = useState(false);

  const token = localStorage.getItem("token");
  console.log(token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API + "/product", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  const fetchSearchProducts = async () => {
    try {
      const response = await axios.post(
        `${API}/product/search`,
        {
          searchStr: str,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        setNotFound(true);
        setProducts(response.data.result);
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 400 || 404 || 500) {
        if (error.response.data.error == "Item not found") {
          setNotFound(false);
        }
        toast.error(error.response.data.error);
      }
    }
  };

  const fetchFilterProducts = async () => {
    try {
      const response = await axios.get(`${API}/filterProduct/${filter}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        // console.log(response.data.result);
        setProducts(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (filter != "") {
      fetchFilterProducts();
    }
    if (str == "") {
      fetchProducts();
      setNotFound(true);
    }

    fetchSearchProducts();
  }, [str, filter]);

  const imageBaseurl = "http://localhost:4000/api/public/";

  return (
    <>
      {token && (
        <div>
          {notFound ? (
            <div className="product-wrapper">
              {products.map((item) => {
                const { id, name, description, price, images } = item;
                const oneImage = JSON.parse(images)[0];
                return (
                  <div className="card" key={id}>
                    <img
                      // src="src\assets\imgPlaceholder.png"
                      src={imageBaseurl + oneImage}
                      className="card-img-top"
                      alt="Product Image"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                      <p className="card-text">{description}</p>
                      <div className="last">
                        <p className="card-text">
                          <b>${price}</b>
                        </p>
                        <button>Buy Now</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>Not Found</h1>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;