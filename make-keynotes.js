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

const keynoteDirs = getDirectoriesRecursive('./src').filter((s) => s.match(/.*\/keynote$/))

keynoteDirs.forEach((keynote) => {
  execSync(`cd ${keynote} && npm ci && npm run pdf && npm run bundle && mv bundled ../ && rm -rf node_modules`, (error, stdout, stderr) => {
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
