"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
instead of writing try catch block inside every middleware
and pass err to next express function
wrappe it inside async handler
which calles the middleware inside try catch automatically
*/
function asyncHandler(code) {
    return function (req, res, next) {
        return Promise.resolve(code(req, res, next)).catch(next);
    };
}
exports.default = asyncHandler;
