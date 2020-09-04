import React from 'react';
import styled, { css } from 'styled-components';


const StyledLogo = styled.div`
    img {
        display: block;
        max-width: 100%;
        width: 65px;
    }
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    line-height: 1;
    margin: 0;
`;

const ColorSpan = styled.span`
    color: ${props => props.theme.deepPink};

    ${props => props.secondary && css`
        color: ${props => props.theme.secondaryColor};
    `}

    ${props => props.tertiary && css`
        color: ${props => props.theme.tertiaryColor};
    `}
`;

const Logo = () => {
    return (
        <StyledLogo>
            <div className="icon-marker"></div>
            <Title className="Title">
                <ColorSpan className="ColorSpan--variable">the</ColorSpan>
                <ColorSpan secondary>duchess</ColorSpan>
                <ColorSpan tertiary>map</ColorSpan>
            </Title>
        </StyledLogo>
    )
}

export default Logo;