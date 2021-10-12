"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
require('console-stamp')(console, '[HH:MM:ss.l]');
var app = (0, express_1.default)();
var port = 3001;
app.get('/', function (req, res) {
    res.send('Go to /api/images for the Image Processing API.');
});
app.use('/api', index_1.default);
app.listen(port, function () {
    console.log("Server started at http://localhost:" + port);
});
