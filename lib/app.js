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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const fs = __importStar(require("fs"));
const csvAnalytic = (options, call) => {
    // init log
    if (!!options.log) {
        console.log("--------------------");
        console.log("[CSV Analytic]", "Filename:", options.filename);
        console.log("[CSV Analytic]", "Keyword:", options.keyword);
        console.log("[CSV Analytic]", "Skip:", options.skip);
        console.log("--------------------");
    }
    let hash = {};
    let lineNum = 0;
    let keyPosition = -1;
    const readStream = readline_1.default.createInterface({
        input: fs.createReadStream(options.filename),
    });
    readStream.on("line", (line) => {
        lineNum++;
        const data = line.split(",");
        if (lineNum === options.skip) {
            for (let i = 0; i < data.length; i++) {
                if (data[i] === options.keyword) {
                    keyPosition = i;
                    return;
                }
            }
            throw Error("Could not find keyword.");
        }
        else if (lineNum > options.skip) {
            if (typeof hash[data[keyPosition]] === "undefined" ||
                hash[data[keyPosition]] === null) {
                hash[data[keyPosition]] = 0;
            }
            else {
                hash[data[keyPosition]]++;
            }
        }
    });
    readStream.on("close", () => {
        let arr = [];
        for (let hashKey in hash) {
            arr.push({
                name: hashKey,
                number: hash[hashKey],
            });
        }
        arr.sort((a, b) => {
            return b.number - a.number;
        });
        call(arr);
    });
};
exports.default = csvAnalytic;
