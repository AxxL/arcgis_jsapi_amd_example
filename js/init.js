// @formatter:off Aptana 3 formatter rule
require(["dojo/parser",
         "dojo/ready",
         "dojo/dom",
         "dojo/on",
         "dojo/_base/array",
         "esri/map",
         "esri/arcgis/utils",
         "esri/dijit/Legend",
         "esri/dijit/Scalebar",
         "dijit/layout/BorderContainer",
         "dijit/layout/ContentPane"], function(parser, ready, dom, on, array, Map, arcgisUtils, Legend, Scalebar) {
// @formatter:on Aptana 3 formatter rule

    ready(function() {
        parser.parse();
        var rightPaneHandle = on(dom.byId("rightPane"), "dblclick", show);

        var mapDeferred = arcgisUtils.createMap("4778fee6371d4e83a22786029f30c7e1", "map");
        mapDeferred.then(function(response) {
            dom.byId("title").innerHTML = response.itemInfo.item.title;
            dom.byId("subtitle").innerHTML = response.itemInfo.item.snippet;

            var map = response.map;

            //get the layers that will display in the legend.
            var layers = arcgisUtils.getLegendLayers(response);
            // console.log(layers);

            if (map.loaded) {
                initMap(layers, map);
            }

        }, function(error) {
            console.log("Map creation failed: ", dojo.toJson(error));
        });

    });

    function initMap(layers, map) {
        //add a scalebar
        var scalebar = new Scalebar({
            map : map,
            scalebarUnit : "dual"
        });

        // add a legend
        var legendDijit = new Legend({
            map : map,
            layerInfos : layers
        }, "legend");
        
        legendDijit.startup();

        // Beispiel fuer array.map
        var opLayerInfos = array.map(layers, function(layer, index) {
            return {
                layer : layer.layerObject,
                title : layer.title
            };
        });

        console.info("opLayerInfos: ", opLayerInfos);
    }

    function show() {
        alert("Ich wurde per Doppelklick auf das rightPane aufgerufen.");
    }

});
