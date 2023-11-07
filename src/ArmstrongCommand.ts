import Commands from './Command';
class ArmstrongCommand extends Commands {
  async execute(input: string): Promise<string> {
      const num = parseInt(input, 10);
      const digits = input.split('').map(Number);
      const power = digits.length;
      const sum = digits.reduce((acc, digit) => acc + digit ** power, 0);
      return num === sum ? 'Yes, it is an Armstrong number' : 'No, it is not an Armstrong number';
    }
  }
  export default ArmstrongCommand;