"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asyncHandler(code) {
    return function (req, res, next) {
        return Promise.resolve(code(req, res, next)).catch(next);
    };
}
exports.default = asyncHandler;
