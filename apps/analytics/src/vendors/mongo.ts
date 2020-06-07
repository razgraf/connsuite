import mongoose from "mongoose";

function config(): void {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(process.env.CONN_BACK_MONGO || "", { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log("Connected to Mongo DB."),
  );
}

const mongo = {
  config,
};

export default mongo;
