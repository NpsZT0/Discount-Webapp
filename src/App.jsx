import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ItemList from "./components/ItemList";
import Select from "./components/Select";

function App() {
  const products = [
    {
      id: 1,
      category: "Clothing",
      name: "T-shirt",
      price: 250,
    },
    {
      id: 2,
      category: "Clothing",
      name: "Jeans",
      price: 500,
    },
    {
      id: 3,
      category: "Clothing",
      name: "Jacket",
      price: 1000,
    },
    {
      id: 4,
      category: "Clothing",
      name: "Hoodie",
      price: 700,
    },
    {
      id: 5,
      category: "Accessories",
      name: "Necklace",
      price: 1000,
    },
    {
      id: 6,
      category: "Accessories",
      name: "Bracelet",
      price: 500,
    },
    {
      id: 7,
      category: "Accessories",
      name: "Ring",
      price: 300,
    },
    {
      id: 8,
      category: "Accessories",
      name: "Earrings",
      price: 200,
    },
  ];

  const campaigns = [
    { id: 0, name: "Pick a discount" },
    {
      id: 1,
      category: "Coupon",
      name: "Fixed amount",
      discount: "50 ฿",
    },
    {
      id: 2,
      category: "Coupon",
      name: "Percentage discount",
      discount: "10%",
    },

    {
      id: 3,
      category: "On Top",
      name: "Percentage discount by Clothing",
      discount: "15%",
    },
    {
      id: 4,
      category: "On Top",
      name: "Percentage discount by Accessories",
      discount: "10%",
    },
    {
      id: 5,
      category: "On Top",
      name: "Discount by points",
      discount: "1 points = 1฿ Limited to 20%",
    },

    {
      id: 6,
      category: "Seasonal",
      name: "Special campaigns",
      discount: "40 ฿ every 3000 ฿",
    },
  ];

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [resultPrice, setResultPrice] = useState(0);
  const [cartModal, setCartModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(0);
  const [selectedOnTop, setSelectedOnTop] = useState(0);
  const [selectedSeasonal, setSelectedSeasonal] = useState(0);
  const myPoints = 100;

  const addToCart = async (productId) => {
    setCart([...cart, products.find((product) => product.id === productId)]);
  };

  const removeItem = async (id) => {
    setCart(cart.filter((product, inCartId) => inCartId !== id));
  };

  const applyDiscount = async () => {
    let resultPrice = totalPrice;
    console.log("before", resultPrice);

    // Coupon
    if (campaigns[selectedCoupon].name === "Fixed amount") {
      resultPrice -= 50;
      console.log("after Coupon", resultPrice, "discount", 50);
    } else if (campaigns[selectedCoupon].name === "Percentage discount") {
      resultPrice -= (totalPrice * 10) / 100;
      console.log(
        "after Coupon",
        resultPrice,
        "discount",
        (totalPrice * 10) / 100
      );
    }

    // On Top
    if (campaigns[selectedOnTop].name === "Percentage discount by Clothing") {
      const clothingPrice = cart.reduce((prevVal, product) => {
        // console.log("product", product.category, product.price)
        if (product.category === "Clothing") {
          return prevVal + product.price;
        } else {
          return prevVal;
        }
      }, 0);
      resultPrice -= (clothingPrice * 15) / 100;
      console.log(
        "after On Top",
        resultPrice,
        "discount",
        (clothingPrice * 15) / 100
      );
    } else if (
      campaigns[selectedOnTop].name === "Percentage discount by Accessories"
    ) {
      const accessoriesPrice = cart.reduce((prevVal, product) => {
        if (product.category === "Accessories") {
          return prevVal + product.price;
        } else {
          return prevVal;
        }
      }, 0);
      resultPrice -= (accessoriesPrice * 10) / 100;
      console.log(
        "after On Top",
        resultPrice,
        "discount",
        (accessoriesPrice * 10) / 100
      );
    } else if (campaigns[selectedOnTop].name === "Discount by points") {
      const twentyPercent = totalPrice * 0.2;
      resultPrice -= myPoints > twentyPercent ? totalPrice : myPoints;
      console.log(
        "after On Top",
        resultPrice,
        "discount",
        myPoints > twentyPercent ? totalPrice : myPoints
      );
    }

    // Seasonal
    if (campaigns[selectedSeasonal].name === "Special campaigns") {
      const discount = Math.floor(resultPrice / 3000) * 40;
      resultPrice -= discount;
      console.log("after Seasonal", resultPrice, "discount", discount);
    }
    setResultPrice(resultPrice);
  };

  // When cart changes
  useEffect(() => {
    if (cart.length === 0) {
      setSelectedCoupon(0);
      setSelectedOnTop(0);
      setSelectedSeasonal(0);
      setResultPrice(0);
    }
    setTotalPrice(
      cart.reduce((prevVal, product) => prevVal + product.price, 0)
    );
  }, [cart]);

  // When total price changes Then apply discount
  useEffect(() => {
    applyDiscount();
  }, [totalPrice, selectedCoupon, selectedOnTop, selectedSeasonal]);

  useEffect(() => {}, [totalPrice]);

  return (
    <div className="box-border h-vh w-vw">
      <Navbar
        itemsAmount={cart.length}
        setCartModal={setCartModal}
        cartModal={cartModal}
      />
      <div className="h-screen">
        <main className="grid gap-2 p-8 mx-auto md:grid-cols-3 lg:grid-cols-5 md:gap-4 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-md bg-gray-300 shadow-md 
          transition ease-in-out delay-150 hover:scale-[1.03] duration-500 space-y-2"
            >
              <div className="flex justify-between">
                <h4 className="text-xl font-bold text-gray-700">
                  {product.name}
                </h4>
                <p>{product.price} ฿</p>
              </div>
              <div className="text-sm text-gray-500">{product.category}</div>
              <button
                className="btn btn-success btn-sm "
                onClick={() => addToCart(product.id)}
              >
                Add to cart
              </button>
            </div>
          ))}
        </main>
      </div>

      <dialog id="my_modal" className="modal">
        <section className="modal-box h-[80%] overflow-y-hidden">
          <section className="overflow-y-auto h-[80%] mb-10">
            <section className="pb-4 border-b-2 border-gray-300 border-dashed">
              <h5 className="text-lg font-semibold">
                Products: {cart.length} {cart.length > 0 ? "items" : "item"}
              </h5>
              <div className="p-2">
                <ItemList cart={cart} removeItem={removeItem} />
              </div>
            </section>
            <section className="pb-4 mt-4 border-b-2 border-gray-300 border-dashed">
              <h5 className="text-lg font-semibold">
                Discount: {campaigns.length}{" "}
                {campaigns.length > 0 ? "campaigns" : "campaign"}
              </h5>
              <Select
                campaigns={campaigns}
                category="Coupon"
                setSelectedDiscount={setSelectedCoupon}
                disable={cart.length === 0}
                cart={cart}
              />
              <Select
                campaigns={campaigns}
                category="On Top"
                setSelectedDiscount={setSelectedOnTop}
                disable={cart.length === 0 || selectedCoupon === 0}
                cart={cart}
              />
              <Select
                campaigns={campaigns}
                category="Seasonal"
                setSelectedDiscount={setSelectedSeasonal}
                disable={cart.length === 0 || selectedOnTop === 0}
                cart={cart}
              />
            </section>
            <section className="mt-4">
              <h5 className="text-lg font-semibold">Summarized</h5>
              <section className="flex justify-between">
                <p className="text-sm font-semibold text-gray-600">
                  Total price
                </p>
                <p className="text-sm">{totalPrice} ฿</p>
              </section>
              {selectedCoupon !== 0 && (
                <section className="flex justify-between">
                  <p className="text-sm font-semibold text-gray-600 truncate">
                    Coupon discount
                  </p>
                  <p className="text-sm text-red-400 truncate">
                    {campaigns[selectedCoupon].discount}
                  </p>
                </section>
              )}
              {selectedOnTop !== 0 && (
                <section className="flex justify-between">
                  <p className="text-sm font-semibold text-gray-600 truncate">
                    On Top discount
                  </p>
                  <p className="text-sm text-red-400 truncate">
                    {campaigns[selectedOnTop].discount}
                  </p>
                </section>
              )}
              {selectedSeasonal !== 0 && (
                <section className="flex justify-between">
                  <p className="text-sm font-semibold text-gray-600 truncate">
                    Seasonal discount
                  </p>
                  <p className="text-sm text-red-400 truncate">
                    {campaigns[selectedSeasonal].discount}
                  </p>
                </section>
              )}
              <section className="flex justify-between">
                <p className="text-sm font-semibold text-gray-600 truncate">
                  Result price
                </p>
                <p className="text-sm">{resultPrice} ฿</p>
              </section>
            </section>
          </section>
          <form method="dialog" class="modal-backdrop">
            <button className="btn">Close</button>
          </form>
        </section>
      </dialog>

      <footer className="relative bottom-0 w-full">
        <div className="p-4 text-center text-gray-500 bg-base-300">
          © Naphitsit Thonglairuam
        </div>
      </footer>
    </div>
  );
}

export default App;
