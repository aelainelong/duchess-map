import React from 'react';
import styled from 'styled-components';
import { Timeline as Time } from '@styled-icons/material/';

const Timeline = () => {
    return (
        <div className="timeline-content">
            <h2><TimelineIcon />View by Timeline</h2>
        </div>
    )
}

export default Timeline;

const TimelineIcon = styled(Time)`
    height: 25px;
    margin-right: 5px;
`;