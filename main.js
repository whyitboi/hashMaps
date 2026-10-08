import { HashMap } from "./hashMap.js";
import { HashSet } from "./hashSet.js";

const hashMap = new HashMap();
const hashSet = new HashSet();

hashMap.set("apple", "red");
hashMap.set("banana", "yellow");
hashMap.set("carrot", "orange");
hashMap.set("dog", "brown");
hashMap.set("elephant", "gray");
hashMap.set("frog", "green");
hashMap.set("grape", "purple");
hashMap.set("hat", "black");
hashMap.set("ice cream", "white");
hashMap.set("jacket", "blue");
hashMap.set("kite", "pink");
hashMap.set("lion", "golden");
console.log("Hash Set: " + hashSet.length());
console.log("Hash Map: ");
console.log(hashMap.entries());
