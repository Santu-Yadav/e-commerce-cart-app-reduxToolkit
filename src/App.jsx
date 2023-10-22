import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import Products from "./components/products";
import CartButton from "./components/cartButton";
import CartDisplay from "./components/CartDisplay";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: lightblue;
  padding-left: 30px;
  padding-right: 10px;
`;

function App() {
  const cartOperation = useSelector((state) => state.cartOperation);
  const dispatch = useDispatch();

  console.log("cartOperation #", cartOperation);
  // const [productData, setProductData] = useState({});
  const [cartToggle, setcartToggle] = useState(true);

  return (
    <>
      <Container>
        <Header>
          <h1>E-commerce</h1>
          <CartButton
            cartToggle={cartToggle}
            setcartToggle={setcartToggle}
            // productData={productData}
          />
        </Header>

        <Products />

        {/* Object.keys(productData).length > 0 &&
          productData.finalTotalProductCount > 0 && */}
        {cartToggle && <CartDisplay />}
      </Container>
    </>
  );
}

export default App;
