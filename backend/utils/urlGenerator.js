// import DataUrlParser from "datauri/parser.js";

import DataUrlParser from "datauri/parser.js";
const parser = new DataUrlParser();

const getDataURL = (file) => {
  return parser.format(file.originalname, file.buffer); // pass full name
};

export default getDataURL;
