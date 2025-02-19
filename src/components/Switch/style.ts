import styled from "styled-components";

export const SwitchContainer = styled.div`
  display: block;
  margin: 10px 0;
  position: relative;

  #toggleSwitch {
    display: none;
  }

  .toggleSwitch {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 80px;
    height: 40px;
    background-color: rgb(199, 199, 199);
    border-radius: 20px;
    cursor: pointer;
    transition-duration: 0.3s;

    &::before {
      content: "OFF";
      position: absolute;
      right: 10px;
      color: #666;
      font-size: 12px;
      font-weight: bold;
      z-index: 1;
    }

    &::after {
      content: "";
      position: absolute;
      height: 40px;
      width: 40px;
      left: 0px;
      background: conic-gradient(
        rgb(104, 104, 104),
        white,
        rgb(104, 104, 104),
        white,
        rgb(104, 104, 104)
      );
      border-radius: 50%;
      transition-duration: 0.3s;
      box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.308);
    }
  }

  #toggleSwitch:checked + .toggleSwitch {
    background-color: rgb(153, 197, 151);
    transition-duration: 0.3s;

    &::before {
      content: "ON";
      left: 10px;
      right: auto;
      color: #fff;
    }

    &::after {
      transform: translateX(100%);
      transition-duration: 0.3s;
    }
  }
`;
