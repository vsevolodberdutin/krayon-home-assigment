import React from "react";

import { GlobalWrapper } from "../../styles/styles";
import { TradeCard } from "../../components/TradeCard";
import styled from "styled-components";
import { Link, Typography } from "@mui/material";

const StyledCaption = styled(Typography)({
  fontFamily: "Montserrat",
  color: "#aaaeb2",
  fontWeight: 500,
  fontSize: "12px",
});
const StyledLink = styled(Link)({
  padding: "0 5px",
  fontFamily: "Montserrat",
  fontWeight: 500,
  fontSize: "12px",
});

export const HomePage = () => {
  return (
    <GlobalWrapper>
      <TradeCard />
      <StyledCaption>
        Home assigment realisation from
        <StyledLink
          href="https://www.linkedin.com/in/0538521948/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vsevolod Berdutin
        </StyledLink>
      </StyledCaption>
    </GlobalWrapper>
  );
};
