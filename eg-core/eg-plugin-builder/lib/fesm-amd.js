"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.__esModule = true;
var path = __importStar(require("path"));
var build_angular_1 = require("@angular-devkit/build-angular");
var architect_1 = require("@angular-devkit/architect");
var rxjs_1 = require("rxjs");
var rollup_1 = require("rollup");
var discover_packages_1 = require("ng-packagr/lib/ng-package/discover-packages");
function ngPackagrThenAmd(options, context) {
    return (0, rxjs_1.concat)((0, build_angular_1.executeNgPackagrBuilder)(options, context), (0, rxjs_1.defer)(function () { return rollupFesmToAmd(options, context); }));
}
function rollupFesmToAmd(options, context) {
    return __awaiter(this, void 0, void 0, function () {
        var root, ngPackagePath, packages, destDir, fesm2020Path, fesm2020UmdName, fesm2020UmdPath, roller, rolled, _i, _a, rollOut, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    root = context.workspaceRoot;
                    ngPackagePath = path.resolve(root, options.project);
                    return [4 /*yield*/, (0, discover_packages_1.discoverPackages)({ project: ngPackagePath })];
                case 1:
                    packages = _b.sent();
                    destDir = packages.dest;
                    fesm2020Path = packages.primary.destinationFiles.fesm2020;
                    fesm2020UmdName = "".concat(packages.primary.flatModuleFile, ".fesm2020.amd.js");
                    fesm2020UmdPath = path.resolve(destDir, fesm2020UmdName);
                    context.logger.info("rolling FESM2020 to UMD ".concat(JSON.stringify({
                        fesm2020Path: fesm2020Path,
                        fesm2020UmdPath: fesm2020UmdPath
                    }, null, 2)));
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, (0, rollup_1.rollup)({
                            input: fesm2020Path,
                            external: function (moduleId) {
                                context.logger.info("test module id ".concat(moduleId));
                                return false
                                    || moduleId.startsWith('@angular/')
                                    || moduleId.startsWith('@ng-plugins/');
                            }
                        })];
                case 3:
                    roller = _b.sent();
                    return [4 /*yield*/, roller.write({
                            format: 'amd',
                            file: fesm2020UmdPath
                        })];
                case 4:
                    rolled = _b.sent();
                    for (_i = 0, _a = rolled.output; _i < _a.length; _i++) {
                        rollOut = _a[_i];
                        context.logger.info("rolled ".concat(rollOut.name, " ").concat(rollOut.type, " ").concat(rollOut.fileName));
                    }
                    return [2 /*return*/, {
                            success: true
                        }];
                case 5:
                    err_1 = _b.sent();
                    return [2 /*return*/, {
                            success: false,
                            error: err_1
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = (0, architect_1.createBuilder)(ngPackagrThenAmd);
