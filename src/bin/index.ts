#!/usr/bin/env node

import { Command, Option } from "commander";
import app from "./../../package.json" with { type: "json" };
import { getDaily } from "../daily.js";
import { getRandom } from "../random.js";
import { getWords } from "../words.js";

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

      if (options.maxLength < options.minLength) {
        throw new Error("maximum needs to be equal or greater than minimum")
      }
    } catch (error: any) {
      console.log("error: " + (error as Error).message);
      return;
    }

    await getRandom({ min_length: options.minLength, max_length: options.maxLength })
      .then((result) => {
        if (result == null) throw new Error("getRandom({ min_length, max_length }) function returned null");
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
  .addOption(new Option("-o, --origin", "the origin of the word if there are any").default(false, "don't show the meanings"))
  .addOption(new Option("-s, --senses", "the posible senses of a word and how it is used").default(false, "don't show anything"))
  .action(async (str, options) => {
    //console.info(str)
    //console.info(options)

    try {
      const test = str - 0;
      if (!Number.isNaN(test)) throw new Error("<word> needs to be a string")
    } catch (error) {
      console.error("error: " + (error as Error).message);
      return;
    }

    await getWords({ palabra: str })
      .then((result) => {
        if (result == null) throw new Error("getWords({ palabra }) function returned null");
        console.log(result.data.word)

        if (options.origin) {
          for (let meaning of result.data.meanings) {
            console.log(meaning.origin.raw);
          }
        }

        if (options.senses) {
          for (let meaning of result.data.meanings) {
            for (let sense of meaning.senses) {
              console.log(sense.meaning_number + ": " + sense.description)
            }
          }
        }

      })
      .catch((error) => {
        console.error(error);
      })
  })

program
  .parse(process.argv);
