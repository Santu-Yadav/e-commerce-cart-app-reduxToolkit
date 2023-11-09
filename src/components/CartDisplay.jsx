import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { increment, decrement, remove } from "../reduxStore/slices/cartSlice";

const CartDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PrdctQtyBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 4px;
  background-color: #5a8dee2e;
  margin: 5px;
  color: #5a8dee;
  font-size: 11px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #5a9dee;
    color: #fff;
  }
`;

const QtyInputBox = styled.button`
  min-width: 50px;
  min-height: 40px;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  color: #475f7b;
  background-color: #fff;
  border: 1px solid #dfe3e7;
`;

const StrongFont = styled.span`
  font-family: "Helvetica", sans-serif;
  font-size: 1em;
  color: #555;
  text-align: center;
  font-weight: 600;
  margin: 10px 0;
`;

const StrongFont1 = styled.span`
  font-family: "Helvetica", sans-serif;
  font-size: 1em;
  color: #555;
  text-align: center;
  font-weight: 600;
  margin: 10px 0;
  margin-left: 66px;
`;

const DeleteButton = styled.button`
  display: inline-block;
  padding: 9px 6px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  background-color: #fd5c63;
  color: white;
  border: 1px solid #fd5c63;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: white;
    color: #fd5c63;
  }
`;

const CartDisplay = () => {
  const cartOperation = useSelector((state) => state.cartOperation);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if a filter is needed
    const filteredObjectData = cartOperation.objectData.filter(
      (item) => item.count === 0
    );
    // Only update the state if the filteredObjectData is not empty.
    if (filteredObjectData.length !== 0) {
      // dispatch(remove)
      // setProductData((prevProductData) => ({
      //   ...prevProductData,
      //   objectData: cartOperation.objectData.filter((item) => item.count !== 0),
      // }));
    }
  }, [cartOperation]);

  const handleSubtraction = (e) => {
    console.log("e inside cartDisplay #", e);
    dispatch(decrement(e.target.id));
  };

  const handleAddition = (objData) => {
    dispatch(increment(objData));
  };

  const handleDelete = (objData) => {
    dispatch(remove(objData));
    //****************************************************
    // const deletedItem = productData.objectData.filter(
    //   (item) => item.prodId === e.target.id
    // );
    // const filterDeletedItem = productData.objectData.filter(
    //   (item) => item.prodId !== e.target.id
    // );
    // const finalTotalAmount =
    //   productData.finalTotalAmount - deletedItem[0].totalPrice;
    // const finalTotalProductCount =
    //   productData.finalTotalProductCount - deletedItem[0].count;
    // setProductData({
    //   ...productData,
    //   objectData: filterDeletedItem,
    //   finalTotalAmount: finalTotalAmount,
    //   finalTotalProductCount: finalTotalProductCount,
    // });
  };

  return (
    <CartDisplayContainer>
      {cartOperation.objectData.map((item) => (
        <div key={item.prodId}>
          <span>{item.prodName}</span> : $<span>{item.price}</span>
          <PrdctQtyBtn id={item.prodId} onClick={handleSubtraction}>
            -
          </PrdctQtyBtn>
          <QtyInputBox>{item.count}</QtyInputBox>
          <PrdctQtyBtn id={item} onClick={() => handleAddition(item)}>
            +
          </PrdctQtyBtn>
          = $<span>{item.totalPrice}</span>
          <DeleteButton id={item.prodId} onClick={() => handleDelete(item)}>
            Delete
          </DeleteButton>
        </div>
      ))}

      <div>
        <StrongFont>Items In Cart</StrongFont> :
        {cartOperation.finalTotalProductCount}
        <StrongFont1>Total Price</StrongFont1> : $
        {cartOperation.finalTotalAmount}
      </div>
    </CartDisplayContainer>
  );
};

export default CartDisplay;
