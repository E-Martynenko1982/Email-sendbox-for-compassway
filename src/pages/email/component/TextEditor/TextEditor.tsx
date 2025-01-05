import clsx from "clsx";
import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  ContentBlock,
} from "draft-js";
import {
  convertToHTML,
  convertFromHTML,

} from "draft-convert";
import { memo, useCallback, useEffect, useState } from "react";
import type { FC } from "react";
import { BlockStyleControls } from "./BlockStyleControls";
import {
  TEXT_EDITOR_CUSTOM_STYLES,
  TEXT_EDITOR_STYLE_TO_HTML,
} from "./constants";
import { InlineStyleControls } from "./InlineStyleControls";
import type { TTextEditorTextStyle } from "./types";
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
  const [isFocused, setFocused] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );


  let wrapperClassName = "TextEditor-Wrapper";
  const contentState = editorState.getCurrentContent();


  if (
    !contentState.hasText() &&
    contentState.getBlockMap().first().getType() !== "unstyled"
  ) {
    wrapperClassName += " TextEditor-Wrapper__hidePlaceholder";
  }


  const options = {
    styleToHTML: (style: string) =>
      TEXT_EDITOR_STYLE_TO_HTML(style as TTextEditorTextStyle),
  };
  const convertMessageToHtml = convertToHTML(options);


  const convertHtmlToRaw = (html: string): EditorState => {
    const contentStateFromHtml = convertFromHTML({
      htmlToStyle: (nodeName, node, currentStyle) => {

        if (nodeName === "span" && node.className === "highlight") {
          return currentStyle.add("HIGHLIGHT");
        }
        return currentStyle;
      },
    })(html);

    return EditorState.createWithContent(contentStateFromHtml);
  };


  useEffect(() => {
    if (htmlText) {

      setEditorState(convertHtmlToRaw(htmlText));
    }
  }, [htmlText]);

  const handleChangeBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const handleChangeFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleChangeText = useCallback(
    (value: EditorState) => {
      const currentSelection = value.getSelection();

      onChangeHTMLText?.(convertMessageToHtml(value.getCurrentContent()));

      const stateWithContentAndSelection = EditorState.forceSelection(
        value,
        currentSelection
      );
      setEditorState(stateWithContentAndSelection);
    },
    [onChangeHTMLText, convertMessageToHtml]
  );


  const handleKeyCommand = useCallback(
    (command: DraftEditorCommand, newEditorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(newEditorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    []
  );


  const getBlockStyle = useCallback((block: ContentBlock): string => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:

        return "";
    }
  }, []);

  return (
    <Styled.TextEditorWrapper className={clsx("TextEditor", classes?.textEditor)}>
      <Styled.TextEditorTitle>{title}</Styled.TextEditorTitle>
      <Styled.TextEditorArea
        className={clsx({
          TextEditorArea__isFocused: isFocused || contentState.hasText(),
          TextEditorArea__isInvalid: isInvalid,
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
            textAlignment="left"
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
              const newState = RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
              );
              setEditorState(newState);
            }}
          />
        </Styled.TextEditorSub>
      </Styled.TextEditorArea>
    </Styled.TextEditorWrapper>
  );
};

export const TextEditor = memo(TextEditorComponent);
