import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { ButtonGroup } from "@mui/material";
import * as Styled from './index.styled';
import { Props } from "./types";

const RichTextEditor: React.FC<Props> = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    if (value) {
      try {
        const raw = JSON.parse(value);
        const content = convertFromRaw(raw);
        return EditorState.createWithContent(content);
      } catch {
        return EditorState.createEmpty();
      }
    } else {
      return EditorState.createEmpty();
    }
  });

  const handleChange = (newEditorState: EditorState) => {
    console.log("Editor State Changed");
    setEditorState(newEditorState);
    const content = newEditorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    console.log("Raw Content:", rawContent);
    onChange(JSON.stringify(rawContent));
  };

  const handleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "5px", height: '132px' }}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Styled.ButtonEditor type="button" onClick={handleBold}>
          Bold
        </Styled.ButtonEditor>
        <Styled.ButtonEditor type="button" onClick={handleItalic}>
          Italic
        </Styled.ButtonEditor>
        <Styled.ButtonEditor type="button" onClick={handleUnderline}>
          Underline
        </Styled.ButtonEditor>
      </ButtonGroup>
      <Editor editorState={editorState} onChange={handleChange} />
    </div>
  );
};

export default RichTextEditor;

