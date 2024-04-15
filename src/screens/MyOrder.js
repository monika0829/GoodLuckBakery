import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:5000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setOrderData(response.orderData);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {orderData !== null
            ? orderData.order_data
                .slice(0)
                .reverse()
                .map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {item.Order_date ? (
                        <div className="m-auto mt-5">
                          {item.Order_date}
                          <hr />
                        </div>
                      ) : (
                        <div className="col -12 col-md-6 col-lg-3">
                          <div
                            className="card mt-3"
                            style={{
                              width: "16rem",
                              maxHeight: "360px",
                            }}
                          >
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}
                              >
                                <span className="m-1">{item.qty}</span>
                                <span className="m-1">{item.size}</span>
                                <span className="m-1">{item.Order_date}</span>
                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                  ${item.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })
            : "Please, Order Something."}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
