export class HashSet {
  constructor(capacity = 16) {
    this.loadFactor = 0.75;
    this.capacity = capacity;
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
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    return this.buckets[index];
  }
  checkEntry(buckets, key) {
    for (const bucket in buckets) {
      if (bucket.includes(key)) {
        return bucket;
      }
    }
    return null;
  }
  growMapCapacity() {
    const oldHashSet = this.keys();
    const newHashSet = new HashSet(this.capacity * 2);
    oldHashSet.forEach(([key]) => {
      newHashSet.set(key);
    });
    //set new (grown) hash set to this (current hash set)
    this.capacity = newHashSet.capacity;
    this.buckets = newHashSet.buckets;
    this.counter = newHashSet.counter;
  }

  //change to add(key) and combine with has(key)
  add(key) {
    const bucket = this.bucket(key);
    const entry = this.checkEntry(bucket, key);
    if (entry) {
      entry.key = key;
      return;
    }
    bucket.push({ key });
    this.counter++;
    if (this.counter > this.loadFactor * this.capacity) this.growMapCapacity();
  }
  has(key) {
    const bucket = this.bucket(key);
    const entry = this.checkEntry(bucket, key);
    return entry !== null ? true : false;
  }

  length() {
    return this.counter;
  }
  remove(key) {
    const bucket = this.bucket(key);
    const entry = this.checkEntry(bucket, key);
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
}
