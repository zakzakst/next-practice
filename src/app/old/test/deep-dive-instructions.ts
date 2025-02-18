let FooVar;
function BarFunc() {}
console.log(FooVar);
BarFunc();

class foo {
  Bar: number;
  constructor(Bar: number) {
    this.Bar = Bar;
  }
  Baz() {}
}
const instanceFoo = new foo(0);
console.log(instanceFoo);

export interface person {
  Name: string;
}
export interface IPerson2 {
  Name: string;
}
export type person3 = {
  Name: string;
};

export type Foo = {
  items: Array<string>;
};
