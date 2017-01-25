import * as ma from "vsts-task-lib/mock-answer";
import * as tmrm from "vsts-task-lib/mock-run";
import * as path from "path";

const
    TASK_PATH = path.join(__dirname, "..", "bower", "bowertask.js"),

    RUNTIME_PATH = "node_modules/bower/bin/bower",
    RUNTIME_PATH_ABS = path.join(__dirname, "..", "..", RUNTIME_PATH),
    
    tmr = new tmrm.TaskMockRunner(TASK_PATH);

tmr.setInput("command", "install");
tmr.setInput("bowerjson", "bower.json");
tmr.setInput("bowerRuntime", RUNTIME_PATH);

tmr.setAnswers({
    which: {
        "bower": "/bin/bower",
        "npm": "/bin/npm",
    },
    exist: {
        "/bin/bower": false,
        [RUNTIME_PATH_ABS]: false
    },
    checkPath: {
        "bower.json": true,
        "/bin/npm": true,
        "/bin/bower": true
    },
    exec: {
        "/bin/npm install -g bower": {
            code: 0,
            stdout: "[MOCK] NPM installation done!"
        },

        "/bin/bower install --config.interactive=false": {
            code: 0,
            stdout: "[MOCK] Bower installation done!"
        }
    }
});

tmr.run();