import { App } from "./App";
import { validateCardNumber } from "./utils/validateCardNumber";

document.getElementById('app')?.append(App())
console.log(validateCardNumber('2200700992160282'))