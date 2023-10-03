import draftlog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";

import database from "../../database.json" assert { type: "json" };

draftlog(console).addLineListener(process.stdin);

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.magenta("Vehicles") },
    { field: "kmTraveled", name: chalk.cyan("KM Traveled") },
    { field: "from", name: chalk.cyan("From") },
    { field: "to", name: chalk.cyan("To") },
  ],
};

console.draft(chalkTable(options, database));
