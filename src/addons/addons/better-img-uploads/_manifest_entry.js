/* generated by pull.js */
const manifest = {
  "editorOnly": true,
  "name": "HD image uploads",
  "description": "Adds a new button above the \"upload costume\" button that automatically converts uploaded bitmap images into SVG (vector) images to avoid losing quality.",
  "tags": [
    "beta"
  ],
  "info": [
    {
      "type": "notice",
      "text": "Avoid using the HD upload button if you plan to edit the image after uploading.",
      "id": "notSuitableEdit"
    }
  ],
  "credits": [
    {
      "name": "ErrorGamer2000",
      "link": "https://scratch.mit.edu/users/ErrorGamer2000/"
    },
    {
      "name": "GarboMuffin"
    },
    {
      "name": "World_Languages"
    },
    {
      "name": "SheepTester",
      "link": "https://scratch.mit.edu/users/Sheep_maker/"
    }
  ],
  "userscripts": [
    {
      "url": "userscript.js"
    }
  ],
  "userstyles": [
    {
      "url": "style.css"
    }
  ],
  "settings": [
    {
      "dynamic": true,
      "name": "Image sizing",
      "id": "fitting",
      "type": "select",
      "potentialValues": [
        {
          "id": "full",
          "name": "Original size"
        },
        {
          "id": "fill",
          "name": "Stretch to fill stage"
        },
        {
          "id": "fit",
          "name": "Shrink to fit stage"
        }
      ],
      "default": "fit"
    }
  ]
  "enabledByDefault": true
};
export default manifest;
