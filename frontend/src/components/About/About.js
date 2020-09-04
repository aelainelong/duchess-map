import React from 'react';
import styled from 'styled-components';
import { InfoCircle as Info } from '@styled-icons/fa-solid/';

const About = () => {
    return (
        <div className="about-content">
            <h2><InfoIcon />About The Duchess Map</h2>
            <p>The Duchess Map is an interactive map that chronicles the official royal engagements of Meghan Markle, Duchess of Sussex, during her time as a working senior member of the British Royal Family from May 2018 - March 2020. The map details where the Duchess traveled, the organisations and dignitaries she met with, the topics she engaged with and the brands that she wore.</p>
            <p>Meghan's appearances can be filtered by country, topic, event type or brand by using the 'View by Filter' option, or may be traversed in chronological order using the ‘View by Timeline’ feature.</p>
            <hr />
            <p>This map was designed and developed by <a href="https://aelainelong.com" target="_blank" rel="noopener noreferrer" aria-label="Ashley Long">Ashley Long</a>, and is powered by Esri’s ArcGIS API for JavaScript.</p>
            <p>Details of the Duchess' travels were originally compiled by and referenced with permission from <a href="https://madaboutmeghan.blogspot.com/" target="_blank" rel="noopener noreferrer" aria-label="Mad About Meghan">Mad About Meghan</a> and <a href="http://www.meghansmirror.com/" target="_blank" rel="noopener noreferrer" aria-label="Meghan's Mirror">Meghan's Mirror</a>.</p>
            <hr />
            <cite>"The Duchess Map" is in no way affiliated with or endorsed by the Duchess of Sussex or The British Royal Family.</cite>
        </div>
    )
}

export default About;

const InfoIcon = styled(Info)`
    height: 25px;
    margin-right: 5px;
`;