const { spawn } = require('child_process')
const ls = spawn(
    process.platform === 'win32' ? 'npm.cmd' : npm,
    ['i','h-myserver'],
    {
	    cwd: process.cwd()
    })

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`子进程退出码：${code}`);
});
