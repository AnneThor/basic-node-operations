const fs = require("fs");

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch(command) {
    case "cat":
    commandLibrary.cat(userInputArray.slice(1));
    break;

    case "echo":
    commandLibrary.echo(userInputArray.slice(1).join(" "));
    break;

    case "sort":
    commandLibrary.sort(userInputArray.slice(1));
    break;

    case "head":
    commandLibrary.head(userInputArray.slice(1));
    break;

    case "tail":
    commandLibrary.tail(userInputArray.slice(1));
    break;

    case "uniq":
    commandLibrary.uniq(userInputArray.slice(1));
    break;

    case "wc":
    commandLibrary.wc(userInputArray.slice(1));
    break;

    default:
    done("You have entered an invalid command");
    break;
  }
};

const commandLibrary = {
  //the cat command
  "cat": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    })
  },
  //the echo command
  "echo": function(userInput) {
    done(userInput);
  },
  //the head command prints the first 5 lines of a file
  "head": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8',(err,data) => {
      if (err) throw err;
      dataArray = data.split("\n");
      headArray = [];
      for (i=0; i<5; i++) {
        headArray.push(dataArray[i]);
      }
      done(headArray.join('\n'));
    });
  },
  //the sort commands
  "sort": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8',(err, data) => {
      if (err) throw err;
      done(data.split('\n').sort().join('\n'));
    });
  },
  //the tail command prints the last 5 lines of a file
  "tail": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8',(err,data) => {
      if (err) throw err;
      dataArray = data.split("\n");
      tailArray = [];
      for (i=4; i>=0; i--) {
        tailArray.push(dataArray[dataArray.length-i]);
      }
      done(tailArray.join('\n'));
    });
  },
  //prints only unique lines from the file
  "uniq": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) throw err;
      let unique = [...new Set(data.split('\n'))];
      done(unique.join('\n'));
    });
  },
  //prints newline, word and byte counts
  "wc": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) throw err;
      let newLine = data.split('\n').length-1;
      let wc = data.split(' ').length;
      const getBytes = (str) => {
        let bytes = [];
        for (var i=0; i<str.length; i++) {
          let char = str.charCodeAt(i);
          bytes.push(char >>> 8, char & 0xFF);
        }
        return bytes;
      };
      let getBytesArray = getBytes(data);
      let totalBytes = getBytesArray.length/2;
     done(`${newLine} ${wc} ${totalBytes} ${fileName}`);
   });
  }
}

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
