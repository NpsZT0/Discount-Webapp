import React from "react";

function ItemList({ cart, removeItem }) {
  return (
    <div>
      {cart.map((product, id) => (
        <div
          key={id}
          className={
            id === cart.length - 1
              ? "flex justify-between p-2"
              : "flex justify-between p-2 border-b border-solid"
          }
        >
          <h4>{product.name}</h4>
          <div className="flex">
            {product.price} ฿
            <button
              className="p-1 py-1 ml-2 btn btn-ghost btn-sm"
              onClick={() => removeItem(id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
