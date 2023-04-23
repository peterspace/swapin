import React from 'react';

const ActiveTokenComponent = ({ currentItem }) => {
  return (
    <div className="px-4 py-3 flex flex-row gap-4 cursor-pointer hover:text-infoText hover:shadow-md rounded-lg  justify-center items-center border border-secondaryFill hover:border-secondary bg-secondaryFill  ">
      <img src={currentItem?.logoURI} alt="" className="w-6 h-6" />
      <span className="text-xs text-secondaryText hover:text-infoText">
        {currentItem?.symbol}
      </span>
    </div>
  );
};

export default ActiveTokenComponent;
