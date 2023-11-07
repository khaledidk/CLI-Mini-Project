import Commands from './Command';
class PalindromeCommand extends Commands {
  async execute(input: string): Promise<string> {
      const reversed = input.split('').reverse().join('');
      return input === reversed ? 'Yes, it is a palindrome' : 'No, it is not a palindrome';
    }
  }
  export default PalindromeCommand;