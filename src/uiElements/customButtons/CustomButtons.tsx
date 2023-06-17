import React from "react";

import { Box, Button, IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const StyledSubmitButton = styled(Button)({
  fontFamily: "Montserrat",
  fontSize: ".875rem",
  fontWeight: 600,
  color: "#ffffff",
  borderRadius: "1rem",
  backgroundColor: "#2980ff",
  padding: "13px 26px",
  width: "fit-content",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#5c9dff",
  },
});

const StyledMaxButton = styled(StyledSubmitButton)({
  fontSize: "10px",
  padding: "2px 0",
  marginRight: "-10px",
  minWidth: "50px",
  borderRadius: "10px",
});

const CrossButtonWrapper = styled(Box)({
  display: "flex",
  justifyContent: "right",
});
const StyledCrossButton = styled(IconButton)({
  margin: "-25px -30px 0",
  color: "black",
});
const StyledArrowButton = styled(IconButton)({
  width: "40px",
  margin: "0 -14px",
});
const CrossSwapWrapper = styled(Box)({
  width: "40px",
  height: "40px",
  backgroundColor: "#f2f2f2",
  borderRadius: "1rem",
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
});
const StyledSwapButton = styled(IconButton)({});

interface ButtonProps {
  name?: string;
  isActive?: boolean;
  onClick?: any;
  disabled?: boolean;
}

export const SubmitButton: React.FC<ButtonProps> = ({
  name,
  onClick,
  disabled,
}) => {
  return (
    <>
      {disabled ? (
        <StyledSubmitButton type="submit" disabled={disabled} style={{backgroundColor:'lightgray'}}>
          {name}
        </StyledSubmitButton>
      ) : (
        <StyledSubmitButton type="submit" onClick={onClick} >
          {name}
        </StyledSubmitButton>
      )}
    </>
  );
};

export const MaxButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <StyledMaxButton onClick={onClick} type="button">
      Max
    </StyledMaxButton>
  );
};
export const CrossButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <CrossButtonWrapper>
      <StyledCrossButton onClick={onClick} >
        <CloseIcon style={{ width: "30px", height: "30px" }} />
      </StyledCrossButton>
    </CrossButtonWrapper>
  );
};
export const ArrowButtons: React.FC<any> = ({ isActive, onClick }) => {
  return (
    <CrossButtonWrapper>
      <StyledArrowButton onClick={onClick}>
        {isActive ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </StyledArrowButton>
    </CrossButtonWrapper>
  );
};
export const SwapButton: React.FC<ButtonProps> = () => {
  return (
    <CrossSwapWrapper>
      <StyledSwapButton>
        <SwapHorizIcon style={{ width: "30px", height: "30px" }} />
      </StyledSwapButton>
    </CrossSwapWrapper>
  );
};
