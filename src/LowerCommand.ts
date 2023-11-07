import Commands from './Command';
class LowerCommand extends Commands {
  async execute(input: string): Promise<string> {
      return input === input.toLowerCase() ? 'Yes, all characters are lowercase' : 'No, not all characters are lowercase';
    }
  }
  export default LowerCommand;