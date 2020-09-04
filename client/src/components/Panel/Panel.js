import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';

const Panel = (props) => {
    return (
        <PanelWrap className="Panel">
            <div className="Panel--screen"></div>
            <Container maxWidth="sm" className="Panel--inner">
                {props.children}
            </Container>
        </PanelWrap>
    )
}

export default Panel;

const PanelWrap = styled.section`
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    height: calc(100vh - ${props => props.theme.navHeight});
    top: ${props => props.theme.navHeight};
    color: ${props => props.theme.white};

    @media (min-width: ${props => props.theme.tablet}) {
        right: 0;
        max-width: ${props => props.theme.navWidthTablet};
    }

    @media (min-width: ${props => props.theme.desktop}) {
        max-width: ${props => props.theme.navWidthDesktop};
    }

    .Panel--screen {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        opacity: 0.9;
        background-color: ${props => props.theme.tertiaryColor};
    }

    .Panel--inner {
        position: relative;

        @media (min-width: ${props => props.theme.tablet}) {
            padding: 0 35px;
        }
    }

    h2 {
        border-bottom: double;
        border-color: ${props => props.theme.deepPink};
    }

    cite, a {
        color: ${props => props.theme.deepPink};
    }

    a {
        font-weight: 600;
    }
`;