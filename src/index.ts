import { Command, flags } from '@oclif/command';
import { readFile as readFileNode, writeFile as writeFileNode } from 'fs';
import { promisify } from 'util';

const readFile = promisify(readFileNode)
const writeFile = promisify(writeFileNode)

function addLeadingZero(number: number): string {
  return ("0" + (number + 1)).slice(-2);
}

class Dayone2Bear extends Command {
  static description = 'Import a txt export of DayOne to bear';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
  };

  static args = [{ name: 'file' }];

  async run() {
    const { args } = this.parse(Dayone2Bear)

    const file = await (await readFile(args.file, 'utf8'));
    
    const entries = file
      .split("Date:")
      .map(entry => entry
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== ''))
      .filter(entry => entry.length > 0 && typeof entry !== 'undefined')
      .map(entry => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
        const date = new Date(entry[0].split(" um")[0].replace('ä', 'a').replace('ü', 'u').replace('ö','o'));
        const heading = "# " + date.toLocaleDateString('de-DE', options)
        const text = entry.slice(3).join("\n").replace(/!\[\]\(photos\/[0-9a-z]+\.jpeg\)/ig, "");
        const tag = `#2 - areas/journal/${date.getFullYear()}/${addLeadingZero(date.getMonth())}/${addLeadingZero(date.getDate())}#`
        return {
          heading,
          tag,
          text
        }
      })

    for(let entry of entries) {
      const text = 
`${entry.heading}
----
${entry.tag}
----

${entry.text}
`
      await writeFile(`./export/${entry.heading}.txt`, text, 'utf8');
    }
  }
}

export = Dayone2Bear;
