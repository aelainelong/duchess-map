import React from 'react';
import styled from 'styled-components';
import { loadCss, loadModules } from 'esri-loader';
import markerSymbol from './../../assets/svg/marker.svg';

class Map extends React.Component {
    state = {
        currentLocation: [-4, 53.50], // United Kingdom
        currentZoom: 5,
        minZoom: 3,
        maxZoom: 13,
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
        loadCss();
        loadModules([
            'esri/Map', 
            'esri/Basemap',
            'esri/views/MapView',
            'esri/views/SceneView',
            'esri/layers/GeoJSONLayer',
            'esri/layers/VectorTileLayer'
        ])
        .then(([ArcGISMap, Basemap, MapView, SceneView, GeoJSONLayer, VectorTileLayer]) => {
            // Set some default sizes for map features
            const markerSize = "50px";

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
                    url: markerSymbol,
                    width: markerSize,
                    height: markerSize
                }
            };

            // Define our popup template
            const template = {
                title: "{name}",
                content: "{date}<br/>{year}<br/>{country}<br/>{province}<br/>{category}<br/>{locations}<br/>{organisations}<br/>{topics}<br/>{designers}"
            };

            // Create a new data layer from our GeoJSON
            const blob = new Blob([JSON.stringify(geoJSON)], { type: "application/json" });
            const geoJSONLayer = new GeoJSONLayer({
                screenSizePerspectiveEnabled: true,
                url: URL.createObjectURL(blob),
                renderer: locationRenderer,
                popupTemplate: template,
                title: "Map markers",
                outFields: ["name", "year", "country", "province", "category", "locations", "organisations", "topics", "designers"]
                // featureReduction: {
                //     type: "cluster",
                //     clusterRadius: "100px",
                //     clusterMinSize: markerSize,
                //     clusterMaxSize: "80px",
                //     popupTemplate: {
                //         content: "This cluster represents {cluster_count} official apperances."
                //     }
                // }
            });

            // const testLayer = new GeoJSONLayer({
            //     url: 'http://localhost:4000/api/markers'
            // });

            // Create the map
            this.map = new ArcGISMap({
                basemap: basemap,
                layers: [geoJSONLayer]
                // layers: [testLayer]
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
                    // color: [218,164,205,1]
                    color: [243, 152, 191, 1]
                },
                popup: {
                    spinnerEnabled: true,
                    autoCloseEnabled: true
                    // dockEnabled: true,
                    // dockOptions: {
                    //     position: "top-right",
                    //     breakpoint: false
                    // }
                }
            });
            // this.view = new SceneView({
            //     container: this.mapRef.current,
            //     map: this.map,
            //     center: this.state.currentLocation,
            //     zoom: this.state.currentZoom,
            //     qualityProfile: "high",
            //     autoResize: true,
            //     constraints: {
            //         minZoom: this.state.minZoom,
            //         maxZoom: this.state.maxZoom
            //     },
            //     highlightOptions: {
            //         // color: [218,164,205,1]
            //         color: [243, 152, 191, 1]
            //     },
            //     popup: {
            //         dockEnabled: true,
            //         dockOptions: {
            //             position: "top-right",
            //             breakpoint: false
            //         }
            //     }
            // });

            // Display map interface once our map features are completely loaded
            // this.view.when()
            // .then(() => this.props.showMap())
            // .catch(err => console.log(`There was an error loading the requested map data. ${err}`));

            const showMap = this.props.showMap;
            this.view.whenLayerView(geoJSONLayer).then(function (layerView) {
                layerView.watch("updating", function (value) {
                    // availableFields will become available
                    // once the layer view finishes updating
                    if (!value) {
                        layerView.queryFeatures({
                            outFields: layerView.availableFields
                        })
                        .then(function (results) {
                            console.log(results.features.length, " features returned");
                            console.log(results.features);
                            showMap();
                        })
                        .catch(function (error) {
                            console.log("query failed: ", error);
                        });
                    }
                });
            });

            // Set up click event handler for markers
            this.view.on("click", e => {
                this.view.hitTest(e, { exclude: this.view.graphics })
                .then(({ results }) => {
                    console.log(results);
                    let viewCoords = {},
                        markerID = null,
                        zoom;

                    if(results.length > 1 && results[0].graphic){
                        let mapPoint = results[0].graphic.geometry;
                        viewCoords = { lat: mapPoint.latitude, long: mapPoint.longitude };
                        markerID = "";
                        zoom = this.state.maxZoom;
                        this.updateView(viewCoords, zoom);
                        this.props.setActiveMarker(markerID);
                    } else {
                        viewCoords = { lat: this.state.currentLocation[1], long: this.state.currentLocation[0] };
                        zoom = this.state.currentZoom;
                        this.updateView(viewCoords, zoom);
                        this.props.clearActiveMarker();
                    }
                });
            });
        });
    }

    // Change map marker filter
    updateMap = (geoJSON) => {

    }

    // Animate map view to a location
    updateView = (markerCoords, zoom) => {
        const { lat, long } = markerCoords;
        this.view
            .goTo({ 
                center: [long, lat],
                zoom: zoom 
            },{ 
                duration: 1500 
            })
            .then(() => console.log("View transition complete."))
            .catch(err => console.log(err));
    }

    // Toggle the map legend
    toggleLegend = () => {
        this.setState(prevState => ({ legend: !prevState.legend}));
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