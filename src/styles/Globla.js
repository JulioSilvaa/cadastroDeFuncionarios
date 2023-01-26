import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin:0 ;
    padding:0 ;
    box-sizing: border-box;
    font-family:sans-serif;
  }
 body  {
    background: ${({ theme }) => theme.colors.body};
    width: 100%;
    font-size: 1.15em;

  }
form{
  margin: 50px auto;
}
`;

export default GlobalStyles;
