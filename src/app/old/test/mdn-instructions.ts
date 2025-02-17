const arr1 = new Array(0);
console.log(arr1);

const pets = [];
pets[pets.length] = "cat";

const SayHello = () => {
  console.log("Hello");
};
SayHello();

const arr2 = [1, 2, 3, 4];
const sum = arr2.reduce(function (a, b) {
  return a + b;
});
console.log(sum);

const arr3 = [1, 2, 3, 4].map((e) => {
  return e + 10;
});
console.log(arr3);

const dogs = ["Rex", "Lassie"];
for (let i = 0; i < dogs.length; i++) {
  console.log(dogs[i]);
}

const myTest = (num: number) => {
  if (num > 0) {
    console.log(num);
    return;
  } else {
    console.log(num);
  }
};
myTest(2);

const arr4 = [1, 2, 3, 4];
for (const item of arr4) console.log(item);

const myTest2 = (animal: string) => {
  switch (animal) {
    case "chicken":
      return "bird";
      break;
    case "tuna":
      return "fish";
      break;
    default:
      break;
  }
};
myTest2("chicken");

class person {
  Name: string;
  Age: number;
  constructor(name: string, age: number) {
    this.Name = name;
    this.Age = age;
  }
  profile(): string {
    return `name: ${this.Name} age: ${this.Age}`;
  }
}
new person("satoshi", 38);

const myObj = {
  Name: "my object",
  created_at: "2025/02/18",
};
console.log(myObj);

const object = new Object();
console.log(object);

const obj = {
  foo: function () {
    console.log("foo");
  },
  bar: function () {
    console.log("bar");
  },
};
obj.foo();

function createObject(name: string, age: number) {
  return { name: name, age: age };
}
createObject("Taro", 20);

let x: number;
const y2 = Math.random() * 10;
if (y2 > 5) {
  x = 1;
} else {
  x = 2;
}
console.log(x);

const y = Math.random() * 10;
if (y.toString() == "Shilpa" && y != 25) {
  console.log("test");
  const flg = y > 0;
  if (flg === true) {
    const text = "text" + y.toString();
    const text2 = `hoge`;
    console.log(text, text2);
  }
}

class Person {
  hoge: string;
  fuga: number;

  constructor(name: number, year: string) {
    this.hoge = "" + name;
    this.fuga = +year;
  }
}
const person2 = new Person(20, "hoge");
console.log(person2);

const text = "Hello to all you good people";
const para = document.createElement("p");
para.innerHTML = text;
