const {remote} = require('electron');

document.addEventListener('keydown', (e) => {
    if (e.which === 123){
        remote.getCurrentWindow().webContents.openDevTools();
    }
});
