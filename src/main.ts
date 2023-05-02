import { init, start } from "./server";

init().then(():Promise<void> => start())
