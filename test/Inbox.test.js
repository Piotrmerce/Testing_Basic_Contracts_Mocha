// contract test code will go here

const assert = require('assert');      //check integrity of variables, names,etc.
const ganache = require('ganache-cli');
const Web3 = require('web3');       //constructor, class
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');


let accounts;       //accounts from ganache
let inbox;


beforeEach(async() => {
    accounts = await web3.eth.getAccounts();    //get a list of all accounts from ganache
   
    //the contract
   inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there!'] })
    .send( { from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);           //assert.ok is function which assiociates and compares two or more values
    });                         //if address exist here, contract is ok and works

    it('has an initial message', async () => {
        const message = await inbox.methods.message().call();   //checking if contract inbox has an message property in his methods
        assert.equal(message, 'Hi there!');      //message should be equal to 'Hi there'
    });

    it('can change the message', async() => {
        await inbox.methods.setMessage('bye').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });

});





//testing with Mocha, working example

/* test testing //
class Car {
    park() {
        return 'stopped';
    }
    drive() {
        return 'vroom';
    }
}

let car;                //let outsite of beforeEach, beacuse of scope of variable
beforeEach(()=> {
    car = new Car();
});

describe('Car', () => {                 //describe during tests group together IF statements
    it('has a park function', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('can drive', () =>{
        assert.equal(car.drive(), 'vroom');
    });

});
*/