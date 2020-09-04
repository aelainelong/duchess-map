import React from 'react';
import styled from 'styled-components';

const AdminMenu = (props) => {
    return (
        <AdminMenuWrap className="AdminMenu" role="menu">
            {props.children}
        </AdminMenuWrap>
    )
}

export default AdminMenu;

const AdminMenuWrap = styled.ul`
    position: absolute;
    list-style-type: none;
    margin: 0;
    width: 100%;
    height: 40px;
    left: 0;
    top: 100%;
    padding: 5px 15px;
    background-color: white;
    border-top: 1px solid ${props => props.theme.secondaryColor};
    border-bottom: 1px solid ${props => props.theme.secondaryColor};
    border-right: 1px solid ${props => props.theme.secondaryColor};

    @media (min-width: ${props => props.theme.tablet}) {
        width: calc(100% - 380px);
        border-bottom-right-radius: 10px;
        height: auto;
    }

    @media (min-width: ${props => props.theme.desktop}) {
        position: absolute;
        background-color: transparent;
        width: auto;
        border-right: 0;
        border-top: 0;
        border-bottom: 0;
        top: auto;
    }

    button {
        display: inline-block;
        height: 100%;
        border: 0;
        padding: 0;
        margin-right: 15px;
        font-family: ${props => props.theme.unica};
        font-size: 1em;
        text-transform: uppercase;
        background: transparent;
        color: ${props => props.theme.secondaryColor};
        cursor: pointer;

        @media (min-width: ${props => props.theme.tablet}) {
            font-size: 1.2em;
        }

        &:hover {
            font-weight: 600;
        }
    }

    .manageIcons {
        display: inline-block;
    }
`;