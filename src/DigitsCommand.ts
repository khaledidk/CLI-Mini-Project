import Commands from './Command';
class DigitsCommand extends Commands {
  async execute(input: string): Promise<string> {
      return input.match(/^\d+$/) ? 'Yes, all characters are digits' : 'No, not all characters are digits';
    }
  }
  export default DigitsCommand;