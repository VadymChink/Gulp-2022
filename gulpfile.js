import gulp from 'gulp';
import {path, plugins} from "./gulp/config/index.js";
import {copy, reset, html, server, scss, js, images, ttfToWoff, otfToTtf, fontsStyle,svgsprite,zip} from "./gulp/tasks/index.js";

global.app = {
    isBuild: process.argv.includes("--build"),
    isDev: !process.argv.includes("--build"),
    gulp,
    path,
    plugins,
}

export {svgsprite};

function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf,ttfToWoff,fontsStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images,svgsprite));

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP =gulp.series(reset, mainTasks, zip);

export {
    dev,
    build,
    deployZIP
}

gulp.task('default', dev);