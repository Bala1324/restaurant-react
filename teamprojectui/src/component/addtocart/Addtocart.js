import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { Link,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Addtocart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state);
  console.log("cart",cart);
  const dispatch = useDispatch();
  const addition = (acc, currentvalue) => {
    return acc + currentvalue.Price * currentvalue.quantity;
  };
  const total = cart.reduce(addition, 0);
  console.log("total",total)
  return (
    <div className="cartcontainer">
      <Link to="/home">
        <TiArrowBack />
      </Link>
      <div className="cart">
        {cart.map((item) => {
          return (
            <div className="cartcad" key={item.id}>
              <div>
                <img src={item.foodImage} alt="cart" />
                <h4 className="price">{item.foodName}</h4>
                <p className="price"> Price: Rs. {item.Price}</p>
                <p className="amount">total : Rs.{item.Price * item.quantity}</p>
                <button
                  onClick={() => dispatch({ type: "REMOVE", payload: item })}
                >
                  remove
                </button>
              </div>
              <div>
                <button
                  onClick={() => dispatch({ type: "INCREASE", payload: item })}
                >
                  +
                </button>
                <p className="quantity">{item.quantity}</p>
                <button
                  onClick={() => {
                    if (item.quantity > 1) {
                      dispatch({ type: "DECREASE", payload: item });
                    } else {
                      dispatch({ type: "REMOVE", payload: item });
                    }
                  }}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
     
      <div className="total">
      {total > 0 && <h2>Subtotal : {total}</h2>}
      <button className="order" onClick={()=>navigate('/payment',{state:total})}>Place Order</button>
      </div>
      </div>
    </div>
  );
};

export default Addtocart;
