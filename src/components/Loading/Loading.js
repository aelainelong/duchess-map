import React from 'react';
import styled from 'styled-components';
import Logo from '../Logo/Logo';

const StyledLoader = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: ${props => props.theme.softPink};
    text-align: center;
    color: ${props => props.theme.secondaryColor};
`;

class Loading extends React.Component {
    render(){
        return (
            <StyledLoader>
                <Logo/>
            </StyledLoader>
        );
    }
}

export default Loading;