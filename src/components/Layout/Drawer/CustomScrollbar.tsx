import styled from "styled-components";

const CustomScrollbar = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100%;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #e8edf7; 
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2196f3;
    border-radius: 10px;
    border: 2px solid #e8edf7;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #1e88e5;
  }
`;

export default CustomScrollbar;