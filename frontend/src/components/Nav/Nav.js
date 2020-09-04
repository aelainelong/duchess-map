import React from 'react';
import styled, { css } from 'styled-components';

const Nav = (props) => {
    // Toggle Nav
    const handleNavToggle = () => {
        props.toggleNav();
    }

    return (
        <NavWrap role="navigation">
            <NavToggle active={props.navOpen ? true : false}>
                <NavToggleButton aria-label="Toggle navigation" onClick={(e) => (handleNavToggle(e))} active={props.navOpen ? true : false}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </NavToggleButton>
            </NavToggle>
            {props.navOpen ? props.menu() : null}
        </NavWrap>
    )
}

export default Nav;

const NavWrap = styled.nav`
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;

    @media (min-width: ${props => props.theme.tablet}) {
        width: ${props => props.theme.navWidthTablet};
        display: flex;
        flex-direction: row-reverse;
    }

    @media (min-width: ${props => props.theme.desktop}) {
        width: ${props => props.theme.navWidthDesktop};
    }
`;

const NavToggle = styled.div`
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    ${'' /* transition: all .15s ease-in-out; */}

    @media (min-width: ${props => props.theme.tablet}) {
        ${props => props.active && css`
            background-color: ${props => props.theme.medPink};
        `}
    }
`;

const NavToggleButton = styled.button`
    position: relative;
    display: block;
    margin: 0 auto;
    border: 0;
    padding: 0;
    height: 20px;
    width: 20px;
    background-color: transparent;
    transform: rotate(0deg);
    transition: all .15s ease-in-out;
    cursor: pointer;

    span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        background: ${props => props.theme.secondaryColor};
        border-radius: 9px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .2s ease-in-out;
        pointer-events: none;

        &:nth-child(1) {
            top: 0px;
        }

        &:nth-child(2),
        &:nth-child(3) {
            top: 7px;
        }

        &:nth-child(4) {
            top: 14px;
        }
    }

    ${props => props.active && css`
        @media (min-width: ${props => props.theme.tablet}) {
            span {
                background-color: ${props => props.theme.white};
            }
        }

        span:nth-child(1) {
            top: 10px;
            width: 0%;
            left: 50%;
        }

        span:nth-child(2) {
            transform: rotate(45deg);
        }

        span:nth-child(3) {
            transform: rotate(-45deg);
        }

        span:nth-child(4) {
            top: 10px;
            width: 0%;
            left: 50%;
        }
    `}
`;