import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const GlobalFont = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
    font-family: 'Jua', sans-serif;
  }
`;

export const Header = styled.div`
    width: 100%;
    height: 50px;
    background: black;
    color: gold;
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-bottom: 30px;
`;

export const Style = styled.span`
    position: absolute;
    right: 5%;
`;

export const Wrapper = styled(FontAwesomeIcon)`
    margin-left: 5%;
    font-size: 20px;
`;


export const Center = styled.span`
    margin-left: 10px;
    font-size: 20px;
`;

export const A = styled.a`
    color: gold;
`;

export const Footer = styled.div`
    width: 100%;
    height: 50px;
    background: black;
    position: absolute;
    bottom: 0;
`;

export const Github = styled(FontAwesomeIcon)`
    font-size: 30px;
    color: white;
`;

export const Instagram = styled(FontAwesomeIcon)`
    font-size: 30px;
    color: white;
`;

export const Facebook = styled(FontAwesomeIcon)`
    font-size: 30px;
    color: white;
`;

export const Ul = styled.ul`
    width: 100%;
    height: 50px;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
`;

export const Li = styled.li`
    flex: 1;
    text-align: center;
`;