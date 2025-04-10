require([
    "esri/views/MapView",
    "esri/Map",
    "esri/WebMap",
    "esri/geometry/Point",
    "esri/layers/FeatureLayer",
    "esri/geometry/projection",
    "esri/geometry/SpatialReference",
    "esri/Graphic", 
    "esri/core/reactiveUtils", 
    "esri/core/promiseUtils"
  ], (MapView, Map, WebMap, Point, FeatureLayer, projection, SpatialReference, Graphic, reactiveUtils, promiseUtils) => {
    projection.load().then(function() {
        //Projection parameters              
        {
          // Lambert Equal Area Projection for continental US
          var conusSR = new SpatialReference(
              'PROJCS["Lambert Azimuthal Equal Area_North America_alt",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Lambert_Azimuthal_Equal_Area"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",-99.0],PARAMETER["Latitude_Of_Origin",40.0],UNIT["Meter",1.0]]');
          // Lambert Equal Area projection for Alaska map
          var akSR = new SpatialReference(
              'PROJCS["Lambert Azimuthal Equal Area_Alaska",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Lambert_Azimuthal_Equal_Area"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",-148.0],PARAMETER["Latitude_Of_Origin",64.0],UNIT["Meter",1.0]]');
          // Lambert Equal Area projection for Hawaii map
          var hiSR = new SpatialReference(
              'PROJCS["Lambert Azimuthal Equal Area_Hawaii",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Lambert_Azimuthal_Equal_Area"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",-156.0],PARAMETER["Latitude_Of_Origin",20.0],UNIT["Meter",1.0]]');
          // Lambert Equal Area Projection for Puerto Rico map
          var prSR = new SpatialReference(
              'PROJCS["Lambert Azimuthal Equal Area_PR_VI",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Lambert_Azimuthal_Equal_Area"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",-65.5],PARAMETER["Latitude_Of_Origin",18.0],UNIT["Meter",1.0]]');
          // Lambert Equal Area Projection for Guam/Northern Marianas map
          var guSR = new SpatialReference(
              'PROJCS["Lambert Azimuthal Equal Area_GU_MP",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Lambert_Azimuthal_Equal_Area"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",145.0],PARAMETER["Latitude_Of_Origin",16.0],UNIT["Meter",1.0]]');
          // Lambert Equal Area Projection for American Samoa map
          var asSR = new SpatialReference(
              'PROJCS["Lambert Azimuthal Equal Area_AS",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Lambert_Azimuthal_Equal_Area"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",-170.0],PARAMETER["Latitude_Of_Origin",-14.0],UNIT["Meter",1.0]]');
          // Lambert Equal Area Projection for Overview map
          var overviewSR = new SpatialReference(
              'PROJCS["Lambert Azimuthal Equal Area_US_global_extent",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Lambert_Azimuthal_Equal_Area"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",-148.0],PARAMETER["Latitude_Of_Origin",17.25],UNIT["Meter",1.0]]');
          }

        var defaultLayer = new FeatureLayer({
            //          url: "https://mtgis-server.geo.census.gov/arcgis/rest/services/BAS_Viewer/BAS22_Participation/MapServer",
                      portalItem: {
                        //id:"6ac5e325468c4cb9b905f1728d6fbf0f" // US Federally supported hospital points (includes Palau)
                        //id:"df53bb7c871b4e13a59e4310a581a917" // County boundaries from HiFLD
                        //id:"49c25e0ce50340e08fcfe51fe6f26d1e" // Covid trends
                        //id:"c93f8a9f2a614ff8a31db732636eff9b" // 2022 Zip Codes from Esri Data/Maps 
                        //id:"cb1886ff0a9d4156ba4d2fadd7e8a139" // Current wind station data
                        //id:"d957997ccee7408287a963600a77f61f" // Current wildfires
                        //id:"5e92f2e0930848faa40480bcb4fdc44e" // USA Federal Lands
                        //id:"79461a1ec0974301bde274177c7108bd" // Earthquake archive
                        //id:"f097586198b94149965206a8f2471dbf" // USA Territorial Sea Boundary (requires subscriber token)
                        //id:"0ddda259c5c443cc9c5927132644b961" // NOAA Maritime Boundaries (Map Service) 
                        //id:"e2e7bcb7fdaf41f2a97b5f540e0d5433" // 117th Congressional Districts
                        id:"dd834ef507244f96baa6b29eab5dd396" // 2019 Population density
            //          id: "67ab7f7c535c4687b6518e6d2343e8a2" // Ocean basemap
            
                      }
                    });

        var backgroundLayer = new FeatureLayer({
            portalItem:{
              id:"75ea506613f847e48ab0f91e93ac538d" // Admin-0 World Countries
            },
            legendEnabled: false,
            renderer: {
              type: "simple", // autocasts as new SimpleRenderer()
              symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [235, 235, 235, 1],
                outline: {
                  color: [210, 210, 210, 1],
                  width: 0.5
                }
              }
            }
          });
  
          var usStatesLayer = new FeatureLayer({
            portalItem:{
              id:"1ec2ffa0ebd34e4eac694adb9fa18184" // Admin-1 World Countries
            },
            legendEnabled: false,
            renderer: {
              type: "simple", // autocasts as new SimpleRenderer()
              symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [235, 235, 235, 1],
                outline: {
                  color: [210, 210, 210, 1],
                  width: 0.5
                }
              }
            }
          });
  
          var oceanLayer = new FeatureLayer({
            portalItem:{
              id:"1f43d235ed7d42899b9e4a7214d913e4"
            },
            legendEnabled: false,
            renderer: {
              type: "simple", // autocasts as new SimpleRenderer()
              symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [220, 220, 220, 1],
                outline: {
                  color: [150, 150, 150, 0],
                  width: 0
                }
              }
            }
          }); 
        
        // If no parameters are specified in the url, display the default map
        var layer = defaultLayer;

          var layerMap = new Map({
            layers: [oceanLayer,backgroundLayer,usStatesLayer,layer] //oceanLayer,
        });
        var map = layerMap;
        var scale = 18000000;
        // CONUS map
        let conusViewCenterPt = new Point({
            x: -97,
            y: 38,
            spatialReference: {
            wkid: 4326  
            }
        });
        const mainView = new MapView({
            container: "mainViewDiv",
            map: map,
            popup: {
              highlightEnabled: false,
              dockEnabled: true,
              dockOptions: {
                breakpoint: false,
                buttonEnabled: false,
                position: "top-center"
              }
            },
            center: conusViewCenterPt,
            scale: scale,
            spatialReference: conusSR,
            ui: {
              components: ["attribution"]
            }
          });

        // Alaska map
        let akViewCenterPt = new Point({
          x: -161.5,
          y: 62.5,
          spatialReference: {
            wkid: 4326  
          }
        });
        const akView = new MapView({
            container: "akViewDiv",
            map: map,
            popup: {
              highlightEnabled: false,
              dockEnabled: true,
              dockOptions: {
                breakpoint: false,
                buttonEnabled: false,
                position: "top-center"
              }
            },
            center: akViewCenterPt,
            scale: scale,
            spatialReference: akSR,
            ui: {
              components: []//["attribution"]
            }
         });
        // Overview map
        let overViewCenterPt = new Point({
            x: -145,
            y: 25,
            spatialReference: {
              wkid: 4326  
            }
        });
                    
        const overView = new MapView({
            container: "overViewDiv",
            map: map,
            popup: {
              highlightEnabled: false,
              dockEnabled: true,
              dockOptions: {
                breakpoint: false,
                buttonEnabled: false,
                position: "top-center"
              }
            },
            center: overViewCenterPt,
            scale: 110000000,
            spatialReference: overviewSR,
            ui: {
              components: []//["attribution"]
            }
        });
        // Guam/Northern Marianas map
        let guViewCenterPt = new Point({
            x: 145,
            y: 16.5,
            spatialReference: {
              wkid: 4326  
            }
        });

        const guView = new MapView({
            container: "guViewDiv",
            map: map,
            popup: {
              highlightEnabled: false,
              dockEnabled: true,
              dockOptions: {
                breakpoint: false,
                buttonEnabled: false,
                position: "top-center"
              }
            },
            center: guViewCenterPt,
            scale: scale,
            spatialReference: guSR,
            ui: {
              components: []//["attribution"]
            }
        });
        // American Samoa map
        let asViewCenterPt = new Point({
            x: -169,
            y: -13,
            spatialReference: {
              wkid: 4326  
            }
        });
        const asView = new MapView({
            container: "asViewDiv",
            map: map,
            popup: {
              highlightEnabled: false,
              dockEnabled: true,
              dockOptions: {
                breakpoint: false,
                buttonEnabled: false,
                position: "top-center"
              }
            },
            center: asViewCenterPt,
            scale: scale,
            spatialReference: asSR,
            ui: {
              components: []//["attribution"]
            }
        });
        // Hawaii map
        let hiViewCenterPt = new Point({
            x: -158,
            y: 21,
            spatialReference: {
              wkid: 4326  
            }
        });
        const hiView = new MapView({
            container: "hiViewDiv",
            map: map,
            popup: {
              highlightEnabled: false,
              dockEnabled: true,
              dockOptions: {
                breakpoint: false,
                buttonEnabled: false,
                position: "top-center"
              }
            },
            center: hiViewCenterPt,
            scale: scale,
            spatialReference: hiSR,
            ui: {
              components: []//["attribution"]
            }
        });
      
        mainView.when(() => {
          console.log("CONUS Map and View are ready");
          }).catch((error) => {
          console.error("Error loading the CONUS map view:", error);
          });  
        akView.when(() => {
            console.log("Alaska Map and View are ready");
            }).catch((error) => {
            console.error("Error loading the Alaska map view:", error);
        });
        overView.when(() => {
            console.log("Overview Map and View are ready");
            }).catch((error) => {
            console.error("Error loading the Overview map view:", error);
            });
        guView.when(() => {
            console.log("GU/MP Map and View are ready");
            }).catch((error) => {
            console.error("Error loading the GU/MP map view:", error);
        });
        asView.when(() => {
            console.log("AS Map and View are ready");
            }).catch((error) => {
            console.error("Error loading the AS map view:", error);
            });
        hiView.when(() => {
            console.log("HI Map and View are ready");
            }).catch((error) => {
            console.error("Error loading the HI map view:", error);
            });
        //remove zoom widgets from popup
        mainView.popup.viewModel.includeDefaultActions = false;
        akView.popup.viewModel.includeDefaultActions = false;
        overView.popup.viewModel.includeDefaultActions = false;
        guView.popup.viewModel.includeDefaultActions = false;
        asView.popup.viewModel.includeDefaultActions = false;
        hiView.popup.viewModel.includeDefaultActions = false;
        
        // Sync Alaska scale
        akView.when(() => {
          syncScale(akView, hiView);
          syncScale(akView, asView);
          syncScale(akView, guView);
          syncScale(akView, mainView);
        });

        // Add an extent box to the overview map from the GU/MP map
        overView.when(() => {
          guView.when(() => {
            guExtentSetup();
            syncScale(guView, akView);
            syncScale(guView, asView);
            syncScale(guView, hiView);
            syncScale(guView, mainView);
          });
        });
        const guExtentDebouncer = promiseUtils.debounce(async () => {
          if (guView.stationary) {
            await overView.goTo({
              center: guView.center,
              scale:
                guView.scale * 2 *
                Math.max(
                  guView.width / overView.width,
                  guView.height / overView.height
                )
            });
          }
        });
        function guExtentSetup() {
          const guExtentGraphic = new Graphic({
            geometry: null,
            symbol: {
              type: "simple-fill",
              color: [0, 0, 0, 0],
              outline: {  // autocasts as new SimpleLineSymbol()
                color: [64, 64, 64, 0.5],
                width: "0.5px"
              }
            }
          });
          overView.graphics.add(guExtentGraphic);

          reactiveUtils.watch(
            () => guView.extent,
            (extent) => {
              // Sync the overview map location
              // whenever the guView is stationary
              guExtentDebouncer().then(() => {
                guExtentGraphic.geometry = extent;
              });
            },
            {
              initial: true
            }
          );
        }
        // Sync scales across insets
        function syncScale(view, targetView) {
          view.watch("scale", function(newScale) {
            console.log("Inset changed: " + newScale);
            targetView.set({ scale: newScale });
          });
        }
        // Sync scale between mainView and other views
        mainView.watch("scale", (newScale) => {
          console.log("Main changed:", newScale);
          localStorage.setItem("mainViewScale", newScale); // Store the scale in localStorage
          const storedScale = localStorage.getItem("mainViewScale");
          console.log("Stored scale:", storedScale);
          if (storedScale) {
            const scale = parseFloat(storedScale);
            console.log("Updating scale:", scale);

            akView.set({ scale });
            console.log("AK scale: ", akView.scale)
            guView.set({ scale });
            asView.set({ scale });
            hiView.set({ scale });
          }
        });         
    });
  });