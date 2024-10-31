const child_process = require("child_process")
const { exec } = child_process
exec("node ./index.js", (error, stdout, stderr) => {
    console.log("stdout", stdout)
})
