const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml');

console.log('start read')
const out = []
let re = /---(.*?)---/s
const regSummary = /---\n([^---]*?)<!--\smore\s-->/sg

function readAll(parentPath) {
  try {
    const files = fs.readdirSync(parentPath).filter(x => x !== 'images' && (/\.md$/.test(x) || /^[^.]/.test(x)))
    files.map(item => {
      let tempPath = path.join(parentPath, item);
      let stats = fs.statSync(tempPath);
      if (stats.isDirectory()) {
        readAll(tempPath);
      } else {
        const content = fs.readFileSync(tempPath, 'utf8')
        let s = re.exec(content)
        re.lastIndex = 0
        if (s) {
          let docs = yaml.load(s[1])
          docs.link = tempPath.slice(6, -3)
          const matchedSummary = regSummary.exec(content)
          if (matchedSummary) {
	          docs.summary = matchedSummary[1]
	        }

	        if (!!docs.title) {
	          out.push(docs);
	        }
        }
      }
    })
  } catch (e) {
    console.warn(e)
    return out
  }
}
readAll('./source/_posts')

const filePath = 'source/.vitepress/theme/data/docs.json';

out.sort((a, b) => {
	if (a.date > b.date) return -1
	else if (a.date < b.date) return 1
	else return 0
})

fs.writeFileSync(
  filePath,
  JSON.stringify(out),
  {
    encoding: 'utf8',
  }
);