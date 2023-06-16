import React, { useState } from "react";

import { Box, Stack, styled } from "@mui/material";
import {
  SubmitButton,
  CrossButton,
  SwapButton,
} from "../../uiElements/customButtons/CustomButtons";
import { Header } from "../../uiElements/typography/CustomTypography";
import { WalletSelect } from "../../uiElements/customInputs/CustomInputs";
import { PayCoin, ReceiveCoin } from "../../uiElements/customInputs/SelectCoin";

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

export const TradeCard = () => {
  const [formData, setFormData] = useState({
    wallet_id: "",
    pay_coin_id: "",
    pay_coin_amount: "",
    receive_coin_id: "",
  });
  console.log("export_data", formData);

  const handleOnChange = ({ data }: any) => {
    setFormData(data);
  };

  return (
    <StyledCard>
      <Stack>
        <CrossButton />
        <Header text="Trade" />
        <WalletSelect onChange={handleOnChange} />
        <SwapWrapper>
          <PayCoin />
          <SwapButton />
          <ReceiveCoin />
        </SwapWrapper>
        <SubmitButtonWrapper>
          <SubmitButton name={"Submit"} />
        </SubmitButtonWrapper>
      </Stack>
    </StyledCard>
  );
};
