"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const args = process.argv.slice(2);
let t = 0;
let filename = "table.csv";
let keyword = "value";
let skip = 1;
// read args
while (t + 1 < args.length) {
    const arg = args[t];
    switch (arg) {
        case "--file":
            filename = args[t + 1];
            t++;
            break;
        case "--keyword":
            keyword = args[t + 1];
            t++;
            break;
        case "--skip":
            skip = parseInt(args[t + 1]);
            t++;
            break;
    }
    t++;
}
(0, app_1.default)({
    filename: filename,
    keyword: keyword,
    skip: skip,
}, (arr) => {
    arr.forEach((item, index) => {
        console.log(`[${index}] ${item.name}: ${item.number}`);
    });
});
