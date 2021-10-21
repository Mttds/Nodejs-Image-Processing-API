'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
require('console-stamp')(console, '[HH:MM:ss.l]');
var app = (0, express_1.default)();
var port = 3001;
// set the view engine to ejs
// we will need it to serve the dynamic html
// with the embedded image that we read from the file system
app.set('view engine', 'ejs');
// set the static folder for serving images
// the virtual path /api is used because the
// api/images routes has the get('/'...) relative to api
app.use('/api', express_1.default.static('assets'));
app.get('/', function (req, res) {
    console.log('/ - Go to /api/images for the Image Processing API.');
    res.status(200).send('/ - Go to /api/images for the Image Processing API.');
});
app.use('/api', index_1.default);
app.listen(port, function () {
    console.log("Server started at http://localhost:" + port);
});
exports.default = app;
