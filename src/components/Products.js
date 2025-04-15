import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import Cart, { generateCartItemsFrom } from "./Cart";
import ProductCard from "./ProductCard";
import "./Products.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    setIsLoggedIn(false);
    enqueueSnackbar("Logged out successfully", { variant: "success" });
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  const performAPICall = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.endpoint}/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
      return response.data;
    } catch (error) {
      enqueueSnackbar(
        "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
        { variant: "error" }
      );
      return [];
    } finally {
      setLoading(false);
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  const performSearch = async (text) => {
    try {
      if (!text) {
        setFilteredProducts(products);
        setNoResults(false);
        return products;
      }

      const response = await axios.get(
        `${config.endpoint}/products/search?value=${text}`
      );
      setFilteredProducts(response.data);
      setNoResults(false);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setFilteredProducts([]);
        setNoResults(true);
      } else {
        enqueueSnackbar(
          "Could not fetch search results. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
      return [];
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  const debounceSearch = (event, debounceTimeout) => {
    const value = event.target.value;
    setSearchText(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      performSearch(value);
    }, 500);

    setDebounceTimeout(timeout);
  };

  // Fetch cart data
  const fetchCart = async (token) => {
    if (!token) return [];

    try {
      const response = await axios.get(`${config.endpoint}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
      return [];
    }
  };

  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  const isItemInCart = (items, productId) => {
    return items.some((item) => item.productId === productId);
  };

  // TODO: CRIO_TASK_MODULE_CART - Add to cart or update quantity
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    if (!token) {
      enqueueSnackbar("Login to add an item to the cart", { variant: "warning" });
      return;
    }

    if (options.preventDuplicate && isItemInCart(items, productId)) {
      enqueueSnackbar("Item already in cart. Use the cart sidebar to update quantity or remove item.", 
        { variant: "warning" }
      );
      return;
    }

    try {
      const response = await axios.post(
        `${config.endpoint}/cart`,
        { productId, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update cart items state after successful API call
      const cartData = generateCartItemsFrom(response.data, products);
      setCartItems(cartData);
      return response.data;
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not add/update cart. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };


  const handleQuantity = async (productId, qty) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      // Ensure exact data format the test expects
      const response = await axios.post(
        `${config.endpoint}/cart`,
        { productId, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response => ", response)
      
      // Update cart items - make sure items with qty 0 are filtered out
      const cartData = generateCartItemsFrom(response.data, products);
      setCartItems(cartData);
    } catch (e) {
      if (e.response && e.response.data) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not update cart quantity. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };


  // Load products and cart on component mount
  useEffect(() => {
    const onLoadHandler = async () => {
      const productsData = await performAPICall();
      
      const token = localStorage.getItem("token");
      if (token) {
        const cartData = await fetchCart(token);
        if (cartData && productsData) {
          const cartItems = generateCartItemsFrom(cartData, productsData);
          setCartItems(cartItems);
        }
      }
    };
    onLoadHandler();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
          className="search-desktop"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          value={searchText}
          onChange={(e) => debounceSearch(e, debounceTimeout)}
        />
      </Header>

      {/* Search bar for mobile */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        value={searchText}
        onChange={(e) => debounceSearch(e, debounceTimeout)}
      />

    
      {/* Main container for the entire page layout */}
      <Grid container>
        {/* Left section container - will be reduced when cart is visible */}
        <Grid 
          item 
          xs={12} 
          md={isLoggedIn && cartItems.length > 0 ? 9 : 12}
        >
          {/* Hero section */}
          <Box
            className="hero"
            sx={
              isLoggedIn && cartItems.length > 0
                ? {
                    display: "flex",
                    justifyContent: "flex-end", 
                    paddingLeft:"12rem"
                  }
                : {}
            }
          >
            <p className="hero-heading">
              India's <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
              to your door step
            </p>
          </Box>
          
          {/* Display products */}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, pt: 4, pb: 4 }}>
            {loading ? (
              <Box className="center-box">
                <CircularProgress />
                <Typography>Loading Products...</Typography>
              </Box>
            ) : noResults ? (
              <Box className="center-box">
                <SentimentDissatisfied />
                <Typography>No products found</Typography>
              </Box>
            ) : (
              <Grid container spacing={2} className="product-container">
                {filteredProducts.map((product) => (
                  <Grid 
                    item 
                    xs={6} 
                    md={isLoggedIn && cartItems.length > 0 ? 4 : 3} 
                    key={product._id}
                  >
                    <ProductCard
                      product={product}
                      handleAddToCart={() => {
                        const token = localStorage.getItem("token");
                        addToCart(
                          token,
                          cartItems,
                          products,
                          product._id,
                          1,
                          { preventDuplicate: true }
                        );
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Grid>

        {/* TODO: CRIO_TASK_MODULE_CART - Display the Cart component */}
        {isLoggedIn && cartItems.length > 0 && (
          <Grid item xs={12} md={3} sx={{ backgroundColor: "#E9F5E1" }}>
            <Cart
              products={products}
              items={cartItems}
              handleQuantity={handleQuantity}
            />
          </Grid>
        )}
      </Grid>
      <Footer />
    </div>
  );
};

export default Products;