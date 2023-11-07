class Commands {
    name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  
    async execute(input: string): Promise<string> {
      return 'Not implemented';
    }
  
  }
  export default Commands;