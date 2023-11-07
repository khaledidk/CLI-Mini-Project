import * as fs from 'fs';
import axios from 'axios';
import Commands from './Command';
 class NationalizeCommand extends Commands {
    // private fs = require('fs');
    // private axios = require('axios');

  private countryMappings: Record<string, string>;

  async execute(input: string): Promise<string> {
    try {
      const response = await axios.get(`https://api.nationalize.io?name=${input}`);
      const data = response.data.country;
      data.sort((a: { probability: number; }, b: { probability: number; }) => b.probability - a.probability);
      if (data.length > 0) {
        const countryISO = data[0].country_id;
        const probability = data[0].probability * 100;
        const countryName = this.getCountryName(countryISO);
        return `${countryName} ${probability.toFixed(1)}%`;
      } else {
        return 'Nationality data not found';
      }
    } catch (error) {
      return 'Error fetching nationality data';
    }
  }

  constructor(name: string) {
    super(name);
    this.countryMappings = this.loadCountryMappings();
  }

  private loadCountryMappings(): Record<string, string> {
    try {
      const rawMappings = fs.readFileSync('./data/countryISO2Name.json', 'utf8');
      return JSON.parse(rawMappings);
    } catch (error) {
      console.error('Error loading country mappings:', error);
      return {};
    }
  }

  private getCountryName(countryISO: string): string {
    const countryName = this.countryMappings[countryISO];
    return countryName || 'Unknown Country';
  }


}
export default NationalizeCommand;
