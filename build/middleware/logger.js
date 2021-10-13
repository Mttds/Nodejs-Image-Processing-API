"use strict";
// Need to add TypeScript types because it is not
// an express object and thus it does not have
// default types added with: npm i --save-dev @types/express
var logger = function (req, res, next) {
    console.log("[INFO] - route " + req.route);
    next();
};
module.exports = logger;
