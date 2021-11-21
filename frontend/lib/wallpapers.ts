import fs from 'fs';
import path from 'path';

const wallpaperDir = path.join(process.cwd(), './public/wallpapers');

export function getWallpapers() {
    const filenames = fs.readdirSync(wallpaperDir);

    const wallpapers = filenames.filter(filename => filename.endsWith('.jpg'));

    return wallpapers;
}
