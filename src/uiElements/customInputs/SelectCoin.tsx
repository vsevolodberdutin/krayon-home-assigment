import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { Box, Stack, TextField } from "@mui/material";
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

interface PayInputProps {
  wallet_assets: any;
  onChange: any;
  pay_coin_id: string;
  pay_coin_amount: string;
}
interface AssetsItemProps {
  id: string;
  logo: string;
  symbol: string;
  balance: string;
}

interface ChosenItemProps {
  [x: string]: any;
  symbol: any;
}

// component
export const PayCoin: React.FC<PayInputProps> = ({
  wallet_assets,
  onChange,
  pay_coin_id,
  pay_coin_amount,
}) => {
  const activeCoin = wallet_assets[0];
  const [isOpen, setIsOpen] = useState(false);

  const [payId, setPayId] = useState<string>(wallet_assets[0].id);
  const [payAmount, setPayAmount] = useState<string>(pay_coin_amount);

  const initiateItem = {
    pay_coin_id: pay_coin_id,
    pay_coin_amount: payAmount,
    symbol: activeCoin.symbol,
    balance: activeCoin.balance,
    logo: activeCoin.logo,
  };

  const [inputValue, setInputValue] = useState(initiateItem);

  useEffect(() => {
    onChange({ payId, payAmount });
  }, [payId, payAmount]);

  useEffect(() => {
    setInputValue(initiateItem);
    setPayAmount("");
  }, [activeCoin]);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };
  const handleMaxOnClick = () => {
    setPayAmount(inputValue.balance);
  };

  const handleChosenOnClick = (event: any) => {
    event.preventDefault();

    const chosenItem = wallet_assets.filter((item: ChosenItemProps) =>
      event.target.className.includes(item.id)
    )[0];
    setInputValue(chosenItem);
    setPayId(chosenItem.id);
    setIsOpen(false);
    setPayAmount("");
    onChange({ payId, payAmount });
  };

  const handleChange = (event: { target: { value: string } }) => {
    const newValue = event.target.value;
    setPayAmount(newValue);
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
          value={payAmount}
          placeholder="0"
          variant="standard"
          onChange={handleChange}
        />
        <MaxButton onClick={handleMaxOnClick} />
      </FooterSelectWrapper>
      {isOpen && (
        <StyledMenuWrapper>
          {wallet_assets.map((item: AssetsItemProps) => (
            <ItemMenuWrapper
              key={item.id}
              className={item.id}
              onClick={handleChosenOnClick}
            >
              <MainInfoWrapper>
                <StyledImg
                  className={item.id}
                  src={item.logo}
                  style={{ width: "16px", height: "16px" }}
                />
                <SubHeader className={item.id} text={item.symbol} />
              </MainInfoWrapper>
              <SubHeader
                className={item.id}
                text={item.balance}
                style={{ fontSize: "12px" }}
              />
            </ItemMenuWrapper>
          ))}
        </StyledMenuWrapper>
      )}
    </Box>
  );
};

//
//
//
// RECEIVE COMPONENT
//
interface ReceiveInputProps {
  receive_coin_id: string;
  onChange: any;
  pay_coin_id: string;
  pay_coin_amount: string;
}
interface ReceiveChosenProps {
  [x: string]: any;
  preventDefault: () => void;
}

export const ReceiveCoin: React.FC<ReceiveInputProps> = ({
  receive_coin_id,
  pay_coin_id,
  pay_coin_amount,
  onChange,
}) => {
  const prices = dataPrices.prices;

  const [receiveId, setReceiveId] = useState<string>(receive_coin_id);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    symbol: prices[0]?.symbol,
    logo: prices[0]?.logo,
  });
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    onChange({receiveId});

    const chosenItem = prices.filter((item) => item.id === receive_coin_id);
    const actualMarketValue = chosenItem[0].price ? parseFloat(chosenItem[0].price.replace(",", "")) : 0;
    const payAmountNum = pay_coin_amount ? parseFloat(pay_coin_amount.replace(",", "")) : 0;
    const resultPrice = actualMarketValue * payAmountNum ;
    setValue(resultPrice.toString());

  }, [inputValue, receiveId, receive_coin_id, pay_coin_amount]);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChosenOnClick = (event: ReceiveChosenProps) => {
    event.preventDefault();
    const chosenItem = prices.filter(
      (item) => event.target.innerText === item.symbol
    )[0];

    setInputValue(chosenItem);
    setReceiveId(chosenItem.id);
    setIsOpen(false);
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
