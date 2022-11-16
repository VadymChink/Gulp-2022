import svgSprite from "gulp-svg-sprite";

export const svgsprite = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})

        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: " S P R I T E   S V G ",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: `../icons/icons.svg`,
                        example: true
                    }
                },
            }
        ))
        .pipe(app.gulp.dest(`${app.path.build.images}`))
}