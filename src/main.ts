
import * as readline from 'readline';
import Executor from './Executor';



async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const executor = new Executor();
  console.log('Welcome to the CLI Application');

  while (true) {
    executor.showCommands();
    const commandNumber = await prompt(rl, 'Choose a command number: ');
    const commandNumberInt = parseInt(commandNumber, 10);
    if (!isNaN(commandNumberInt) && commandNumberInt >= 1 && commandNumberInt <= 6) {
      if (commandNumberInt === 6) {
        executor.executeCommand(6, '');
      } else {
        const input = await prompt(rl, 'Enter an input: ');
        const result = await executor.executeCommand(commandNumberInt, input);
        console.log(`Result: ${result}\n`);
      }
    } else {
      console.log('Please enter a number from 1 to 6');
    }
  }

}

async function prompt(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}
main();