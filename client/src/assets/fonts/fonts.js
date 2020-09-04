import { createGlobalStyle } from 'styled-components';

import glyphsTtf from './glyphs.ttf';
import glyphsWoff from './glyphs.woff';
import glyphsEot from './glyphs.eot';
import glyphsSvg from './glyphs.svg';

export default createGlobalStyle`
    @font-face {
        font-family: 'Glyphter';
        src: url(${glyphsEot});
    src: url(${glyphsEot}?#iefix) format('embedded-opentype'),
         url(${glyphsWoff}) format('woff'),
         url(${glyphsTtf}) format('truetype'),
         url(${glyphsSvg}#Glyphter) format('svg');
        font-weight: 400;
        font-style: normal;
    }
`;