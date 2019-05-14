![Header Image](https://repository-images.githubusercontent.com/186617526/74d75b80-7676-11e9-8dfa-11c31e1e7615)

# Transform Sketch Layer Structure to BEM
**An SVGO Export Plugin**

This plugin translate the layer information to a **Block, Element, Modifier methodology**.
Based on the SVG sructure and the information of each layer id it creats the BEM model.
Furthermore the plugin provide the feature to transform **IDs to Classes**.


## Usage with BohemianCoding's svgo-compressor

U can use the plugin with [BohemianCoding's svgo-compressor](https://github.com/BohemianCoding/svgo-compressor) to export   compressed SVG that follow BEM from [Sketch](https://www.sketch.com)

requires Sketch >= 52


**Step 1:**
Download and install the Plugin.
Open the Sketch Plugin folder: 'Plugins' > 'Manage Plugins' > 'Reval in Finder'. 
Inside the pluginfolder create a new folder called SVGO-plugins.

**Step 2:**
Open Sketch go to 'Plugins' > 'SVGO Compressor' > 'About' and 'Edit SVGO Settings'.
Search and deactivate the following option in the svgo.json file.

```
 +{
 + +"name": "cleanupIDs",
 + + "enabled": false
 + },
```

**Step 3:**
Add this code lines to the svgo.json file
```
...
+ {
+   "path": "./SVGO-plugins/svg-id-to-class-and-bem.js",
+   "enabled": true,
+   "params": {}
+ }

```
