import React from 'react';
import styled from 'styled-components';
import { FilterAlt } from '@styled-icons/material/';

const Filters = () => {
    return (
        <div className="filter-content">
            <h2><FilterIcon />View by Filter</h2>
        </div>
    )
}

export default Filters;

const FilterIcon = styled(FilterAlt)`
    height: 25px;
    margin-right: 5px;
`;