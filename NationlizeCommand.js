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
// import * as fs from 'fs';
// import axios from 'axios';
class NationalizeCommand extends Commands {
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.get(`https://api.nationalize.io?name=${input}`);
                const data = response.data;
                if (data.country.length > 0) {
                    const countryISO = data.country[0].country_id;
                    const probability = data.country[0].probability * 100;
                    const countryName = this.getCountryName(countryISO);
                    return `${countryName} ${probability.toFixed(1)}%`;
                }
                else {
                    return 'Nationality data not found';
                }
            }
            catch (error) {
                return 'Error fetching nationality data';
            }
        });
    }
    constructor(name) {
        super(name);
        this.fs = require('fs');
        this.axios = require('axios');
        this.countryMappings = this.loadCountryMappings();
    }
    loadCountryMappings() {
        try {
            const rawMappings = this.fs.readFileSync('./data/countryISO2Name.json', 'utf8');
            return JSON.parse(rawMappings);
        }
        catch (error) {
            console.error('Error loading country mappings:', error);
            return {};
        }
    }
    getCountryName(countryISO) {
        const countryName = this.countryMappings[countryISO];
        return countryName || 'Unknown Country';
    }
}
