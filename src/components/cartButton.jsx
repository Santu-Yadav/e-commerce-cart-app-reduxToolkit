import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3498db;
  color: #fff;
  padding: 10px 35px;
  margin: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const CartButton = ({ cartToggle, setcartToggle }) => {
  const cartOperation = useSelector((state) => state.cartOperation);

  const handleClick = () => {
    setcartToggle(!cartToggle);
  };

  const badgeContentCount = cartOperation.finalTotalProductCount;

  return (
    <Button onClick={handleClick}>
      <Badge badgeContent={badgeContentCount} color="error">
        <ShoppingCartOutlinedIcon />
      </Badge>
    </Button>
  );
};

export default CartButton;
