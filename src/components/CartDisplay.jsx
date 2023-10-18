import { useEffect } from "react";

import styled from "styled-components";

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

const CartDisplay = ({ productData, setProductData }) => {
  console.log("Product Data in CartDisplay @@@@@@@@@@", productData);

  useEffect(() => {
    // Check if a filter is needed
    const filteredObjectData = productData.objectData.filter(
      (item) => item.count === 0
    );
    // Only update the state if the filteredObjectData is not empty.
    if (filteredObjectData.length !== 0) {
      setProductData((prevProductData) => ({
        ...prevProductData,
        objectData: productData.objectData.filter((item) => item.count !== 0),
      }));
    }
  }, [productData]);

  const handleSubtraction = (e) => {
    console.log("Product Data in CartDisplay 001#", productData);

    let targetProduct = productData.objectData.find(
      (item) => item.prodId === e.target.id
    );

    // console.log("target product %%%%%%%%%", targetProduct.count);

    if (targetProduct) {
      let prepareData = {
        ...productData,
        finalTotalAmount: productData.finalTotalAmount - targetProduct.price,
        finalTotalProductCount: productData.finalTotalProductCount - 1,
        objectData: productData.objectData.map((item) => {
          if (item.prodId === targetProduct.prodId) {
            return {
              ...item,
              count: item.count - 1,
              totalPrice: item.totalPrice - item.price,
            };
          } else {
            return {
              ...item,
            };
          }
        }),
      };

      setProductData(prepareData);
      // }
    }
  };

  const handleAddition = (e) => {
    const targetProduct = productData.objectData.find(
      (item) => item.prodId === e.target.id
    );
    let prepareData = {
      ...productData,
      finalTotalAmount: productData.finalTotalAmount + targetProduct.price,
      finalTotalProductCount: productData.finalTotalProductCount + 1,
      objectData: productData.objectData.map((item) => {
        if (item.prodId === targetProduct.prodId) {
          return {
            ...item,
            count: item.count + 1,
            totalPrice: item.totalPrice + item.price,
          };
        } else {
          return {
            ...item,
          };
        }
      }),
    };

    setProductData(prepareData);
  };

  const handleDelete = (e) => {
    const deletedItem = productData.objectData.filter(
      (item) => item.prodId === e.target.id
    );

    const filterDeletedItem = productData.objectData.filter(
      (item) => item.prodId !== e.target.id
    );

    const finalTotalAmount =
      productData.finalTotalAmount - deletedItem[0].totalPrice;
    const finalTotalProductCount =
      productData.finalTotalProductCount - deletedItem[0].count;

    setProductData({
      ...productData,
      objectData: filterDeletedItem,
      finalTotalAmount: finalTotalAmount,
      finalTotalProductCount: finalTotalProductCount,
    });
  };

  return (
    <CartDisplayContainer>
      {productData.objectData.map((item) => (
        <div key={item.prodId}>
          <span>{item.prodName}</span> : $<span>{item.price}</span>
          <PrdctQtyBtn id={item.prodId} onClick={handleSubtraction}>
            -
          </PrdctQtyBtn>
          <QtyInputBox>{item.count}</QtyInputBox>
          <PrdctQtyBtn id={item.prodId} onClick={handleAddition}>
            +
          </PrdctQtyBtn>
          = $<span>{item.totalPrice}</span>
          <DeleteButton id={item.prodId} onClick={handleDelete}>
            Delete
          </DeleteButton>
        </div>
      ))}

      <div>
        <StrongFont>Items In Cart</StrongFont> :
        {productData.finalTotalProductCount}
        <StrongFont1>Total Price</StrongFont1> : ${productData.finalTotalAmount}
      </div>
    </CartDisplayContainer>
  );
};

export default CartDisplay;
