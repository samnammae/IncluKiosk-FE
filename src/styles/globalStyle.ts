import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
      --main-color: #1E40AF;  
      --sub-color: #6c757d;    
      --text-color: #212529;  
      --disabled-color:#d1d5db;
    }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-user-select:none;
    -moz-user-select:none;      
    -ms-user-select:none;
    user-select:none; 
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  input {
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;
