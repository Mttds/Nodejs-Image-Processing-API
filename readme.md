# Image Processing API in nodejs

## Endpoints
/api/images takes the following parameters:

- image: the image file that should be present in the assets/image-uploader/in folder
- width: the width of the desired resizing as an integer
- height: the height of the desired resizing as an integer

For example: http://localhost:3001/api/images/image=santamonica&height=200&width=200

This will create the resized image with the name <image>_<width>_<height>.jpg in the assets/image-uploader/thumbs folder.

If the requested for the requested resizing there is already an image in the thumbs folder the image processing is skipped and the cached image is displayed instead.

## npm scripts

- build: compiles the typescript code to javascript in the build folder using tsc (typescript compiler)
- prettier: prettifies the typescript code in the src folder
- linter: executes eslint on the src folder
- test: runs the configured tests
- dev: spins up the server using ts-node on the src/index.ts file
- start: runs the build script, then the test script if the build succeeds, and finally the spins up the server using node on the compiled js file build/index.js