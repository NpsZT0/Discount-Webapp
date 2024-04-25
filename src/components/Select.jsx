import React from "react";

function Select({ campaigns, category, disable = false, setSelectedDiscount }) {
  return (
    <div>
      <section className="p-2">
        <section className="border-b border-solid ">
          <p className="pb-1 text-sm font-semibold text-gray-600">
            {category}
          </p>
          <select
            className="w-full select"
            disabled={disable}
            onChange={(event) => {
              setSelectedDiscount(
                campaigns.find((campaign) => campaign.id == event.target.value)
                  .id
              );
              console.log("===",event.target.value)
            }}>
            {campaigns
              .filter(
                (campaign, id) => campaign.category === category || id === 0
              )
              .map((campaign, id) =>
                campaign.id !== 0 ? (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name} : {campaign.discount && campaign.discount}
                  </option>
                ) : (
                  <option key={campaign.id} value={campaign.id} >
                    {campaign.name}
                  </option>
                )
              )}
          </select>
        </section>
      </section>
    </div>
  );
}

export default Select;
