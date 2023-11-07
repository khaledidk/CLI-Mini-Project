"use strict";
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
const PalindromeCommand_1 = __importDefault(require("./PalindromeCommand"));
const LowerCommand_1 = __importDefault(require("./LowerCommand"));
const DigitsCommand_1 = __importDefault(require("./DigitsCommand"));
const ArmstrongCommand_1 = __importDefault(require("./ArmstrongCommand"));
const NationalizeCommand_1 = __importDefault(require("./NationalizeCommand"));
const ExitCommand_1 = __importDefault(require("./ExitCommand"));
class Executor {
    constructor() {
        this.commands = [];
        this.commands = [
            new PalindromeCommand_1.default('Palindrome'),
            new LowerCommand_1.default('Lower'),
            new DigitsCommand_1.default('Digits'),
            new ArmstrongCommand_1.default('Armstrong'),
            new NationalizeCommand_1.default('Nationalize'),
            new ExitCommand_1.default('Exit'),
        ];
    }
    executeCommand(commandNumber, input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (commandNumber >= 1 && commandNumber <= this.commands.length) {
                const result = yield this.commands[commandNumber - 1].execute(input);
                return result;
            }
            else {
                return 'Invalid command number';
            }
        });
    }
    showCommands() {
        console.log('Available Commands:');
        this.commands.forEach((command, index) => {
            console.log(`${index + 1}: ${command.name}`);
        });
    }
}
exports.default = Executor;
