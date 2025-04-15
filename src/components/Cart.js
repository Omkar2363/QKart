// import {
//   AddOutlined,
//   RemoveOutlined,
//   ShoppingCart,
//   ShoppingCartOutlined,
// } from "@mui/icons-material";
// import { Button, IconButton, Stack } from "@mui/material";
// import { Box } from "@mui/system";
// import React from "react";
// import { useHistory } from "react-router-dom";
// import "./Cart.css";

// /**
//  * Returns the complete data on the products in the cart
//  * @param { Array } cartData Array of objects with productId and qty
//  * @param { Array } productsData Array of objects with complete data on all available products
//  * @returns { Array } Array of objects with complete data on products in cart
//  */
// export const generateCartItemsFrom = (cartData, productsData) => {
//   if (!cartData || !productsData) return [];

//   return cartData.map((cartItem) => {
//     const product = productsData.find((p) => p._id === cartItem.productId);
//     return {
//       ...product,
//       qty: cartItem.qty,
//       productId: cartItem.productId,
//     };
//   });
// };

// /**
//  * Get the total value of all products added to the cart
//  * @param { Array } items Array of objects with complete data on products added to the cart
//  * @returns { Number } Total value of all items in the cart
//  */
// export const getTotalCartValue = (items = []) => {
//   return items.reduce((total, item) => total + item.cost * item.qty, 0);
// };

// /**
//  * Component to display the quantity of a product and increment/decrement buttons
//  * 
//  * @param {Object} props 
//  * @param {Number} props.value - Current quantity of the item
//  * @param {Function} props.handleAdd - Callback to increase quantity
//  * @param {Function} props.handleDelete - Callback to decrease quantity
//  */
//  const ItemQuantity = ({
//   value,
//   handleAdd,
//   handleDelete,
//   isReadOnly = false,
// }) => {
//   if (isReadOnly) {
//     return <Box>Qty: {value}</Box>;
//   }
//   return (
//     <Stack direction="row" alignItems="center">
//       <IconButton size="small" color="primary" onClick={handleDelete}>
//         <RemoveOutlined />
//       </IconButton>
//       <Box padding="0.5rem" data-testid="item-qty">
//         {value}
//       </Box>
//       <IconButton size="small" color="primary" onClick={handleAdd}>
//         <AddOutlined />
//       </IconButton>
//     </Stack>
//   );
// };

// /**
//  * Component to display the Cart
//  * 
//  * @param {Object} props 
//  * @param {Array} props.products - List of all available products
//  * @param {Array} props.items - List of items in the cart with complete product details
//  * @param {Function} props.handleQuantity - Callback to update product quantity in cart
//  */
// const Cart = ({ products, items = [], handleQuantity }) => {
//   const history = useHistory();

//   // Display view for empty cart
//   if (!items.length) {
//     return (
//       <Box className="cart empty" textAlign="center" p={3}>
//         <ShoppingCartOutlined
//           className="empty-cart-icon"
//           fontSize="large"
//           data-testid="empty-cart-icon"
//         />
//         <Box color="#aaa" mt={1} data-testid="empty-cart-text">
//           Cart is empty. Add more items to the cart to checkout.
//         </Box>
//       </Box>
//     );
//   }

//   // Return JSX for Cart view
//   return (
//     <Box className="cart">
//       {items.map((item) => (
//         <Box
//           key={item.productId}
//           display="flex"
//           alignItems="flex-start"
//           padding="1rem"
//           data-testid="cart-item"
//         >
//           <Box className="image-container">
//             <img
//               src={item.image}
//               alt={item.name}
//               width="100%"
//               height="100%"
//               data-testid="cart-item-image"
//             />
//           </Box>
//           <Box
//             display="flex"
//             flexDirection="column"
//             justifyContent="space-between"
//             height="6rem"
//             paddingX="1rem"
//           >
//             <div data-testid="cart-item-name">{item.name}</div>
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//             >


//               <ItemQuantity
//               value={item.qty}
//               handleAdd={() => handleQuantity(item.productId, item.qty + 1)}
//               handleDelete={() => {
//                   // Make sure qty is exactly 0 for removal
//                   handleQuantity(item.productId, item.qty - 1);
//               }}
//               />
              
//               <Box padding="0.5rem" fontWeight="700" data-testid="cart-item-cost">
//                 ${item.cost}
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       ))}

//       <Box
//         padding="1rem"
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Box color="#3C3C3C" fontSize="1.5rem">
//           Order Total
//         </Box>
//         <Box
//           color="#3C3C3C"
//           fontWeight="700"
//           fontSize="1.5rem"
//           data-testid="cart-total"
//         >
//           ${getTotalCartValue(items)}
//         </Box>
//       </Box>

//       <Box display="flex" justifyContent="flex-end" padding="1rem">
//         <Button
//           color="primary"
//           variant="contained"
//           startIcon={<ShoppingCart />}
//           onClick={() => history.push("/checkout")}
//           data-testid="checkout-btn"
//         >
//           Checkout
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Cart;



import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

/**
 * Returns the complete data on the products in the cart
 * @param { Array } cartData Array of objects with productId and qty
 * @param { Array } productsData Array of objects with complete data on all available products
 * @returns { Array } Array of objects with complete data on products in cart
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  if (!cartData || !productsData) return [];

  return cartData.map((cartItem) => {
    const product = productsData.find((p) => p._id === cartItem.productId);
    return {
      ...product,
      qty: cartItem.qty,
      productId: cartItem.productId,
    };
  });
};

/**
 * Get the total value of all products added to the cart
 * @param { Array } items Array of objects with complete data on products added to the cart
 * @returns { Number } Total value of all items in the cart
 */
export const getTotalCartValue = (items = []) => {
  return items.reduce((total, item) => total + item.cost * item.qty, 0);
};

/**
 * Get the total number of items in the cart
 * @param { Array } items Array of objects with complete data on products added to the cart
 * @returns { Number } Total number of items in the cart
 */
export const getTotalItems = (items = []) => {
  return items.reduce((total, item) => total + item.qty, 0);
};

/**
 * Component to display the quantity of a product and increment/decrement buttons
 * 
 * @param {Object} props 
 * @param {Number} props.value - Current quantity of the item
 * @param {Function} props.handleAdd - Callback to increase quantity
 * @param {Function} props.handleDelete - Callback to decrease quantity
 * @param {Boolean} props.isReadOnly - If true, display only the quantity, no edit controls
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
  isReadOnly = false,
}) => {
  if (isReadOnly) {
    return <Box>Qty: {value}</Box>;
  }
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * Component to display the Cart
 * 
 * @param {Object} props 
 * @param {Array} props.products - List of all available products
 * @param {Array} props.items - List of items in the cart with complete product details
 * @param {Function} props.handleQuantity - Callback to update product quantity in cart
 * @param {Boolean} props.isReadOnly - If true, display cart in read-only mode for checkout
 */
const Cart = ({ products, items = [], handleQuantity, isReadOnly = false }) => {
  const history = useHistory();

  // Display view for empty cart
  if (!items.length) {
    return (
      <Box className="cart empty" textAlign="center" p={3}>
        <ShoppingCartOutlined
          className="empty-cart-icon"
          fontSize="large"
          data-testid="empty-cart-icon"
        />
        <Box color="#aaa" mt={1} data-testid="empty-cart-text">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  // Return JSX for Cart view
  return (
    <Box className="cart">
      {/* Optional Order Details section for checkout page */}
      {isReadOnly && (
        <Box padding="1rem">
          <h2>Order Details</h2>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Box>Products</Box>
            <Box>{getTotalItems(items)}</Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Box>Subtotal</Box>
            <Box>${getTotalCartValue(items)}</Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Box>Shipping</Box>
            <Box>Free</Box>
          </Box>
          <Divider />
        </Box>
      )}

      {items.map((item) => (
        <Box
          key={item.productId}
          display="flex"
          alignItems="flex-start"
          padding="1rem"
          data-testid="cart-item"
        >
          <Box className="image-container">
            <img
              src={item.image}
              alt={item.name}
              width="100%"
              height="100%"
              data-testid="cart-item-image"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="6rem"
            paddingX="1rem"
          >
            <div data-testid="cart-item-name">{item.name}</div>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <ItemQuantity
                value={item.qty}
                handleAdd={() => handleQuantity && handleQuantity(item.productId, item.qty + 1)}
                handleDelete={() => {
                  // Make sure qty is exactly 0 for removal
                  handleQuantity && handleQuantity(item.productId, item.qty - 1);
                }}
                isReadOnly={isReadOnly}
              />
              
              <Box padding="0.5rem" fontWeight="700" data-testid="cart-item-cost">
                ${item.cost}
              </Box>
            </Box>
          </Box>
        </Box>
      ))}

      <Box
        padding="1rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box color="#3C3C3C" fontSize="1.5rem">
          Order Total
        </Box>
        <Box
          color="#3C3C3C"
          fontWeight="700"
          fontSize="1.5rem"
          data-testid="cart-total"
        >
          ${getTotalCartValue(items)}
        </Box>
      </Box>

      {/* Only show checkout button if not in read-only mode */}
      {!isReadOnly && (
        <Box display="flex" justifyContent="flex-end" padding="1rem">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={() => history.push("/checkout")}
            data-testid="checkout-btn"
          >
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;