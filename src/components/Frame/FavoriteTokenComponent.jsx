const FavoriteTokenComponent = ({
  currentItem,
  setSelectedToken,
  setIsTokenModalVisible,
}) => {
  return (
    <div
      className=" w-[600px] px-2 py-2 flex flex-row gap-4 cursor-pointer hover:text-infoText hover:shadow-md rounded-lg  justify-center items-center border border-secondaryFill hover:border-secondary hover:bg-secondaryFill "
      onClick={() => {
        setSelectedToken(currentItem);
        setIsTokenModalVisible(false);
      }}
    >
      <img src={currentItem?.logoURI} alt="" className="w-5 h-5" />
      <span className="text-xs text-secondaryText hover:text-infoText">
        {currentItem?.symbol}
      </span>
    </div>
  );
};

export default FavoriteTokenComponent;
