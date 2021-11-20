// Note: do not import this file into the application, only run with 'npm run getwallpapers'
const fs = require('fs');
const https = require('https');
const path = require('path');

const {JSDOM} = require('jsdom');
const got = require('got');

const galleryURL = 'https://inara.cz/gallery-latest/2/'; // 2 is category 'Celestial'
const wallpaperFolder = path.resolve(__dirname, '../../public/wallpapers');

const downloadWallpaper = url => {
    const filename = url.match(/^\/data\/gallery\/\d+\/([\dx]+\.jpg)$/)[1];
    const fullURL = `https://inara.cz${url}`;
    const fullFilePath = path.resolve(wallpaperFolder, filename);

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(fullFilePath)) {
            https.get(fullURL, response => {
                response.on('data', chunk => {
                    fs.appendFileSync(fullFilePath, chunk);
                });

                response.on('end', () => {
                    resolve(`Downloaded file ${filename}`);
                });
            }).on('error', err => {
                reject(new Error(err.message));
            });
        } else {
            resolve(`File already exists ${filename}`);
        }
    })
}

got(galleryURL).then(res => {
    const dom = new JSDOM(res.body);

    const imgElements = dom.window.document.querySelectorAll('div.gallery-grid img');

    const mappedUrls = [...imgElements].map(img => {
        return img.src.replace('/thumbs', '').replace('?v2', '');
    });

    mappedUrls.forEach(async url => {
        try {
            const downloaded = await downloadWallpaper(url);
            console.log(downloaded);
        } catch (err) {
            console.error(err);
        }
    });
})

