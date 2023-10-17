import styled from "styled-components";

const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px 15px;
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
  const handleClick = () => {
    setcartToggle(!cartToggle);
  };

  return <Button onClick={handleClick}>cart</Button>;
};

export default CartButton;
