import type { FC } from "react";
import * as Styled from './index.style';

type TProps = {
  isactive?: boolean;
  onToggle: (style: string) => void;
  size?: string;
  style: string;
  typeIcon: string;
};

export const FormatButton: FC<TProps> = ({ isactive, onToggle, style, typeIcon }) => {
  return (
    <Styled.FormatButtonWrapper
      className="FormatButton"
      onMouseDown={(event) => {
        event.preventDefault();
        onToggle?.(style);
      }}
    >
      <Styled.IconButton data-isactive={isactive}>{typeIcon}</Styled.IconButton>
    </Styled.FormatButtonWrapper>
  );
};

