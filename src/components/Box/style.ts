// @ts-nocheck

import styled from "styled-components";

const BoxStyled = styled.div`
  display: ${({ display, $span, hidden }) =>
    hidden ? "none" : display ? display : $span && "inline-block"};
  background-color: ${({ bgc }) => bgc};
  background-size: ${({ bgs }) => bgs};
  background-image: ${({ bgi }) => (bgi?.src ? `url(${bgi?.src})` : bgi)};
  background-position: ${({ bgp }) => bgp};
  background-repeat: ${({ bgr }) => bgr};
  color: ${({ color }) => color};
  border-radius: ${({ borderRadius }) => borderRadius};
  cursor: ${({ pointer, cursor }) => (pointer ? "pointer" : cursor)};
  border: ${({ b }) => b};
  border-bottom: ${({ bb }) => bb};
  border-top: ${({ bt }) => bt};
  border-right: ${({ br }) => br};
  border-left: ${({ bl }) => bl};
  height: ${({ h }) => h};
  max-width: ${({ maxW }) => maxW};
  max-height: ${({ maxH }) => maxH};
  min-width: ${({ minW }) => minW};
  min-height: ${({ minH }) => minH};
  filter: ${({ filter }) => filter};
  zoom: ${({ zoom }) => zoom};
  flex: ${({ flex }) => flex};
  overflow: ${({ overflow }) => overflow};
  overflow-x: ${({ overflowX }) => overflowX};
  overflow-y: ${({ overflowY }) => overflowY};
  text-align: ${({ textAlign }) => textAlign};
  visibility: ${({ visibility }) => visibility};
  transition: ${({ transition }) => transition};
  transform: ${({ transform }) => transform};
  transform-origin: ${({ transformOrigin }) => transformOrigin};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  opacity: ${({ opacity }) => opacity};
  clip-path: ${({ clipPath }) => clipPath};
  box-shadow: ${({ boxShadow, shadow2 }) =>
    boxShadow || shadow2 ? "0px 4px 16px rgba(0, 0, 0, 0.16)" : ""};
  filter: ${({ filter }) => filter};
  z-index: ${({ zIndex }) => zIndex};
  letter-spacing: ${({ ls }) => ls};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fz }) => fz};
  font-weight: ${({ fw }) => fw};
  user-select: ${({ noSelect }) => noSelect && "none"};

  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  column-gap: ${({ columnGap }) => columnGap};
  grid-row-gap: ${({ rowGap }) => rowGap};
  grid-gap: ${({ gridGap }) => gridGap};
  grid-column-start: ${({ gridColumnStart }) => gridColumnStart};
  grid-column-end: ${({ gridColumnEnd }) => gridColumnEnd};

  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  align-self: ${({ alignSelf }) => alignSelf};
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  flex-basis: ${({ flexBasis }) => flexBasis};
  flex-grow: ${({ flexGrow }) => flexGrow};
  gap: ${({ gap }) => gap};
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  margin: ${({ m }) => m};
  padding: ${({ p }) => p};
`;

BoxStyled.defaultProps = {
  m: 0,
  p: null,
  display: "block",
  hidden: false,
};

export default BoxStyled;
