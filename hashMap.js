export class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
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
    let hasCode = this.hash(key);
    return this.buckets[hasCode];
  }
  entry(bucket, key) {
    for (const entry of bucket) {
      if (entry.key === key) {
        return entry;
      }
    }
    return null;
  }

  set(key, value) {
    let index = this.hash(key);
    let bucket = this.bucket(key);
    let entry = this.entry(bucket, key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (entry) {
      entry.value = value;
      return;
    }
    bucket.push({ key, value });
  }
  //check number of stored keys this.loadfactor * capacity <
}
