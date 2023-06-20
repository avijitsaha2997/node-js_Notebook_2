import { PizzaShop } from "./extendingEvents.js";
import { emitter } from "./extendingEvents.js";
import { EventEmitter } from "events";

const newShop = new PizzaShop();
export const delivered = new EventEmitter();

delivered.on("delivered", () => {
  console.log(`Pizza delivered`);
});

newShop.on("order", (size, toppings) => {
  console.log(`Your ${size} pizza is cooking with ${toppings}!`);
  emitter.emit("orderComplete");
});

newShop.order("large", "mashroom");

// import events from "events";

// const emitter = new events();

// emitter.on("pizza", (size, toppings) => {
//   console.log(`Serving pizza with ${toppings}`);
// });

// emitter.on("pizza", (size, toppings) => {
//   console.log(`Your ${size} pizza is cooking with ${toppings}!`);
// });

// const func = (data) => {
//   console.log(data);
//   if (data === "print") {
//     emitter.emit("pizza", "large", "mashroom");
//   }
// };
// func("print");
