import fs from 'fs';

export class Livsmedel {
    constructor() {
    }

    static livsmedel() {
        return JSON.parse(fs.readFileSync(__dirname + '/../data/livsmedelsdata.json', 'utf8'));
    }
}