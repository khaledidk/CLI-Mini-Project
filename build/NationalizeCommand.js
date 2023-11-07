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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
const Command_1 = __importDefault(require("./Command"));
class NationalizeCommand extends Command_1.default {
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`https://api.nationalize.io?name=${input}`);
                const data = response.data.country;
                data.sort((a, b) => b.probability - a.probability);
                if (data.length > 0) {
                    const countryISO = data[0].country_id;
                    const probability = data[0].probability * 100;
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
        this.countryMappings = this.loadCountryMappings();
    }
    loadCountryMappings() {
        try {
            const rawMappings = fs.readFileSync('../data/countryISO2Name.json', 'utf8');
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
exports.default = NationalizeCommand;
