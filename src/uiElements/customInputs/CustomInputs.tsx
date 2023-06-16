import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import data from "../../data/wallets.json";

import { ArrowButtons } from "../customButtons/CustomButtons";
import { IconsLoader } from "./IconsLoader";
import {
  AmountBlue,
  InputName,
  SubHeader,
} from "../typography/CustomTypography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const wallets = data.wallets;

const InputWrapper = styled(Box)({
  width: "100%",
  height: "50px",
  backgroundColor: "white",
  border: "1px #e0e0e0 solid",
  borderRadius: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingInline: "25px",
  position: "relative",
  zIndex: "4",
});
const InputNameWrapper = styled(Box)({
  alignItems: "center",
  margin: "0 15px 5px",
});
const ItemMenuWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingInline: "30px",
  ":hover": {
    backgroundColor: "lightGray",
    cursor: "pointer",
  },
});
const MainInfoWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "35px",
});
const StyledMenuWrapper = styled(Stack)({
  backgroundColor: "#f2f2f2",
  padding: "20px 0",
  borderRadius: "0px 0px 20px 20px",
  position: "absolute",
  width: "100%",
  top: "60px",
  zIndex: "3",
});
const StyledDivider = styled(Box)({
  height: "25px",
  width: "1px",
  backgroundColor: "lightGray",
  marginInline: "10px",
});

const StyledCheckButton = styled(Box)({
  margin: "0 -10px",
  color: "#2980ff",
});

interface SelectProps {
  onChange: any;
}

export const WalletSelect: React.FC<SelectProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: wallets[0].name,
    imageName: wallets[0].imageName,
    total_usd_balance: wallets[0].total_usd_balance,
  });

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChosenOnClick = (event: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    const chosenItem = wallets.filter(
      (item) => event?.target.id === item.id
    )[0];
    setInputValue(chosenItem);
    setIsOpen(false);
  };

  return (
    <Box style={{ position: "relative", marginTop: "10px" }}>
      <InputNameWrapper>
        <InputName text={"From"} />
      </InputNameWrapper>
      <InputWrapper>
        <MainInfoWrapper>
          <IconsLoader iconName={inputValue.imageName} />
          <SubHeader text={inputValue.name} />
          <StyledDivider />
          <AmountBlue text={`$${inputValue.total_usd_balance}`} />
        </MainInfoWrapper>
        <ArrowButtons isActive={!isOpen} onClick={handleOnClick} />
      </InputWrapper>
      {isOpen && (
        <StyledMenuWrapper>
          {wallets.map((item) => (
            <ItemMenuWrapper
              key={item.id}
              id={item.id}
              onClick={handleChosenOnClick}
            >
              <MainInfoWrapper>
                <SubHeader text={item.name} />
                <StyledDivider />
                <AmountBlue text={`$${item.total_usd_balance}`} />
              </MainInfoWrapper>
              {inputValue.name === item.name && (
                <StyledCheckButton>
                  <CheckCircleOutlineIcon />
                </StyledCheckButton>
              )}
            </ItemMenuWrapper>
          ))}
        </StyledMenuWrapper>
      )}
    </Box>
  );
};
