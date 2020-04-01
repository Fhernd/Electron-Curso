const {desktopCapturer, remote} = require('electron');
const {writeFile} = require('fs');
const {dialog, Menu} = remote;

let grabadorMultimedia;
const partesGrabacion = [];


