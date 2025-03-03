import React, { PropsWithChildren } from "react";
import { StyledLink } from "./style";

interface LinkProps {
  href?: string;
  target?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Link: React.FC<PropsWithChildren<LinkProps>> = ({
  href,
  target,
  onClick,
  children,
  className,
  style,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href) {
      e.preventDefault();
    }
    onClick?.(e);
  };

  return (
    <StyledLink
      href={href || "#"}
      target={target}
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
