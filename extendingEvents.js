import { EventEmitter } from "events";
import { delivered } from "./events.js";

export const emitter = new EventEmitter();

emitter.on("orderComplete", () => {
  console.log(`Serving pizza with Coca-cola`);
  delivered.emit("delivered");
});

export class PizzaShop extends EventEmitter {
  constructor() {
    super();
    this.orderNumber = 0;
  }

  order(size, toppings) {
    this.orderNumber += 1;
    this.emit("order", size, toppings);
  }

  displayOrderNumber() {
    console.log(`Current order number: ${this.orderNumber}`);
  }
}

//if we want to use the same event emitter in different file then we can make a class and extend the event emitter class with our defined class and then this and use it. There should be a better way to do this. We can just export the event emitter object after create a object with the class.
