/** 
 * @todo put this in a separate package 
 */
export type NullableCacheEntry<TKey, TValue> = CacheEntry<TKey, TValue> | null;

export class CacheEntry<TKey, TValue> {
  public older: NullableCacheEntry<TKey, TValue> = null;
  public newer: NullableCacheEntry<TKey, TValue> = null;
  constructor(public key: TKey, public value: TValue) {
  }
}

export class LRUCache<TKey extends string | number, TValue> {
  /* double linked list */
  public size: number = 0;
  public oldest: NullableCacheEntry<TKey, TValue> = null;
  public newest: NullableCacheEntry<TKey, TValue> = null;
  private keymap: Map<TKey, CacheEntry<TKey, TValue>> = new Map<TKey, CacheEntry<TKey, TValue>>();

  constructor(public limit: number = 0) {
  }

  clear() {
    this.oldest = this.newest = null;
    this.size = 0;
    this.keymap.clear();
  }

  getItem(key: TKey): TValue | undefined {
    if (!this.keymap.has(key)) {
      return undefined;
    }
    let entry = this.keymap.get(key)!;
    if (this.newest !== entry) {
      let older = entry.older;
      let newer = entry.newer;
      entry.newer = null;
      entry.older = this.newest;
      this.newest!.newer = entry;
      this.newest = entry;
      newer!.older = older;
      if (older) {
        older.newer = newer;
      }
      if (entry === this.oldest) {
        this.oldest = newer;
      }
    }
    return entry.value;
  }

  setItem(key: TKey, value: TValue) {
    if (this.getItem(key)) {
      let entry = this.keymap.get(key)!;
      entry.value = value;
    }
    else {
      let entry = new CacheEntry<TKey, TValue>(key, value);
      if (!this.limit || this.size < this.limit) {
        this.size++;
      }
      else {
        let firstEntry = this.oldest;
        this.oldest = firstEntry!.newer;
        this.oldest!.older = null;
        this.keymap.delete(firstEntry!.key);
      }
      entry.older = this.newest;
      if (this.newest) {
        this.newest.newer = entry;
      }
      this.newest = entry;
      if (!this.oldest) {
        this.oldest = entry;
      }
      this.keymap.set(key, entry);
    }
  }
}

export function lru_cached(limit: number) {
  let cache = new LRUCache<string, any>(limit);
  return function (target: any) {
    return function (...args: any[]) {
      let key = args.map(v => `${v}`).join(';');
      let value = cache.getItem(key);
      if (!value) {
        value = target.apply(null, args);
        cache.setItem(key, value);
      }
      return value;
    }
  }
}
