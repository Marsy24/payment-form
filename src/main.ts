import { App } from "./App";
import { createNotate } from "./utils/createNotate";

document.getElementById('app')?.append(App());

Array.from(createNotate()).forEach(item => document.body.prepend(item))