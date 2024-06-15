import mongoose from "mongoose";
import config from "../../enviorments";
import log from "../utils/logger";


function connect() {
  const { DB } = config;

  const db_config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  return mongoose
    .connect(DB)
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
      process.exit(1);
    });
}

export default connect;