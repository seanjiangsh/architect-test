import fs from "fs";

import inventory from "@architect/inventory";
import pkg from "@architect/package";

const start = async () => {
  // read the raw arc file using fs
  const rawArc = fs.readFileSync("./app.arc").toString();

  // export as sam
  const inv = await inventory({ rawArc, deployStage: "staging" });
  const sam = pkg(inv);
  console.log(sam);

  // write to a file
  fs.writeFileSync("./sam.json", JSON.stringify(sam, null, 2));
};

start();
