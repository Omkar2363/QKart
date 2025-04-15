// // import { AddShoppingCartOutlined } from "@mui/icons-material";
// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Rating,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import "./ProductCard.css";

// const ProductCard = ({ product, handleAddToCart }) => {
//   return (
//     <Card className="card" >
//       <CardMedia 
//         component="img"
//         image={product.image}
//         alt={product.name}
//         className="product-image"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h6" component="div" className="product-name">
//           {product.name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" className="product-price">
//           ${product.cost}
//         </Typography>
//         <Rating
//           name={`rating-${product._id}`}
//           value={product.rating}
//           readOnly
//           size="small"
//           aria-label={`${product.rating} stars`}
//         />
//       </CardContent>
//       <CardActions>
//         <Button
//           fullWidth
//           variant="contained"
//           color="primary"
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default ProductCard;


// import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card" >
      <CardMedia 
        component="img"
        image={product.image}
        alt={product.name}
        className="product-image"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" className="product-name">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="product-price">
          ${product.cost}
        </Typography>
        <Rating
          name={`rating-${product._id}`}
          value={product.rating}
          readOnly
          size="small"
          aria-label={`${product.rating} stars`}
        />
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
