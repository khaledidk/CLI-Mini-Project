
import Commands from './Command';
class ExitCommand extends Commands {
    async execute(input: string): Promise<string> {
      process.exit(0);
      return 'Exiting...'; // This line won't be reached
}
}
export default ExitCommand;