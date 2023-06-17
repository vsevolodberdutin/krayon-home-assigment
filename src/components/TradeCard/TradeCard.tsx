import React, { useEffect, useState } from "react";

import { Box, Stack, styled } from "@mui/material";
import {
  SubmitButton,
  CrossButton,
  SwapButton,
} from "../../uiElements/customButtons/CustomButtons";
import { Header } from "../../uiElements/typography/CustomTypography";
import { WalletSelect } from "../../uiElements/customInputs/CustomInputs";
import { PayCoin, ReceiveCoin } from "../../uiElements/customInputs/SelectCoin";
import data from "../../data/wallets.json";
import dataPrices from "../../data/prices.json";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const StyledCard = styled(Box)({
  width: "600px",
  minHeight: "430px",
  borderRadius: "26px",
  boxShadow: "none",
  padding: "40px 40px ",
  marginBottom: "20px",
  backgroundColor: "white",
});
const SwapWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "25px 0 30px",
});
const SubmitButtonWrapper = styled(Box)({
  display: "flex",
  justifyContent: "right",
});

const wallets = data.wallets;
const prices = dataPrices.prices;

export const TradeCard = () => {
  const [wallet_id, setWallet_id] = useState(wallets[0].id);
  const [wallet_assets, setWallet_assets] = useState(wallets[0].assets);
  const [pay_coin_id, setPay_coin_id] = useState("");
  const [pay_coin_amount, setPay_coin_amount] = useState("");
  const [receive_coin_id, setReceive_coin_id] = useState(prices[0].id);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    setIsDisabled(!pay_coin_amount);
  }, [pay_coin_amount]);
  useEffect(() => {
    setPay_coin_id("");
    setPay_coin_amount("");
  }, [wallet_id]);

  const handleFormData = (data: any) => {
    setWallet_id(data?.id);

    const updatedAssets = wallets.filter((item) => item.id === data?.id)[0]
      ?.assets;
    setWallet_assets(updatedAssets);
  };
  const handlePayData: any = (data: any) => {
    setPay_coin_id(data.payId);
    setPay_coin_amount(data.payAmount);
  };
  const handleReceiveData: any = (data: any) => {
    setReceive_coin_id(data.receiveId);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const submitedData = {
      wallet_id: wallet_id,
      pay_coin_id: pay_coin_id,
      pay_coin_amount: pay_coin_amount,
      receive_coin_id: receive_coin_id,
    };
    const submitedDataAsJson = JSON.stringify(submitedData);
    // log submitted data. prepared.
    console.log("submitedDataAsJson", submitedDataAsJson);
    //
    setWallet_id(wallets[0].id);
    setPay_coin_id("");
    setPay_coin_amount("");
    setReceive_coin_id(prices[0].id);
    setIsSubmit(true);
  };
  const crossOnClick = () => {
    setIsSubmit(false)
  };

  return (
    <>
      {!isSubmit ? (
        <StyledCard>
          <Stack>
            <CrossButton onClick={crossOnClick}/>
            <form onSubmit={handleSubmit}>
              <Header text="Trade" />
              <WalletSelect onChangeFormData={handleFormData} />
              <SwapWrapper>
                <PayCoin
                  wallet_assets={wallet_assets}
                  pay_coin_id={pay_coin_id}
                  pay_coin_amount={pay_coin_amount}
                  onChange={handlePayData}
                />
                <SwapButton />
                <ReceiveCoin
                  receive_coin_id={receive_coin_id}
                  pay_coin_id={pay_coin_id}
                  pay_coin_amount={pay_coin_amount}
                  onChange={handleReceiveData}
                />
              </SwapWrapper>
              <SubmitButtonWrapper>
                <SubmitButton
                  name={"Submit"}
                  onClick={handleSubmit}
                  disabled={isDisabled}
                />
              </SubmitButtonWrapper>
            </form>
          </Stack>
        </StyledCard>
      ) : (
        <StyledCard>
          <Stack>
            <CrossButton onClick={crossOnClick}/>
            <Stack
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "350px",
              }}
            >
              <Header text="Submission successful" />
              <ThumbUpIcon
                style={{
                  width: "90px",
                  height: "90px",
                  color: "#5c9dff",
                  margin: "40px",
                }}
              />
            </Stack>
          </Stack>
        </StyledCard>
      )}
    </>
  );
};
