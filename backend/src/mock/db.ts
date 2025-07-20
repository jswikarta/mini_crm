import fs from "fs";
import path from "path";

const fsPath = path.join(__dirname, "./db.json");
const fsRead = fs.readFileSync(fsPath, "utf-8");
const fsData = JSON.parse(fsRead);

export default fsData;
