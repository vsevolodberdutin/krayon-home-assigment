import React from "react";

import { styled } from "@mui/material/styles";
import ActiveTradingImg from "../../assets/images/wallets/img2.png";
import ShitcoinsImg from "../../assets/images/wallets/img1.png";
import ContractorPaymentsImg from "../../assets/images/wallets/img3.png";
import SalaryPaymentsImg from "../../assets/images/wallets/img4.png";

const StyledImg = styled("img")({
  height: "25px",
  marginRight: "10px",
});

interface IconProps {
  iconName: string;
}

export const IconsLoader: React.FC<IconProps> = ({ iconName }) => {
  return (
    <>
      {iconName === "ActiveTradingImg" && <StyledImg src={ActiveTradingImg} />}
      {iconName === "ShitcoinsImg" && <StyledImg src={ShitcoinsImg} />}
      {iconName === "ContractorPaymentsImg" && (
        <StyledImg src={ContractorPaymentsImg} />
      )}
      {iconName === "SalaryPaymentsImg" && (
        <StyledImg src={SalaryPaymentsImg} />
      )}
    </>
  );
};
