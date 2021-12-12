import React from "react";
import styled from "styled-components";


const StyledDiv = styled.div.attrs((props) => props)`
  border: 1px solid rgb(219, 184, 240);
  padding: 10px;
  margin-bottom: 1%;
  width: 11%;
  /* height: 60px; */
  /* height: 14%; */
  /* width: 100%; */
  /* max-width: 50px; */
  transition: all 0.3s;
  background-color: ${(props) => (props.open ? props.color : "black")};
  @media screen and (min-width: 100px) and (max-width: 460px) {
    width: 9%;
    /* margin-bottom: 7px; */
  }
`;

const FieldItem = React.memo(({ params, handler }) => {
  const { color, open } = params;

  const handlerClick = () => {
    !open && handler(params);
  };

  return (
    <StyledDiv onClick={handlerClick} color={color} open={open}></StyledDiv>
  );
});

export default FieldItem;
