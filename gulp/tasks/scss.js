import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import webpCSS from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCSSMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SCSS',
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace('src/img', 'img'))
        .pipe(sass(
            {outputStyle: 'expanded'}
        ))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCSSMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpCSS({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                })
            )

        )
        .pipe(
            app.plugins.if(
                app.isBuild,
            autoprefixer({
            grid: true,
            overrideBrowserlist: ['last 3 versions'],
            cascade: true
        })))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCSS()))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream());
}