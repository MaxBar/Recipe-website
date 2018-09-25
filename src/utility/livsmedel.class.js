import fs from 'fs';

export class Livsmedel {
    constructor() {
        //this.livsmedel = JSON.parse(fs.readFileSync(__dirname + '/../../data/livsmedelsdata.json', 'utf8'));
    }

    static livsmedel() {
        //this._livsmedel = this.livsmedel = JSON.parse(fs.readFileSync(__dirname + '/../../data/livsmedelsdata.json', 'utf8'));
        return JSON.parse(fs.readFileSync(__dirname + '/../data/livsmedelsdata.json', 'utf8'));
    }

    /*static livsmedel() {
        return this._livsmedel;
    }*/
}