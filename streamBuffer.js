const fs = require("fs");

const readableStream = fs.createReadStream(`${__dirname}/bigdata.txt`, {
  encoding: "utf8",
});

const writeableStream = fs.createWriteStream(`${__dirname}/bigdata2.txt`);

readableStream.on("data", (chunk) => {
  writeableStream.write(chunk);
});
readableStream.on("end", () => {
  console.log("Data transfered");
});

readableStream.pipe(writeableStream);
