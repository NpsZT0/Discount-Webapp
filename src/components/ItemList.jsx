import React from "react";

function ItemList({ cart, removeItem }) {
  return (
    <div>
      {cart.map((product, id) => (
        <div
          key={id}
          className={
            id === cart.length - 1
              ? "grid grid-cols-3 p-2 items-center"
              : "grid grid-cols-3 p-2 border-b border-solid items-center"
          }
        >
          <h6 className="text-sm lg:text-base">{product.name}</h6>
          <p className="text-xs text-center">{product.category}</p>
          <div className="flex justify-end">
            <h6 className="flex items-center text-xs lg:text-base">
            {product.price} ฿
            </h6>
            <button
              className="p-0 py-0 ml-2 btn btn-ghost btn-sm"
              onClick={() => removeItem(id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3 lg:w-4 lg:h-4"
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
