async function async_await() {
    for (var i = 0; i < 3; i++) {
        const responce = await fireReq();
        processData(responce);
    }
}
function fireReq() {
    return new Promise(function (resolve, reject) {
        let r = Math.random() * 5000;
        setTimeout(function () { resolve(r); }, r);
    });
}
function processData(data) {
    if (data <= 2500) console.log("Ok " + data); else console.log("timeout " + data);
}
function promises() {

    function A() {
        return new Promise(function (resolve, reject) {
            let r = Math.random() * 5000;
            setTimeout(() => resolve(r), r);
        });
    }
    A().then(function (data) { processData(data); return A(); }, null)
        .then(function (data) { processData(data); return A(); }, null)
        .then(processData, null);
}
function generators_async() {
    function fireReq() {
        let r = Math.random() * 5000;
        setTimeout(function () { controller.next(r); }, r);
    }
    function* generator() {
        for (let i = 0; i < 3; i++) {
            fireReq();
            let responce = yield;
            processData(responce);
        }
    }
    const controller = generator();
    controller.next();
}