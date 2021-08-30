const readline = require('readline');

function retrieveDataFromUser(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    rl.question(question, (channelId) => {
      rl.close();
      resolve(channelId);
    });
  })
}

module.exports = retrieveDataFromUser;
