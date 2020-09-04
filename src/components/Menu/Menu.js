import React from 'react';
import styled, { css } from 'styled-components';
import { FilterAlt, Timeline } from '@styled-icons/material/';
import { InfoLarge } from '@styled-icons/typicons/';

const Menu = (props) => {
    return (
        <MenuWrap className="Menu" role="menu">
            <ListItem medium><MenuItem role="menuitem" active={props.filterView ? true : false} onClick={e => (props.toggleFilterView(e))}><FilterIcon/><span>By Filter</span></MenuItem></ListItem>
            <ListItem long><MenuItem role="menuitem" active={props.timelineView ? true : false} onClick={e => (props.toggleTimelineView(e))}><TimelineIcon/><span>By Timeline</span></MenuItem></ListItem>
            <ListItem short><MenuItem role="menuitem" active={props.about ? true : false} onClick={e => (props.toggleAbout(e))}><InfoIcon /><span>Info</span></MenuItem></ListItem>
        </MenuWrap>
    )
}

export default Menu;

const MenuWrap = styled.ul`
    position: fixed;
    list-style-type: none;
    margin: 0;
    padding: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;

    @media (min-width: ${props => props.theme.tablet}) {
        position: relative;
        width: 410px;
    }

    ${'' /* button {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    font-family: ${props => props.theme.unica};
    font-size: 1.05em;
    text-transform: uppercase;
  } */}
`;

const ListItem = styled.li`
    border: 1px solid ${props => props.theme.primaryColor};
    border-top: 0;
    border-bottom: 0;
    border-left-width: 0;
    height: 40px;

    &:last-child {
        border-right-width: 0;
    }

    ${props => props.long && css`
        width: 39%;
    `}

    ${props => props.medium && css`
        width: 35%;
    `}

    ${props => props.short && css`
        width: 26%;
    `}

    @media (min-width: ${props => props.theme.tablet}) {
        height: auto;

        &:first-child {
            border-left-width: 1px;
        }
        &:last-child {
            border-right-width: 1px;
        }
    }

    & > li {
        height: 25px;

        @media (min-width: ${props => props.theme.tablet}) {
            height: 100%;
        }
    }

    span {
        display: inline-block;
        margin-left: 5px;
    }
`;

const MenuItem = styled.button`
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    cursor: pointer;
    font-family: ${props => props.theme.unica};
    font-weight: 600;
    font-size: 1.05em;
    text-transform: uppercase;
    color: ${props => props.theme.white};
    transition: all 200ms ease;
    background-color: ${props => (props.active ? props.theme.tertiaryColor : props.theme.medPink)};

    @media (min-width: ${props => props.theme.tablet}) {
        padding: 0 20px;
    }

    ${props => props.secondary && css`
        background-color: ${props => props.theme.secondaryColor};
    `}

    ${props => props.tertiary && css`
        background-color: ${props => props.theme.tertiaryColor};
    `}

    &:hover {
        background-color: ${props => props.theme.tertiaryColor};
    }
`;

const FilterIcon = styled(FilterAlt)`
    height: 25px;
`;
const TimelineIcon = styled(Timeline)`
    height: 25px;
`;
const InfoIcon = styled(InfoLarge)`
    height: 25px;
`;