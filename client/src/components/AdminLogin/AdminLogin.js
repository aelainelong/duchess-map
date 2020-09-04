import React from 'react';
import styled from 'styled-components';
import Logo from './../Logo/Logo';

class AdminLogin extends React.Component {
    render(){
        return (
            <AdminWrap>
                <Logo />
                <form>
                    
                </form>
                {this.props.closeAdmin()}
            </AdminWrap>
        );
    }
}

export default AdminLogin;

const AdminWrap = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: blue;
`;