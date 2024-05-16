import React, { useContext } from "react";
import { mycontext } from "../App";

const Cart = () => {
  const [data, setData] = useContext(mycontext);

  const totalPrice = data.reduce(
    (total, data) => total + data.price * (data.quantity || 1),
    0
  );
  const totalQuantity = data.reduce(
    (total, data) => total + (data.quantity || 1),
    0
  );

  const handleInc = (id, quantity) => {
    setData((curr) => {
      return curr.map((ele) => {
        if (ele.id === id) {
          return { ...ele, quantity: ele.quantity + 1 || quantity + 1 };
        }
        return ele;
      });
    });
  };
  const handleDec = (id, quantity) => {
    setData((curr) => {
      return curr.map((ele) => {
        if (ele.id === id && quantity > 0) {
          return { ...ele, quantity: ele.quantity - 1 || quantity - 1 };
        }
        return ele;
      });
    });
  };
  const handleRemove = (indexpos) => {
    setData((initialval) =>
      initialval.filter((element, index) => index !== indexpos)
    );
  };

  return (
    <>
      <div className="container p-5">
        {/* <h1 className="text-center pb-3 text-bg-primary ">Cart Using UseContext</h1> */}
        {data.map((element, index) => {
          return (
            <div key={index}>
              <div className="card">
                <div className="row">
                  <div className="col-md-3 col-lg-3 col-xl-3">
                    <img
                      src={element.thumbnail}
                      className="img-fluid rounded-3"
                      alt={element.category}
                    />
                  </div>

                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="card-body">
                      <h1 className="card-title pb-2 ">{element.title}</h1>                      
                      <h4 className="card-title">{element.brand}</h4>
                      <h5 className="card-title pb-3 ">{element.category}</h5>
                      <h5 className=" fw-semibold ">{element.description}</h5>
                    </div>
                  </div>

                  <div className="col-md-3 col-lg-3 col-xl-3 ">
                    <div className="card-body d-flex justify-content-center  ">
                      <button
                        className="add"
                        onClick={() =>
                          handleInc(element.id, element.quantity || 1)
                        }
                      >
                        +
                      </button>
                      <p
                        className="count py-1 px-1"
                        style={{ height: "fit-content", boxSizing:"border-box" }}
                      >
                        {element.quantity || 1}
                      </p>
                      <button
                        className="sub"
                        onClick={() =>
                          handleDec(element.id, element.quantity || 1)
                        }
                      >
                        -
                      </button>
                      <h5 className="mb-0">${element.price}</h5>
                    </div>

                    <div className="d-flex justify-content-center   ">
                      
                      <button
                        className="remove btn btn-danger  "
                        onClick={() => {
                          handleRemove(index);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row ">
                  <div className="col-md-12 ">
                    <div className="d-flex justify-content-between px-5">
                      <h5>Sub Total</h5>
                      <h5>
                        ${element.price * element.quantity || element.price}
                      </h5>
                    </div>
                    <div className="d-flex justify-content-between px-5">
                      <h5>Shipping</h5>
                      <h5>FREE</h5>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between px-5">
                      <h5>Total</h5>
                      <h5>${totalPrice}</h5>
                    </div>
                    
                  </div>
                </div>

                
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
