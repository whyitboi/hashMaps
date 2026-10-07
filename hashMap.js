export class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.bucket = [];
    this.bucket.length = 16;
  }
  hash(key) {
    let hashCode = 0;
    const seed = 31;
    for (i = 0; i < key.length; i++) {
      hashCode = seed * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {}
}
