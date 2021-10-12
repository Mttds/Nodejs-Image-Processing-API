"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logger_1 = __importDefault(require("../middleware/logger"));
var images_1 = __importDefault(require("./api/images"));
var routes = express_1.default.Router();
routes.get('/', logger_1.default, function (req, res) {
    console.log('/api - Go to /api/images for the Image Processing API.');
    res.send('/api - Go to /api/images for the Image Processing API.');
});
routes.use('/images', images_1.default);
exports.default = routes;
