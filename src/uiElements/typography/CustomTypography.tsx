import React from "react";
import { styled, Typography } from "@mui/material";

const StyledHeader = styled(Typography)({
  fontFamily: "Montserrat",
  color: "#000000",
  fontWeight: 600,
  fontSize: "28px",
});
const StyledSubHeader = styled(StyledHeader)({
  fontSize: "16px",
});
const StyledAmountBlue = styled(StyledSubHeader)({
  color: "#2980ff",
});
const StyledInputName = styled(StyledHeader)({
  color: "#aaaeb2",
  fontWeight: 600,
  fontSize: "13px",
});

interface textProps {
  text: string;
  style?: any;
  className?: any;
}

export const Header = ({ text }: textProps) => {
  return <StyledHeader>{text}</StyledHeader>;
};
export const SubHeader = ({ text, style, className }: textProps) => {
  return <StyledSubHeader className={className} style={style}>{text}</StyledSubHeader>;
};
export const AmountBlue = ({ text }: textProps) => {
  return <StyledAmountBlue>{text}</StyledAmountBlue>;
};
export const InputName = ({ text }: textProps) => {
  return <StyledInputName>{text}</StyledInputName>;
};
