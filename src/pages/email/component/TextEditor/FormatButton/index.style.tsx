import { Box, Button } from "@mui/material";
import styled from "styled-components";

export const FormatButtonWrapper = styled(Box)`
  display: inline-block;
  cursor: pointer;
`;

export const IconButton = styled(Button) <{ isactive?: boolean }>`
  padding: 8px;
  background-color: ${({ isactive }) => (isactive ? "#ddd" : "transparent")};
  border: none;
  cursor: pointer;
`;
