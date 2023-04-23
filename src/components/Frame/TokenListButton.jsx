import React from 'react';

const TokenListButton = ({
  selectedTokenName,
  selectedTokenIcon,
  modalVisible,
  toggleModal,
}) => {
  return (
    <>
      <div className="relative inline-block text-center">
        {/* <img src={selectedTokenIcon} alt="" /> */}
        <button
          className="flex flex-row gap-2"
          onClick={() => toggleModal(!modalVisible)}
        >
          <img src={selectedTokenIcon} alt="" className="w-4 h-4" />
          <span className="text-xs text-primaryText hover:text-infoText">
            {selectedTokenName}
          </span>
        </button>
      </div>
    </>
  );
};

export default TokenListButton;
