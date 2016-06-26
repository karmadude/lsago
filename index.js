#!/usr/bin/env node

const split = require("split");
const through2 = require("through2");
const moment = require("moment");
const $p = require('procstreams');

const dateFormat = "MMM-D-YYYY-HH:mm:ss";
const agoColLength = 18;

function ago(date) {
  var d = moment(date, dateFormat);
  if (d.isValid()) {
    return d.fromNow(true);
  } else {
    throw Error(`Invalid date ${date}`);
  }
}

function transformLine(chunk, enc, cb) {
    let line = chunk.toString();
    let data = line.split(",");
    let date = "";

    if (data[1]) {
      date = data[1].split("-").map((d, i) => {
            if (i == 1 && d < 10) {
              return ` ${d}`;
            } else {
              return d;
            }
          }).join(" ");
    }

    try {
      let agoText = ago(data[1]).split(" ").map((d, i) => {
        if (i == 0) {
          return (d === "a") ? " a"
            : (d < 10) ? " " + d
            : d;
        } else {
          return d;
        }
      }).join(" ");

      let padding = agoColLength - agoText.length;

      if (padding > 0) {
        agoText += ".".repeat(padding) ;
      }

      cb(null, `${date}  ${agoText}  ${data[0]}\n`);
    } catch(e) {
      cb(null, `${line}\n`);
    }
  }

// ls -lT | awk '{ str=""; for(i=10; i<=NF; i++) str=str $i; print str "," $6 "-" $7 "-" $9 "-" $8 }'
$p("ls -lT")
  .pipe('awk \'{ str=""; for(i=10; i<=NF; i++) str = str $i; print str "," $6 "-" $7 "-" $9 "-" $8 }\'')
  .pipe(split())
  .pipe(through2(transformLine))
  .out();
