class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (const transaction of this.transactions) {
      balance += transaction.value;
    }
    return Number(balance.toFixed(2));
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }


  commit() {
    if (this.isAllowed()) {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
    } else {
      console.log(`Sorry. You can not withdraw that much. Your balance is ${this.account.balance}`);
    }
  }

  isAllowed() {
    if (this instanceof Withdrawal) {
      return this.amount > this.account.balance ? false : true;
    } else {
      return true;
    }
  }

}

class Withdrawal extends Transaction {


  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {
  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

const t1 = new Deposit(120.00, myAccount);
t1.commit();
console.log('After Transaction 1:\n', myAccount);

const t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('After Transaction 2:\n', myAccount);

const t3 = new Withdrawal(50.25, myAccount);
t3.commit();
console.log('After Transaction 3:\n', myAccount);

console.log('Balance:', myAccount.balance);
