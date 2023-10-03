import database from "../../database.json" assert { type: "json" };

import Person from "./person.js";

import {
  TerminalController,
  STOP_TERMINAL_TERM,
} from "./terminalController.js";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database);

async function mainLoop() {
  try {
    const answer = await terminalController.question("What?");

    if (answer === STOP_TERMINAL_TERM) {
      terminalController.closeTerminal();
      return;
    }

    const person = Person.getInformation(answer);

    console.log(person);

    return mainLoop();
  } catch (error) {
    console.error("error", error);
    return mainLoop();
  }
}

await mainLoop();
