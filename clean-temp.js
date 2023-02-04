const fs = require('fs')
const path = require('path')
const { execSync } = require("child_process")

function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), [])
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory())
}

function getDirectoriesRecursive(srcpath) {
  return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))]
}

const bundledDirs = getDirectoriesRecursive('./src').filter((s) => s.match(/.*\/bundled$/))

bundledDirs.forEach((bundled) => {
  const keynote = bundled.replace('bundled', 'keynote/index.pdf')
  execSync(`rm -r ${bundled} && rm ${keynote}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`)
        return
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
    }
    console.log(`stdout: ${stdout}`)
  })
})
