export class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.counter = 0;
    //make sure it creates empty slots for each bucket
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }
  hash(key) {
    let hashCode = 0;
    const seed = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = seed * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }
    return hashCode;
  }
  bucket(key) {
    const hasCode = this.hash(key);
    return this.buckets[hasCode];
  }
  checkEntry(bucket, key) {
    for (const entry of bucket) {
      if (entry.key === key) {
        return entry;
      }
    }
    return null;
  }
  growMapCapacity() {}

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.bucket(key);
    const entry = this.checkEntry(bucket, key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (entry) {
      entry.value = value;
      return;
    }
    bucket.push({ key, value });
    this.counter++;
    //check number of stored keys this.loadfactor * this,capacity < this.counter
    if (this.counter > this.counter > this.loadfactor * this.capacity)
      this.growMapCapacity();
  }
  get(key) {
    const index = this.hash(key);
    const bucket = this.bucket(key);
    const entry = this.checkEntry(bucket, key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (entry) {
      return entry.value;
    }
    return undefined;
  }
  has(key) {
    const index = this.hash(key);
    const bucket = this.bucket(key);
    const entry = this.checkEntry(bucket, key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    return entry !== null ? true : false;
  }
  length() {
    return this.counter;
  }
  remove(key) {
    const index = this.hash(key);
    const bucket = this.bucket(key);
    const entry = this.checkEntry(bucket, key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (entry) {
      bucket.splice(bucket.indexOf(entry), 1);
      this.counter--;
      return true;
    } else return false;
  }
  clear() {
    this.buckets.forEach((bucket) => {
      bucket.splice(0);
      //can also bucket.length = 0
    });
    this.counter = 0;
    return;
  }
  keys() {
    const keyArr = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((entry) => {
        keyArr.push(entry.key);
      });
    });
    return keyArr;
  }
  values() {
    const valuesArr = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((entry) => {
        keyArr.push(entry.value);
      });
    });
    return valuesArr;
  }
  entries() {
    const keyValuePairArr = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((entry) => {
        let keyValuePair = [];
        keyValuePair[(key, value)] = [entry.key, entry.value];
        keyValuePairArr.push(keyValuePair);
      });
    });
    return keyValuePairArr;
  }
}
