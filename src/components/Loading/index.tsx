import React from "react";
import { LoadingContainer } from "./style";

const Loading = () => {
  return (
    <LoadingContainer className="loader">
      <div className="loader__bar"></div>
      <div className="loader__bar"></div>
      <div className="loader__bar"></div>
      <div className="loader__bar"></div>
      <div className="loader__bar"></div>
      <div className="loader__ball"></div>
    </LoadingContainer>
  );
};

export default Loading;
