import readline from "readline";

import draftlog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";

import Person from "./person.js";

export const STOP_TERMINAL_TERM = ":q";

export class TerminalController {
  constructor() {
    this.print = {};
    this.data = [];
    this.terminal = {};
  }

  initializeTerminal(database) {
    draftlog(console).addLineListener(process.stdin);

    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database);
  }

  closeTerminal() {
    console.log("Terminal closed");
    this.terminal.close();
  }

  initializeTable(database) {
    this.data = database;

    const data = database.map((item) => new Person(item).format());

    this.print = console.draft(chalkTable(this.setTableOptions(), data));
  }

  updateTable(item) {
    this.data.push(item);

    const data = this.data.map((item) => new Person(item).format());

    this.print = console.draft(chalkTable(this.setTableOptions(), data));
  }

  question(message = "") {
    return new Promise((resolve) =>
      this.terminal.question(`${message} `, resolve)
    );
  }

  setTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("KM Traveled") },
        { field: "from", name: chalk.cyan("From") },
        { field: "to", name: chalk.cyan("To") },
        { field: "value", name: chalk.cyan("Value") },
      ],
    };
  }
}
