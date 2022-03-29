let pyshell = require('python-shell')

var PiCamera = require('pi-camera')
const Console = require("console");
var myCamera = new PiCamera({
    mode: 'photo',
    output: `test.jpg`,
    width: 640,
    height: 480,
    nopreview: true,
    timeout: 1,
})

function takePhoto() {
    myCamera.snap()
        .then((result) => {
            console.log("took picture")
            let options = {
                args: ['test.jpg']
            }
            pyshell.PythonShell.run('gcp_handler.py', options, function (err, results) {
                if (err) throw err;
                // results is an array consisting of messages collected during execution
                console.log('results', results);
            });
        })
        .catch((error) => {
            // Handle your error
            console.log(error)
        });
}