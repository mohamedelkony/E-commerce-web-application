f; /*
try catch in async code still can fire errors
if the awaited promise is fireing another promise
*/
function start_promise() {
    return new Promise((res, rej) => {
        var rand = Math.floor(Math.random() * 10);
        setTimeout(async () => {
            if (rand > 9)
                rej(rand);
            else {
                res(rand);
                try {
                    await start_promise2();
                }
                catch (error) {
                    console.log('p2' + error);
                }
            }
        }, rand);
    });
}
function start_promise2() {
    return new Promise((res, rej) => {
        var rand = Math.floor(Math.random() * 3);
        setTimeout(() => {
            rej(rand);
        }, rand);
    });
}
async function test() {
    try {
        let res = await start_promise();
        console.log('succes:' + res);
    }
    catch (err) {
        console.log('error :' + err);
    }
}
test();
