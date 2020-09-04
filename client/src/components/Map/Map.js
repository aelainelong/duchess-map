import React from 'react';
import styled from 'styled-components';
import { loadModules } from 'esri-loader';

class Map extends React.Component {
    state = {
        currentLocation: [-4, 53.50], // United Kingdom
        currentZoom: 6,
        minZoom: 3,
        maxZoom: 12,
        legend: false
    };

    // Map container ref
    mapRef = React.createRef();

    componentDidMount(){
        // Get all markers from database, build the initial map view
        this.loadGeoJSON('/api/markers')
            .then(geoJSON => this.initMap(geoJSON.data))
            .catch(err => console.log(err));
    }

    componentWillUnmount(){
        // Destroy the map view when we're done
        if(this.view) {
            this.view.container = null;
        }
    }

    // Load the map markers from the API
    loadGeoJSON = apiEndpoint => {
        return loadModules(['esri/request'])
               .then(([esriRequest]) => esriRequest(apiEndpoint, { responseType: "json" }))
               .then(resp => Promise.resolve(resp))
               .catch(err => Promise.reject(err));
    }

    // Initialization of map view (integrating data layer)
    initMap = geoJSON => {
        // Lazy load the ArcGIS API
        loadModules([
            'esri/Map', 
            'esri/Basemap', 
            'esri/views/MapView',
            'esri/layers/GeoJSONLayer',
            'esri/layers/VectorTileLayer', 
            'esri/symbols/PictureMarkerSymbol'
        ], { css: true })
            .then(([ArcGISMap, Basemap, MapView, GeoJSONLayer, VectorTileLayer, PictureMarkerSymbol]) => {
                // Set our custom basemap
                const basemap = new Basemap({
                    baseLayers: [
                        new VectorTileLayer({
                            portalItem: {
                                id: "04de1774d8c14973a7bfdafe8a212c08"
                            }
                        })
                    ]
                });

                // Define our location marker style & apply it the base GeoJSON layer
                const locationRenderer = {
                    type: "simple",
                    symbol: {
                        type: "picture-marker",
                        url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
                        width: "64px",
                        height: "64px"
                        // type: "simple-marker",
                        // color: "#9a385f",
                        // outline: {
                        //     color: "white"
                        // }
                    }
                };

                // Define our popup template
                const template = {
                    title: "{name}",
                    content: "{date}"
                };

                // Create a new data layer from our GeoJSON
                const blob = new Blob([JSON.stringify(geoJSON)], { type: "application/json" });
                const geoJSONLayer = new GeoJSONLayer({
                    url: URL.createObjectURL(blob),
                    renderer: locationRenderer,
                    popupTemplate: template,
                    title: "Map markers",
                    outFields: ["*"]
                });

                // Create the map
                this.map = new ArcGISMap({
                    basemap: basemap,
                    layers: [geoJSONLayer]
                });

                // Create the map view
                this.view = new MapView({
                    container: this.mapRef.current,
                    map: this.map,
                    center: this.state.currentLocation,
                    zoom: this.state.currentZoom,
                    autoResize: true,
                    constraints: {
                        minZoom: this.state.minZoom,
                        maxZoom: this.state.maxZoom
                    },
                    highlightOptions: {
                        color: [218,164,205,0.5]
                    },
                    popup: {
                        dockEnabled: true,
                        dockOptions: {
                            position: "top-right",
                            breakpoint: false
                        }
                    }
                });

                // Display map interface once our map features are completely loaded
                this.view.when()
                .then(() => this.props.showMap())
                .catch(err => console.log(`There was an error loading the requested map data. ${err}`));

                // Set up click event handler for markers
                this.view.on("click", e => {
                    this.view.hitTest(e).then(({ results }) => { console.log(results) });
                });
            });
    }

    updateMap = (geoJSON) => {

    }

    // Animate map view to new location
    updateView = (markerCoords) => {
        const { lat, long } = markerCoords;

        this.view.goTo(
                { center: [lat, long] },
                { duration: 4000 }    
            )
            .then(() => console.log("View transition complete."))
            .catch(function (error) {
                if (error.name !== "AbortError") {
                    console.error(error);
                }
            });
    }

    // Set the active marker
    // openMarker = (markerID) => {
    //     this.setState(() => ({ activeMarker: markerID }));
    // }

    // Clear the active marker
    // closeMarker = () => {
    //     this.setState(() => ({ activeMarker: null }));
    // }

    // Toggle the map legend
    toggleLegend = () => {
        this.setState(() => ({ legend: !this.state.legend}));
    }

    render(){
        return <MapWrap ref={this.mapRef}></MapWrap>;
    }
}

export default Map;

const MapWrap = styled.div`
    height: 100vh;
    width: 100vw;

    .esri-view-surface--inset-outline:focus::after {
        outline: auto 0px Highlight !important;
        outline: auto 0px -webkit-focus-ring-color !important;
    }

    .esri-ui-inner-container {
        top: 75px !important;
    }

    .esri-icon-plus:before,
    .esri-icon-minus:before {
        color: ${props => props.theme.secondaryColor};
        font-weight: 600;
    }

    .esri-ui-top-left {
        @media (max-width: ${props => props.theme.desktop}) {
            bottom: 0;
            right: 0;
            left: auto;
            top: auto;
        }
    }

    .esri-ui .esri-attribution {
        background-color: transparent;
        bottom: 5px;
        left: 5px;
        color: ${props => props.theme.tertiaryColor}
    }

    .esri-attribution__sources {
        display: none;
    }
`;