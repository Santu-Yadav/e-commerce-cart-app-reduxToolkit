import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../reduxStore/slices/cartSlice";
import styled from "styled-components";

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
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

const Products = () => {
  const dispatch = useDispatch();
  //*****************************************************************************
  //*****************************************************************************
  const handleProductAdd = (data) => {
    dispatch(increment(data));
  };
  //*****************************************************************************
  //*****************************************************************************

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
