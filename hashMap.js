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
    //check number of stored keys this.loadfactor * capacity < this.counter
    //growMapCapacity()
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
    if (entry) {
      return entry.value;
    } else {
      return false;
    }
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
      splice(bucket.indexOf(entry), 1);
      this.counter--;
      return true;
    } else return false;
  }
}
