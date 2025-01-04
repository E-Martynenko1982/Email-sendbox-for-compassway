import { Box } from "@mui/material";
import styled from "styled-components";

export const TextEditorWrapper = styled(Box)`
  position: relative;
  box-sizing: border-box;
`;

export const TextEditorTitle = styled(Box)`
  opacity: 0.5;
  color: #000;
  margin-bottom: 4px;
`;

export const TextEditorArea = styled(Box)`
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #ccc;

  &.TextEditor-Area__isFocused {
    border: 1px solid #000;
  }

  &.TextEditor-Area__isInvalid {
    border: 1px solid red;
  }
`;

export const TextEditorSub = styled(Box)`
  display: flex;
  gap: 8px;
  box-sizing: border-box;
  padding: 16px;
  border-top: 1px solid #ccc;
  color: #000;
`;
