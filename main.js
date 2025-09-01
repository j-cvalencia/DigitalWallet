// Array of people classes
let persons = [];

class Cuenta {
  constructor(name, lastName, id, email, cellNumber, password) {
    this.amount = 0;
    this.name = name;
    this.lastName = lastName;
    this.id = id;
    this.email = email;
    this.cellNumber = cellNumber;
    this.password = password;
    this.access = false;
  }
  permit(id, password) {
    if (id == this.id && password == this.password) {
      this.access = true;
    }
  }
  showAmount() {
    if (this.access) {
      alert(`El monto actual de la cuenta es de ${this.amount}`);
    }
  }
  increaseAmount(moneyIncrease) {
    if (this.access) {
      this.amount += moneyIncrease;

      return true;
    }
  }

  decrementAmount(moneyDecrement) {
    if (this.access) {
      if (moneyDecrement > this.amount) {
        alert("Dinero insuficiente");
        return false;
      } else {
        this.amount -= moneyDecrement;

        return true;
      }
    }
  }
}

/* FUNCTIONS */

// Function to send the classes to the array
const sendForm = (e) => {
  e.preventDefault();
  if (
    e.target.children[2].children[0].value.length < 8 ||
    e.target.children[2].children[0].value.length > 10
  ) {
    alert("Numero de documento no valido");
    return;
  }

  if (e.target.children[5].children[0].value.length < 4) {
    alert("La contraseña debe contener minimo 4 digitos");
    return;
  }

  if (
    e.target.children[5].children[0].value !=
    e.target.children[6].children[0].value
  ) {
    alert("La contraseña no concuerda");
    return;
  }

  const person = new Cuenta(
    e.target.children[0].children[0].value,
    e.target.children[1].children[0].value,
    parseInt(e.target.children[2].children[0].value),
    e.target.children[3].children[0].value,
    parseInt(e.target.children[4].children[0].value),
    e.target.children[5].children[0].value
  );

  persons.push(person);

  e.target.children[0].children[0].value = "";
  e.target.children[1].children[0].value = "";
  e.target.children[2].children[0].value = "";
  e.target.children[3].children[0].value = "";
  e.target.children[4].children[0].value = "";
  e.target.children[5].children[0].value = "";
  e.target.children[6].children[0].value = "";

  e.target.parentElement.style.display = "none";
};

// Function to close a modal
const modalClose = (e) => {
  e.target.parentElement.parentElement.style.display = "none";
};

// Account and password verification function
const verify = (id, password) => {
  for (let cuenta of persons) {
    if (cuenta.id == id && cuenta.password == password) {
      cuenta.access = true;
      return true;
    }
  }
  return false;
};

//Verification for password and acoount for enter to program
const verifyFormInitialAccount = (e) => {
  e.preventDefault();
  const id = e.target.children[0].children[0].value;
  const password = e.target.children[1].children[0].value;

  const access = verify(id, password);

  if (access) {
    createAccount.style.display = "none";
    initialAccount.style.display = "none";
    document.querySelector("#cashier").style.display = "block";
    document.querySelector("#mainButtons").style.display = "grid";
  } else {
    alert("Identidad o contraseña son incorrectas");
  }

  e.target.children[0].children[0].value = "";
  e.target.children[1].children[0].value = "";

  e.target.parentElement.style.display = "none";
};

//
const assignDepositInput = () => {
  const valueMoney = parseInt(prompt(`¿Digite el valor que quiere depositar?`));

  if (isNaN(valueMoney)) {
    alert("Se a cancelado la accion");
    return;
  } else {
    for (const person of persons) {
      if (person.access == true) {
        if (person.increaseAmount(valueMoney)) {
          alert("Se ha insertado el dinero correctamente");
        }

        document.querySelector("#secondaryButtons").style.display = "none";
        document.querySelector("#mainButtons").style.display = "grid";
      }
    }
    moneyButtons.forEach((button) => {
      button.removeEventListener("click", assignDeposit);
    });
    moneyButtonInput.removeEventListener("click", assignDepositInput);
  }
};

const assignDeposit = (e) => {
  for (const person of persons) {
    if (person.access == true) {
      person.increaseAmount(parseInt(e.target.value));
      alert("Se ha insertado el dinero correctamente");

      document.querySelector("#secondaryButtons").style.display = "none";
      document.querySelector("#mainButtons").style.display = "grid";
    }
  }
  moneyButtons.forEach((button) => {
    button.removeEventListener("click", assignDeposit);
  });
  moneyButtonInput.removeEventListener("click", assignDepositInput);
};

//Function for deposit money in the account
const deposit = () => {
  for (const person of persons) {
    if (person.access == true) {
      document.querySelector("#mainButtons").style.display = "none";
      document.querySelector("#secondaryButtons").style.display = "grid";

      moneyButtons.forEach((button) => {
        button.addEventListener("click", assignDeposit);
      });
      moneyButtonInput.addEventListener("click", assignDepositInput);
    }
  }
};

const assignRemoveInput = (e) => {
  const valueMoney = parseInt(prompt(`¿Digite el valor que quiere retirar?`));
  if (isNaN(valueMoney)) {
    alert("Se a cancelado la accion");
    return;
  } else {
    for (const person of persons) {
      if (person.access == true) {
        if (person.decrementAmount(valueMoney)) {
          alert("Se ha retirado el dinero correctamente");
        }

        document.querySelector("#secondaryButtons").style.display = "none";
        document.querySelector("#mainButtons").style.display = "grid";
      }
    }
    moneyButtons.forEach((button) => {
      button.removeEventListener("click", assignRemovet);
    });
    moneyButtonInput.removeEventListener("click", assignRemoveInput);
  }
};

const assignRemovet = (e) => {
  for (const person of persons) {
    if (person.access == true) {
      if (person.decrementAmount(parseInt(e.target.value))) {
        alert("Se ha retirado el dinero correctamente");
      }

      document.querySelector("#secondaryButtons").style.display = "none";
      document.querySelector("#mainButtons").style.display = "grid";
    }
  }
  moneyButtons.forEach((button) => {
    button.removeEventListener("click", assignRemovet);
  });
  moneyButtonInput.removeEventListener("click", assignRemoveInput);
};

//Function for remove money in the account
const remove = () => {
  for (const person of persons) {
    if (person.access == true) {
      document.querySelector("#mainButtons").style.display = "none";
      document.querySelector("#secondaryButtons").style.display = "grid";

      const moneyButtons = Array.from(
        document.querySelectorAll(".moneyButton")
      );

      moneyButtons.forEach((button) => {
        button.addEventListener("click", assignRemovet);
      });
      moneyButtonInput.addEventListener("click", assignRemoveInput);
    }
  }
};

//Function for view the money in the account
const viewBalance = () => {
  for (const person of persons) {
    if (person.access == true) {
      person.showAmount();
    }
  }
};

const transferMoney = (e) => {
  e.preventDefault();

  const account = document.querySelector("#accountTransfered").value;
  const valueTrasfer = document.querySelector("#Quantity").value;

  let flag = true;

  for (const person of persons) {
    if (person.access == true) {
      for (const personTransfer of persons) {
        if (personTransfer.id == account) {
          if (person.decrementAmount(valueTrasfer)) {
            flag = false;
            personTransfer.access = true;
            personTransfer.increaseAmount(parseInt(valueTrasfer));
            personTransfer.access = false;
            alert(
              `Se ha trasferido el dinero de ${person.id} a la cuenta ${account}`
            );
          }
          document.querySelector("#accountTransfered").value = '';
          document.querySelector("#Quantity").value = '';

          document.querySelector("#transferInput").style.display = "none";
          document.querySelector("#mainButtons").style.display = "grid";
        }
      }
    }
  }

  if (flag) {
    alert("La cuenta ingresada no existe");
  }
};

const transfer = () => {
  document.querySelector("#mainButtons").style.display = "none";
  document.querySelector("#transferInput").style.display = "grid";

  const formInitial = document.querySelector("#formTransfer");
  formInitial.addEventListener("submit", transferMoney);
};

/* CALL THE FUNCTIONS */

// Create Account
const createAccount = document.querySelector("#createAccount");
createAccount.addEventListener("click", () => {
  document.querySelector("#modalCreateAccount").style.display = "flex";
});

const formCreateAccount = document.querySelector(".formCreateAccount");
formCreateAccount.addEventListener("submit", sendForm);

const closeCreateAccount = document.querySelector(".closeCreateAccount");
closeCreateAccount.addEventListener("click", modalClose);

// Initial  Acount
const initialAccount = document.querySelector("#initialAccount");
initialAccount.addEventListener("click", () => {
  document.querySelector("#modalInitialAccount").style.display = "flex";
});

const formInitialAccount = document.querySelector(".formInitialAccount");
formInitialAccount.addEventListener("submit", verifyFormInitialAccount);

const closeInitialAccount = document.querySelector(".closeInitialAccount");
closeInitialAccount.addEventListener("click", modalClose);

//Function Deposit
const buttonDeposit = document.querySelector("#deposit");
buttonDeposit.addEventListener("click", deposit);

const moneyButtons = Array.from(document.querySelectorAll(".moneyButton"));
const moneyButtonInput = document.querySelector(".moneyButtonInput");

//Function remove
const buttonRemove = document.querySelector("#remove");
buttonRemove.addEventListener("click", remove);

//Function VIEW BALANCE
const buttonViewBalance = document.querySelector("#viewBalance");
buttonViewBalance.addEventListener("click", viewBalance);

// Function transfer
const buttonTransfer = document.querySelector("#transfer");
buttonTransfer.addEventListener("click", transfer);

// Return Buttons
const returnButtonCashier = document.querySelector("#returnButtonCashier");
returnButtonCashier.addEventListener("click", () => {
  for (const person of persons) {
    if (person.access == true) {
      person.access = false;
    }
  }
  document.querySelector("#cashier").style.display = "none";
  createAccount.style.display = "inline-block";
  initialAccount.style.display = "inline-block";
});

const returnButtonMainButtons = Array.from(
  document.querySelectorAll(".returnButtonMainButtons")
);
returnButtonMainButtons.forEach((button) => {
  button.addEventListener("click", () => {
    moneyButtons.forEach((button) => {
      button.removeEventListener("click", assignRemovet);
    });

    moneyButtonInput.removeEventListener("click", assignRemoveInput);

    moneyButtons.forEach((button) => {
      button.removeEventListener("click", assignDeposit);
    });

    moneyButtonInput.removeEventListener("click", assignDepositInput);

    document.querySelector("#secondaryButtons").style.display = "none";
    document.querySelector("#transferInput").style.display = "none";
    document.querySelector("#mainButtons").style.display = "grid";
  });
});