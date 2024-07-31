"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStackTrace = getStackTrace;
function getStackTrace() {
    const { stack } = new Error();
    return stack
        .replace(/.*[\\/]node_modules[\\/].*/gm, "")
        .replace(/\n+/g, "\n");
}
