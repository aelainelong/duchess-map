import React from 'react';
import styled from 'styled-components';
import { render } from '@testing-library/react';

const DashboardFormWrap = styled.div`

`;

class DashboardSubmit extends React.Component {
    render(){
        return (
            <DashboardFormWrap>
                <h1>{this.props.formType} Event Marker</h1>
                <form>
                    { /* Event Title - text input */}
                    { /* Event Date - date picker */}
                    { /* City/Province - text input */}
                    { /* Event Type - dropdown */}
                    { /* Locations - tag input */}
                    { /* Organisations - tag input */}
                    { /* Topics - tag input */}
                    { /* Designers/Brands - tag input */}
                    { /* Images - upload field */}
                    <div className="form__submit">
                        <button>{this.props.formType} Event Marker</button>
                    </div>
                </form>
            </DashboardFormWrap>
        );
    }
}

export default DashboardSubmit;