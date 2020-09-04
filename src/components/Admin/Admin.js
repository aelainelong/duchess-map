import React from 'react';
import styled from 'styled-components';

class Admin extends React.Component {
    render(){
        return (
            <AdminWrap>
                {this.props.closeAdmin()}
                <p>This is the admin screen.</p>
            </AdminWrap>
        );
    }
}

export default Admin;

const AdminWrap = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: blue;
`;