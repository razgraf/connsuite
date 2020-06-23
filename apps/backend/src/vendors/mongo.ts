import mongoose from "mongoose";

const connection =
  process.env.NODE_ENV === "production"
    ? process.env.CONN_BACK_MONGO_PRODUCTION
    : process.env.CONN_BACK_MONGO_DEVELOPMENT;

function config(): void {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(connection || "", { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log("Connected to Mongo DB."),
  );
}

const status = (): any => mongoose.connection.readyState;

const mongo = {
  config,
  status,
};

export default mongo;
