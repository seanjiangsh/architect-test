import dynamoose from "dynamoose";

const ARC_APP_NAME = process.env.ARC_APP_NAME || "architect-test";
const ARC_ENV = process.env.ARC_ENV || "testing";
const isDev = ARC_ENV === "testing";
if (isDev) {
  // console.log("Using local DynamoDB for development");
  // dynamoose.aws.ddb.local("http://localhost:5555");
  // dynamoose.logger().then((logger) => logger.providers.set(console));
}

const db = dynamoose;
export default db;

export const tablePrefix = `${ARC_APP_NAME}-${ARC_ENV}`;
