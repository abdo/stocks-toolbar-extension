import React, { CSSProperties } from "react";
import styled from "styled-components";

interface TagProps {
  color?: string;
  closable?: boolean;
  onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  style?: CSSProperties;
  children: React.ReactNode;
}

const TagContainer = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0 7px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background: ${({ $color }) => $color || "#fafafa"};
  border-radius: 4px;
  border: 1px solid ${({ $color }) => ($color ? "transparent" : "#d9d9d9")};
  color: ${({ $color }) => ($color ? "#fff" : "rgba(0, 0, 0, 0.88)")};
  transition: all 0.2s;
`;

const CloseButton = styled.span`
  display: inline-flex;
  align-items: center;
  color: inherit;
  margin-left: 4px;
  font-size: 10px;
  cursor: pointer;
  opacity: 0.65;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::after {
    content: "×";
  }
`;

const Tag: React.FC<TagProps> = ({
  color,
  closable,
  onClose,
  style,
  children,
}) => {
  const handleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose?.(e);
  };

  return (
    <TagContainer $color={color} style={style}>
      {children}
      {closable && <CloseButton onClick={handleClose} />}
    </TagContainer>
  );
};

export default Tag;
