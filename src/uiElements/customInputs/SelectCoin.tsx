import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import { Box, Stack, TextField } from "@mui/material";
import dataWallets from "../../data/wallets.json";
import dataPrices from "../../data/prices.json";

import { ArrowButtons, MaxButton } from "../customButtons/CustomButtons";
import { InputName, SubHeader } from "../typography/CustomTypography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const HeaderSelectWrapper = styled(Box)({
  width: "220px",
  height: "50px",
  backgroundColor: "#f2f2f2",
  border: "1px #f2f2f2 solid",
  borderRadius: "20px 20px 0px 0px ",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingInline: "25px",
  position: "relative",
  zIndex: "2",
});
const FooterSelectWrapper = styled(Box)({
  width: "220px",
  height: "50px",
  border: "1px #f2f2f2 solid",
  borderRadius: "0px 0px 20px 20px  ",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingInline: "25px",
  position: "relative",
  zIndex: "0",
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
  backgroundColor: "#fafafa",
  padding: "20px 0",
  borderRadius: "0px 0px 20px 20px",
  position: "absolute",
  width: "220px",
  top: "60px",
  zIndex: "1",
});

const StyledCheckButton = styled(Box)({
  margin: "0 -10px",
  color: "#2980ff",
});

const StyledImg = styled("img")({
  height: "25px",
  marginRight: "10px",
});
const StyledInput = styled(TextField)`
  .MuiInputBase-input[type="number"]::-webkit-inner-spin-button,
  .MuiInputBase-input[type="number"]::-webkit-outer-spin-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
  }
  .css-1x51dt5-MuiInputBase-input-MuiInput-input {
    font-weight: 600;
  }
  .css-v4u5dn-MuiInputBase-root-MuiInput-root:before,
  .css-v4u5dn-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before,
  .css-v4u5dn-MuiInputBase-root-MuiInput-root:after {
    border: none;
    border-bottom: none;
  }
`;

interface ButtonProps {
  name?: string;
}

export const PayCoin: React.FC<ButtonProps> = () => {
  const coins = dataWallets.wallets[0].assets;

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    symbol: coins[0].symbol,
    balance: coins[0].balance,
    logo: coins[0].logo,
  });
  const [value, setValue] = useState<string>("");

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };
  const handleMaxOnClick = () => {
    setValue(inputValue.balance);
  };

  const handleChosenOnClick = (event: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    const chosenItem = coins.filter((item) =>
      event.target.innerText.includes(item.symbol)
    )[0];
    setInputValue(chosenItem);
    setIsOpen(false);
    setValue("");
  };

  // const handleSubmit = (event: { preventDefault: () => void }) => {
  //   event.preventDefault();
  //   const formDataAsJson = JSON.stringify(inputValue);
  //   console.log(formDataAsJson);
  // };

  const handleChange = (event: { target: { value: string } }) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <Box style={{ position: "relative" }}>
      <InputNameWrapper>
        <InputName text={"You pay"} />
      </InputNameWrapper>
      <HeaderSelectWrapper>
        <MainInfoWrapper>
          <StyledImg src={inputValue.logo} />
          <SubHeader text={inputValue.symbol} />
        </MainInfoWrapper>
        <ArrowButtons isActive={!isOpen} onClick={handleOnClick} />
      </HeaderSelectWrapper>
      <FooterSelectWrapper>
        <StyledInput
          type="number"
          value={value}
          placeholder="0"
          variant="standard"
          onChange={handleChange}
        />
        <MaxButton onClick={handleMaxOnClick} />
      </FooterSelectWrapper>
      {isOpen && (
        <StyledMenuWrapper>
          {coins.map((item) => (
            <ItemMenuWrapper
              key={item.id}
              id={item.id}
              onClick={handleChosenOnClick}
            >
              <MainInfoWrapper>
                <StyledImg
                  src={item.logo}
                  style={{ width: "16px", height: "16px" }}
                />
                <SubHeader text={item.symbol} />
              </MainInfoWrapper>
              <SubHeader text={item.balance} style={{ fontSize: "12px" }} />
            </ItemMenuWrapper>
          ))}
        </StyledMenuWrapper>
      )}
    </Box>
  );
};

export const ReceiveCoin: React.FC<ButtonProps> = () => {
  const prices = dataPrices.prices;

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    symbol: prices[0]?.symbol,
    logo: prices[0]?.logo,
  });
  const [value, setValue] = useState<string>("");

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChosenOnClick = (event: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    const chosenItem = prices.filter(
      (item) => event.target.innerText === item.symbol
    )[0];
    setInputValue(chosenItem);
    setIsOpen(false);
    setValue("");
  };

  // const handleSubmit = (event: { preventDefault: () => void }) => {
  //   event.preventDefault();
  //   const formDataAsJson = JSON.stringify(inputValue);
  //   console.log(formDataAsJson);
  // };

  const handleAmountChange = (event: { target: { value: string } }) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <Box style={{ position: "relative" }}>
      <InputNameWrapper>
        <InputName text={"You receive"} />
      </InputNameWrapper>
      <HeaderSelectWrapper>
        <MainInfoWrapper>
          <StyledImg src={inputValue.logo} />
          <SubHeader text={inputValue.symbol} />
        </MainInfoWrapper>
        <ArrowButtons isActive={!isOpen} onClick={handleOnClick} />
      </HeaderSelectWrapper>
      <FooterSelectWrapper>
        <StyledInput
          type="number"
          value={value}
          placeholder="0"
          variant="standard"
          onChange={handleAmountChange}
        />
      </FooterSelectWrapper>
      {isOpen && (
        <StyledMenuWrapper>
          {prices.map((item) => (
            <ItemMenuWrapper
              key={item.id}
              id={item.id}
              onClick={handleChosenOnClick}
            >
              <MainInfoWrapper>
                <StyledImg
                  src={item?.logo}
                  style={{ width: "16px", height: "16px" }}
                />
                <SubHeader text={item.symbol} />
              </MainInfoWrapper>
              {inputValue.symbol === item.symbol && (
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
