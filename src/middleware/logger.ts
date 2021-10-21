import express from 'express';

// Need to add TypeScript types because it is not
// an express object and thus it does not have
// default types added with: npm i --save-dev @types/express
const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  console.log(`[INFO] - HTTP status ${res.statusCode}`);
  next();
};

export = logger;
