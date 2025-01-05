import { useState, useCallback, useEffect } from "react";
import { EditorState, RichUtils, DraftEditorCommand } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import { TEXT_EDITOR_STYLE_TO_HTML } from "../constants";
import type { TTextEditorTextStyle } from "../types";

export const useTextEditor = (
	htmlText?: string,
	onChangeHTMLText?: (value: string) => void
) => {
	const [editorState, setEditorState] = useState<EditorState>(
		EditorState.createEmpty()
	);
	const [isFocused, setFocused] = useState(false);

	const options = {
		styleToHTML: (style: string) =>
			TEXT_EDITOR_STYLE_TO_HTML(style as TTextEditorTextStyle),
	};
	const convertMessageToHtml = convertToHTML(options);

	const convertHtmlToRaw = (html: string): EditorState => {
		const contentState = convertFromHTML({
			htmlToStyle: (nodeName, node, currentStyle) => {
				if (nodeName === "span" && node.className === "highlight") {
					return currentStyle.add("HIGHLIGHT");
				}
				return currentStyle;
			},
		})(html);

		return EditorState.createWithContent(contentState);
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
			onChangeHTMLText?.(convertMessageToHtml(value.getCurrentContent()));
			setEditorState(value);
		},
		[onChangeHTMLText, convertMessageToHtml]
	);

	const handleKeyCommand = useCallback(
		(command: DraftEditorCommand, currentEditorState: EditorState) => {
			const newState = RichUtils.handleKeyCommand(currentEditorState, command);
			if (newState) {
				setEditorState(newState);
				return "handled";
			}
			return "not-handled";
		},
		[]
	);

	return {
		editorState,
		isFocused,
		handleChangeBlur,
		handleChangeFocus,
		handleChangeText,
		handleKeyCommand,
		setEditorState,
	};
};
