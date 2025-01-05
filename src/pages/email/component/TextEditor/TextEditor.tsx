import clsx from "clsx";
import { Editor, RichUtils, ContentBlock } from "draft-js";
import { memo, FC } from "react";
import { BlockStyleControls } from "./BlockStyleControls";
import { InlineStyleControls } from "./InlineStyleControls";
import { useTextEditor } from "./hooks/useTextEditor";
import { TEXT_EDITOR_CUSTOM_STYLES } from "./constants";
import * as Styled from "./index.style";
import "./styles.scss";
import "draft-js/dist/Draft.css";

type TClasses = {
  textEditor?: string;
};

type TProps = {
  classes?: TClasses;
  htmlText?: string;
  isInvalid?: boolean;
  onChangeHTMLText?: (value: string) => void;
  placeholder?: string;
  title?: string;
};

const TextEditorComponent: FC<TProps> = ({
  classes,
  htmlText,
  isInvalid = false,
  onChangeHTMLText,
  placeholder,
  title,
}) => {
  const {
    editorState,
    isFocused,
    handleChangeBlur,
    handleChangeFocus,
    handleChangeText,
    handleKeyCommand,
    setEditorState,
  } = useTextEditor(htmlText, onChangeHTMLText);

  let wrapperClassName = "TextEditor-Wrapper";
  const contentState = editorState.getCurrentContent();

  if (
    !contentState.hasText() &&
    contentState.getBlockMap().first().getType() !== "unstyled"
  ) {
    wrapperClassName += " TextEditor-Wrapper__hidePlaceholder";
  }

  const getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "";
    }
  };

  return (
    <Styled.TextEditorWrapper className={clsx("TextEditor", classes?.textEditor)}>
      <Styled.TextEditorTitle>{title}</Styled.TextEditorTitle>
      <Styled.TextEditorArea
        className={clsx({
          "TextEditor-Area__isFocused": isFocused || contentState.hasText(),
          "TextEditor-Area__isInvalid": isInvalid,
        })}
        onClick={handleChangeFocus}
      >
        <div className={wrapperClassName}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onBlur={handleChangeBlur}
            onChange={handleChangeText}
            placeholder={placeholder}
          />
        </div>
        <Styled.TextEditorSub>
          <BlockStyleControls
            editorState={editorState}
            onToggle={(blockType) => {
              const newState = RichUtils.toggleBlockType(editorState, blockType);
              setEditorState(newState);
            }}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={(inlineStyle) => {
              const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
              setEditorState(newState);
            }}
          />
        </Styled.TextEditorSub>
      </Styled.TextEditorArea>
    </Styled.TextEditorWrapper>
  );
};

export const TextEditor = memo(TextEditorComponent);