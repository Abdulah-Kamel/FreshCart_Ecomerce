import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();
export default function CartContextProvider(props) {
  const [cartId, setcartId] = useState('')
  const [numberOfCart, setNumberOfCart] = useState(0);
 async function CartCount() {
   let {data} = await getCart();
   if (data?.status === "success") {
     setNumberOfCart(data?.numOfCartItems);
     setcartId(data.data._id);
   }
    }
  useEffect(() => {
    CartCount();
  },[])
  const userToken = localStorage.getItem("userToken");
  const headers = { Token: userToken };
  function addToCart(id) {
    return axios
      .post(
        "https://route-ecommerce.onrender.com/api/v1/cart",
        { productId: id },
        { headers }
      )
      .then((Response) => Response)
      .catch((err) => err);
  }

  function getCart() {
    return axios
      .get("https://route-ecommerce.onrender.com/api/v1/cart", { headers })
      .then((Response) => Response)
      .catch((err) => err);
  }
  function updateCart(id, count) {
    return axios
      .put(
        `https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
        { count },
        { headers }
      )
      .then((Response) => Response)
      .catch((err) => err);
  }
  function deletItem(id) {
    return axios
      .delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`, {
        headers,
      })
      .then((Response) => Response)
      .catch((err) => err);
  }
   function ClearCart() {
   return axios
     .delete("https://route-ecommerce.onrender.com/api/v1/cart/", {
       headers,
     })
     .then((Response) => Response)
     .catch((err) => err);
  }
  function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=https://freshcart-ecommerce.netlify.app/#`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((Response) => Response)
      .catch((err) => err);
  }
  function getBrands() {
return axios
  .get("https://route-ecommerce.onrender.com/api/v1/brands", {
    headers,
  })
  .then((Response) => Response)
  .catch((err) => err);
    }
  function getProudcts() {
return axios
  .get("https://route-ecommerce.onrender.com/api/v1/products/")
  .then((Response) => Response)
  .catch((err) => err);
    }
  function getOrders() {
return axios
  .get("https://route-ecommerce.onrender.com/api/v1/orders", {
    headers,
  })
  .then((Response) => Response)
  .catch((err) => err);
  }
  function addToWishist(id) {
    return axios
      .post(
        "https://route-ecommerce.onrender.com/api/v1/cart",
        { productId: id },
        { headers }
      )
      .then((Response) => Response)
      .catch((err) => err);
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getCart,
        updateCart,
        deletItem,
        ClearCart,
        onlinePayment,
        cartId,
        numberOfCart,
        setNumberOfCart,
        getBrands,
        getProudcts,
        getOrders,
        addToWishist,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
