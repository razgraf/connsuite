import mongoose from "mongoose";

function config(): void {
  mongoose.connect(process.env.NODE_ENV_MONGO || "", { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log("Connected to Mongo DB."),
  );
}

const mongo = {
  config,
};

export default mongo;
