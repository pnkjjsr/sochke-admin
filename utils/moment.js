var moment = require("moment");

export default class Moment {
  constructor() {}

  format = e => {
    let formated = moment(e).format("ddd, DD MMMM");
    return formated;
  };

  dob = e => {
    let dob = {};
    dob.date = moment(e).format("D");
    dob.month = moment(e).format("MMMM");
    dob.year = moment(e).format("YYYY");
    return dob;
  };
}
