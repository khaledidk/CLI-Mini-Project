import Commands from './Command';
import PalindromeCommand from './PalindromeCommand';

import LowerCommand from './LowerCommand';
import DigitsCommand from './DigitsCommand';
import ArmstrongCommand from './ArmstrongCommand';
import NationalizeCommand from './NationalizeCommand';
import ExitCommand from './ExitCommand';

class Executor {
  commands: Commands[] = [];

  constructor() {
    this.commands = [
      new PalindromeCommand('Palindrome'),
      new LowerCommand('Lower'),
      new DigitsCommand('Digits'),
      new ArmstrongCommand('Armstrong'),
      new NationalizeCommand('Nationalize'),
      new ExitCommand('Exit'),
    ];
  }

  async executeCommand(commandNumber: number, input: string): Promise<string> {
    if (commandNumber >= 1 && commandNumber <= this.commands.length) {
      const result = await this.commands[commandNumber - 1].execute(input);
      return result;
    } else {
      return 'Invalid command number';
    }
  }

  showCommands(): void {
    console.log('Available Commands:');
    this.commands.forEach((command, index) => {
      console.log(`${index + 1}: ${command.name}`);
    });
  }
}
export default Executor;





