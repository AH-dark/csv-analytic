# csv-analytic

分析 CSV 文件的 js 脚本，统计单一关键字对应值的出现次数

## 使用

### CLI

```bash
csv-analytic --file table.csv --keyword client_ip
```

**参数：**

* file: 文件名
* keyword: 关键词
* skip: 跳过行数，即csv表格标题对应行数，默认为1，即标题在第一行。

### Node

```javascript
// es6
import csvAnalytic from "csv-analytic";

csvAnalytic(
    {
        filename: filename,
        keyword: keyword,
        skip: skip,
    },
    (arr) => {
        arr.forEach((item, index) => {
            console.log(`[${index}] ${item.name}: ${item.number}`);
        });
    }
);
```

```javascript
// es5
const csvAnalytic = require("csv-analytic");

csvAnalytic(
    {
        filename: filename,
        keyword: keyword,
        skip: skip,
    },
    (arr) => {
        arr.forEach((item, index) => {
            console.log(`[${index}] ${item.name}: ${item.number}`);
        });
    }
);
```
