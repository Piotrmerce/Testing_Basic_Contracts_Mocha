// Compile code

const path = require('path');   //help to complite paths from other files, fodlers
const fs = require('fs');       //file system module
const solc = require('solc');   //solc is solidity compiler

const inboxPath= path.resolve(__dirname, 'contracts', 'Inbox.sol');        //current working directory, inbox folder here
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];