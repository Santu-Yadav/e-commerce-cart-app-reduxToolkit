import styled from "styled-components";
import { useState } from "react";

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductCard = styled.div`
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 16px;
`;

const ProductTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: #333;
`;

const AddToCartButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const productArray = [
  { prodName: "Product01", prodId: "1", price: 100.0 },
  { prodName: "Product02", prodId: "2", price: 200.0 },
  { prodName: "Product03", prodId: "3", price: 500.0 },
];

// const Products = ({ productItems, setProductItems }) => {
const Products = ({ productData, setProductData }) => {
  //*****************************************************************************
  //*****************************************************************************
  const handleProductAdd = (data) => {
    if (Object.keys(productData).length === 0) {
      const objectData = [];
      objectData.push({ ...data, count: 1, totalPrice: data.price });

      const finalTotalAmount = data.price;
      const finalTotalProductCount = 1;
      setProductData({
        objectData,
        finalTotalProductCount,
        finalTotalAmount,
      });
    } else {
      // Write the logic if productData have only one entry, for an example entry with id:1,
      const findObject = productData.objectData.find(
        (item) => item.prodId === data.prodId
      );

      if (findObject) {
        //existing object, then write logic here.
        const objectData = productData.objectData.map((item) => {
          if (item.prodId === findObject.prodId) {
            return {
              ...item,
              count: item.count + 1,
              totalPrice: item.totalPrice + data.price,
            };
          } else {
            return {
              ...item,
            };
          }
        });

        const finalTotalProductCount = productData.finalTotalProductCount + 1;
        const finalTotalAmount =
          productData.finalTotalAmount + findObject.price;
        setProductData({
          objectData,
          finalTotalProductCount,
          finalTotalAmount,
        });
      } else {
        //what happens when object with id:2 comes up?

        let cloneProductData = JSON.parse(JSON.stringify(productData));

        cloneProductData.objectData.push({
          ...data,
          count: 1,
          totalPrice: data.price,
        });

        cloneProductData.finalTotalProductCount =
          cloneProductData.finalTotalProductCount + 1;

        cloneProductData.finalTotalAmount =
          cloneProductData.finalTotalAmount + data.price;

        setProductData(cloneProductData);
      }
    }
  };

  //*****************************************************************************
  //*****************************************************************************
  // const [productItems, setProductItems] = useState([]);

  // const [productData, setProductData] = useState({});
  // console.log("productItems #", productItems);
  // console.log("ProductData", productData);

  // const handleProductAdd = (data) => {

  //   setProductItems((prevItems) => {
  //     const updatedItems = [...prevItems, data];

  //     // Calculate updated totals
  //     const productMap = updatedItems.reduce((acc, product) => {
  //       const key = `${product.prodName}`;
  //       acc[key] = acc[key] || { count: 0, totalPrice: 0, ...product };
  //       acc[key].count += 1;
  //       acc[key].totalPrice += product.price;
  //       return acc;
  //     }, {});

  //     const finalTotalAmount = Object.values(productMap).reduce(
  //       (sum, product) => sum + product.totalPrice,
  //       0
  //     );
  //     const finalTotalProductCount = Object.values(productMap).reduce(
  //       (count, product) => count + product.count,
  //       0
  //     );

  //     console.log("Object data", productMap);
  //     console.log("Object data_01 #", Object.values(productMap));
  //     const updateProductMap = Object.values(productMap);
  //     setProductData({
  //       updateProductMap,
  //       finalTotalProductCount,
  //       finalTotalAmount,
  //     });
  //     //***

  //     return updatedItems;
  //   });
  // };

  return (
    <ProductContainer>
      {productArray.map((item) => (
        <ProductCard key={item.prodId}>
          <ProductInfo>
            <ProductTitle>{item.prodName}</ProductTitle>
            <ProductPrice>${item.price}</ProductPrice>
            <AddToCartButton onClick={() => handleProductAdd(item)}>
              Add to Cart
            </AddToCartButton>
          </ProductInfo>
        </ProductCard>
      ))}
    </ProductContainer>
  );
};

export default Products;

/* 
The above code inside function "handleProductAdd" is explained below 

improvements needed 

"In the current code, the setProductData (useState function) is being executed within another useState function, 
setProductItems. This approach is not considered effective coding practice. It is recommended to refactor the code 
and place the setProductData function inside a useEffect hook for improved efficiency."


Reduce method explanation:-
1. reduce method is part of an array prototype. It executes on Array instance. It executes a user-supplied 
"reducer" callback function on each element of the array, in order, passing in the return value from the 
calculation on the preceding element. The final result of running the reducer across all elements of the array
is a single value.

2. In our scenario, the array elements consist of objects. As a result, the final output will be a singular 
object.

3. so, as an inital input in the reducer method a blank object has been passed. 

4. how does object works in javascript. it has properties, value combination. 

5. so we need to create an properties first, before assigning any value in it or if we assign value directly then
the variable which holds that value will became properties automatically. 

6. And next time if you work on the same properties then you need to point that particular properties. 

7. what is meant by "acc[key] = acc[key] || { count: 0, totalPrice: 0, ...product };" (line no. 75)?
this means, 
    a.) if acc[key] has some value then keep that, if it is falsy then pass { count: 0, totalPrice: 0, ...product }
        as its value. 
    b.) it is oposite of &&, had it been && istead of ||, that means if acc[key] returns truthy then execute
        the part of code after &&. 

8. 

*/
