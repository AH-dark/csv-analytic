import readline from "readline";
import * as fs from "fs";

export interface CsvAnalyticOptions {
    filename: string;
    keyword: string;
    skip: number;
    log?: boolean;
}

export interface CsvAnalyticResultArr {
    name: string;
    number: number;
}

export interface CsvAnalyticCallable {
    (Arr: CsvAnalyticResultArr[]): any;
}

export interface CsvAnalytic {
    (options: CsvAnalyticOptions, call: CsvAnalyticCallable): void;
}

interface HashTable {
    [K: string]: number;
}

const csvAnalytic: CsvAnalytic = (options, call) => {
    // init log
    if (!!options.log) {
        console.log("--------------------");
        console.log("[CSV Analytic]", "Filename:", options.filename);
        console.log("[CSV Analytic]", "Keyword:", options.keyword);
        console.log("[CSV Analytic]", "Skip:", options.skip);
        console.log("--------------------");
    }

    let hash: HashTable = {};
    let lineNum = 0;
    let keyPosition = -1;

    const readStream = readline.createInterface({
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
        } else if (lineNum > options.skip) {
            if (
                typeof hash[data[keyPosition]] === "undefined" ||
                hash[data[keyPosition]] === null
            ) {
                hash[data[keyPosition]] = 0;
            } else {
                hash[data[keyPosition]]++;
            }
        }
    });

    readStream.on("close", () => {
        let arr: CsvAnalyticResultArr[] = [];
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

export default csvAnalytic;
