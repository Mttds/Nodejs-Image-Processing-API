"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var images = express_1.default.Router();
var PROJECT_FOLDER = process.env.PWD;
var INPUT_FOLDER = path_1.default.join(PROJECT_FOLDER, '/assets/image-uploader/in');
var SAVED_THUMBS_FOLDER = path_1.default.join(PROJECT_FOLDER, '/assets/image-uploader/thumbs');
var REL_INPUT_FOLDER = 'image-uploader/in';
var REL_SAVED_THUMBS_FOLDER = 'image-uploader/thumbs';
var Image = /** @class */ (function () {
    /*
    Constructor
    */
    function Image(image, width, height) {
        var _this = this;
        this.checkFile = function (fullpath) { return __awaiter(_this, void 0, void 0, function () {
            var check, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("checkFile call...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs_1.promises.stat(fullpath)];
                    case 2:
                        check = _a.sent();
                        console.log(check, check.isFile());
                        if (check.isFile())
                            return [2 /*return*/, Promise.resolve(true)];
                        return [2 /*return*/, Promise.resolve(false)];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, Promise.resolve(false)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.image = image;
        this.width = width;
        this.height = height;
        this.thumbsImage = image + "_" + width + "_" + height;
    }
    /*
    Getters.
    */
    Image.prototype.getImage = function () { return this.image; };
    ;
    Image.prototype.getThumbsImage = function () { return this.thumbsImage; };
    ;
    Image.prototype.getWidth = function () { return this.width; };
    ;
    Image.prototype.getHeight = function () { return this.height; };
    ;
    /*
    Methods.
    */
    Image.prototype.getImagePath = function () {
        return path_1.default.join(INPUT_FOLDER, this.image + ".jpg");
        //`${INPUT_FOLDER}/${this.image}.jpg`;
    };
    Image.prototype.getThumbsImagePath = function () {
        return path_1.default.join(SAVED_THUMBS_FOLDER, this.image + "_" + this.width + "_" + this.height + ".jpg");
        //`${SAVED_THUMBS_FOLDER}/${this.image}_${this.width}_${this.height}.jpg`;
    };
    Image.prototype.getImageRelativePath = function () {
        return "" + REL_INPUT_FOLDER;
    };
    Image.prototype.getThumbsImageRelativePath = function () {
        return "" + REL_SAVED_THUMBS_FOLDER;
    };
    Image.prototype.checkImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Checking image " + this.getImagePath());
                        return [4 /*yield*/, this.checkFile(this.getImagePath())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Image.prototype.checkThumbsImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Checking image " + this.getThumbsImagePath());
                        return [4 /*yield*/, this.checkFile(this.getThumbsImagePath())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Image.prototype.sharpImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newData, _a, _b, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("Resizing image " + this.image + " into " + this.getThumbsImagePath());
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, this.checkThumbsImage()];
                    case 2:
                        if (!!(_c.sent())) return [3 /*break*/, 6];
                        console.log("Image " + this.image + " does not exist. Processing...");
                        console.log("Width: " + this.width + " | Height: " + this.height);
                        return [4 /*yield*/, fs_1.promises.open(this.getThumbsImagePath(), "w+")];
                    case 3:
                        newData = _c.sent();
                        console.log("Input: " + this.width + " - " + this.height);
                        _b = (_a = newData).write;
                        return [4 /*yield*/, (0, sharp_1.default)(this.getImagePath()).resize((this.width), (this.height)).toBuffer()];
                    case 4: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 5:
                        _c.sent();
                        newData.close();
                        return [3 /*break*/, 7];
                    case 6:
                        console.log("Image " + this.getThumbsImagePath() + " already exists. Rendering existing cached image...");
                        _c.label = 7;
                    case 7: return [2 /*return*/, Promise.resolve(this)]; // or just return this which is implicitly a Promies<Image>
                    case 8:
                        err_1 = _c.sent();
                        console.log("Error: " + err_1);
                        return [2 /*return*/, Promise.reject(this)];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ;
    return Image;
}());
images.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var queryParamImage, queryParamWidth, queryParamHeight, img, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Images API route');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                queryParamImage = req.query.image;
                queryParamWidth = req.query.width;
                queryParamHeight = req.query.height;
                if (!(req.query.image && req.query.width && req.query.height)) return [3 /*break*/, 6];
                img = new Image(queryParamImage, parseInt(queryParamWidth), parseInt(queryParamHeight));
                console.log(img);
                return [4 /*yield*/, img.checkImage()];
            case 2:
                if (!_a.sent()) return [3 /*break*/, 4];
                return [4 /*yield*/, img.sharpImage()];
            case 3:
                _a.sent();
                console.log("Processed image " + img.getImage() + "!");
                res.set('Connection', 'close');
                res.status(200).render('pages/images', { imagefile: img.getThumbsImageRelativePath() + "/" + img.getThumbsImage() + ".jpg" });
                return [3 /*break*/, 5];
            case 4:
                console.log("Image not found!");
                res.set('Connection', 'close');
                res.status(400).send("Image not found!");
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                console.log("Missing URL params!");
                res.set('Connection', 'close');
                res.status(400).send("Image not found!");
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                e_2 = _a.sent();
                console.log("Error at endpoint /api/images:", e_2);
                res.set('Connection', 'close');
                res.status(500).send("Image not found!");
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
module.exports = images;
