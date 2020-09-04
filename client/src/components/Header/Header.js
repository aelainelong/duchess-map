import React from 'react';
import styled from 'styled-components';
import Logo from './../Logo/Logo';

const Header = (props) => {
    const adminMenu = props.adminUser ? props.adminMenu() : null;
    return (
        <HeaderWrap>
            {adminMenu}
            <Logo/>
            {props.nav()}
        </HeaderWrap>
    );
}

export default Header;

const HeaderWrap = styled.header`
    position: absolute;
    top: 0;
    width: 100%;
    height: ${props => props.theme.navHeight};
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 25px;
    background-color: ${props => props.theme.white};
    border-bottom: 1px solid ${props => props.theme.primaryColor};
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);

    @media (min-width: ${props => props.theme.desktop}) {
        justify-content: center;
        padding: 0;
    }

    .LaunchAdmin {
        display: block;
        position: absolute;
        left: 0;
        padding: 0 15px;
        background: transparent;
        border: 0;
        color: ${props => props.theme.deepPink};
        cursor: pointer;
        font-family: ${props => props.theme.unica};
        font-weight: 600;
        font-size: 1.05em;
        text-transform: uppercase;

        &:hover {
            text-decoration: none;
        }
    }

    .Title {
        font-size: 2.2rem;

        ${'' /* .ColorSpan--variable {
            color: ${props => props.theme.deepPink}
        } */}
    }
`;
