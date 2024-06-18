"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path = __importStar(require("path"));
var build_angular_1 = require("@angular-devkit/build-angular");
var architect_1 = require("@angular-devkit/architect");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var rollup_1 = require("rollup");
var discover_packages_1 = require("ng-packagr/lib/ng-package/discover-packages");
var plugin_node_resolve_1 = require("@rollup/plugin-node-resolve");
var plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
var promises_1 = require("fs/promises");
function ngPackagrThenAmdPackage(options, context) {
    var _this = this;
    return (0, rxjs_1.concat)((0, build_angular_1.executeNgPackagrBuilder)(options, context).pipe((0, operators_1.tap)(function (x) {
        if (x.error) {
            context.logger.error(x.error);
        }
    })), (0, rxjs_1.defer)(function () { return __awaiter(_this, void 0, void 0, function () {
        var buildInfo, rollupResult, packageJsonResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, resolveBuildInfo(options, context)];
                case 1:
                    buildInfo = _a.sent();
                    return [4 /*yield*/, rollupFesmToAmd(buildInfo)];
                case 2:
                    rollupResult = _a.sent();
                    if (rollupResult.success !== true) {
                        return [2 /*return*/, rollupResult];
                    }
                    return [4 /*yield*/, writeDistPackageJson(buildInfo)];
                case 3:
                    packageJsonResult = _a.sent();
                    return [2 /*return*/, packageJsonResult];
            }
        });
    }); }));
}
function resolveBuildInfo(options, context) {
    return __awaiter(this, void 0, void 0, function () {
        var root, ngPackagePath, packages, destDir, fesm2020Path, amdName, amdPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    root = context.workspaceRoot;
                    ngPackagePath = path.resolve(root, options.project);
                    return [4 /*yield*/, (0, discover_packages_1.discoverPackages)({ project: ngPackagePath })];
                case 1:
                    packages = _a.sent();
                    destDir = packages.dest;
                    fesm2020Path = packages.primary.destinationFiles.fesm2020;
                    amdName = "".concat(packages.primary.flatModuleFile, ".amd.js");
                    amdPath = path.resolve(destDir, amdName);
                    return [2 /*return*/, {
                            options: options,
                            context: context,
                            packages: packages,
                            ngPackagePath: ngPackagePath,
                            destDir: destDir,
                            fesm2020Path: fesm2020Path,
                            amdName: amdName,
                            amdPath: amdPath
                        }];
            }
        });
    });
}
function rollupFesmToAmd(buildInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var context, fesm2020Path, amdPath, roller, rolled, _i, _a, rollOut, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    context = buildInfo.context, fesm2020Path = buildInfo.fesm2020Path, amdPath = buildInfo.amdPath;
                    context.logger.info("rolling FESM2020 to AMD ".concat(JSON.stringify({
                        fesm2020Path: fesm2020Path,
                        amdPath: amdPath
                    }, null, 2)));
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, rollup_1.rollup)({
                            input: fesm2020Path,
                            plugins: [
                                (0, plugin_node_resolve_1.nodeResolve)({
                                    resolveOnly: function (moduleId) {
                                        var external = false
                                            || moduleId.startsWith('@angular/')
                                            || moduleId.startsWith('@ng-plugins/')
                                            || /^rxjs(\/.+)?/.test(moduleId);
                                        return !external;
                                    },
                                    preferBuiltins: false
                                }),
                                (0, plugin_commonjs_1["default"])()
                            ]
                        })];
                case 2:
                    roller = _b.sent();
                    return [4 /*yield*/, roller.write({
                            format: 'amd',
                            file: amdPath
                        })];
                case 3:
                    rolled = _b.sent();
                    for (_i = 0, _a = rolled.output; _i < _a.length; _i++) {
                        rollOut = _a[_i];
                        context.logger.info("rolled ".concat(rollOut.name, " ").concat(rollOut.type, " ").concat(rollOut.fileName));
                    }
                    return [2 /*return*/, {
                            success: true
                        }];
                case 4:
                    err_1 = _b.sent();
                    context.logger.error('error creating amd module from fesm: ' + err_1);
                    console.error(err_1);
                    return [2 /*return*/, {
                            success: false,
                            error: err_1
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function writeDistPackageJson(buildInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var distPkg, distPkgPath, distPkgContent, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    distPkg = __assign(__assign({}, buildInfo.packages.primary.packageJson), { main: buildInfo.amdName });
                    distPkgPath = path.resolve(buildInfo.packages.primary.destinationPath, 'package.json');
                    distPkgContent = JSON.stringify(distPkg, null, 2);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    buildInfo.context.logger.info("writing dist package to ".concat(distPkgPath));
                    return [4 /*yield*/, (0, promises_1.writeFile)(distPkgPath, distPkgContent)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    buildInfo.context.logger.error("error writing dist package ".concat(distPkgPath, ": ").concat(err_2));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, {
                        target: buildInfo.context.target,
                        success: true
                    }];
            }
        });
    });
}
exports["default"] = (0, architect_1.createBuilder)(ngPackagrThenAmdPackage);
