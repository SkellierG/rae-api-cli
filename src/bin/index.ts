#!/usr/bin/env node

import { Command, Option } from "commander";
import app from "./../../package.json" with { type: "json" };
import { getDaily } from "../daily.js";
import { getRandom } from "../random.js";

const program = new Command("rae");

//console.log("process.argv", process.argv, process.argv0, "\n\n");

program
  .version(app.version)
  .description(`
https://rae-api.com/ nodejs cli tool
`);

program
  .command("daily")
  .description("get daily word")
  .action(async () => {
    await getDaily()
      .then((result) => {
        if (result == null) throw new Error("getDaily() function returned null");
        console.log(result.data.word);
      })
      .catch((err) => {
        console.error(err);
      })
  })

program
  .command("random")
  .description("get a random word of the rae dictionary")
  .addOption(new Option("-m, --min-length <integer>", "minimum length of the random word").default(3, "3 length word"))
  .option("-x, --max-length <integer>", "maximum length of the random word")
  .action(async (options) => {
    try {
      if (options.minLength) options.minLength -= 0;

      if (options.maxLength) options.maxLength -= 0;

      if ((Number.isNaN(options.minLength) && options.minLength !== undefined) || (Number.isNaN(options.maxLength) && options.maxLength !== undefined)) {
        throw new Error("flag needs to be a number");
      }
    } catch (error: any) {
      console.log("error: " + (error as Error).message);
      return;
    }

    await getRandom({ min_length: options.minLength, max_length: options.maxLength })
      .then((result) => {
        if (result == null) throw new Error("getRandom({ min_length, max_length })");
        console.log(result.data.word);
      })
      .catch((err) => {
        console.error(err);
      })
  })

program
  .command("words")
  .description("get information about an existing word from the dictionary")
  .argument("<word>", "the word you want to know")
  .action((str) => {
    console.info(str)
  })

program
  .parse(process.argv);
