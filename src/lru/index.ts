/**
 * @todo put this in a separate package
 */
export type NullableCacheEntry<TKey, TValue> = CacheEntry<TKey, TValue> | null;

export class CacheEntry<TKey, TValue> {
	older: NullableCacheEntry<TKey, TValue> = null;
	newer: NullableCacheEntry<TKey, TValue> = null;
	key: TKey;
	value: TValue;
	constructor(key: TKey, value: TValue) {
		this.key = key;
		this.value = value;
	}
}

export class LRUCache<TKey extends string | number, TValue> {
	/* double linked list */
	size = 0;
	oldest: NullableCacheEntry<TKey, TValue> = null;
	newest: NullableCacheEntry<TKey, TValue> = null;
	limit = 0;
	private keymap: Map<TKey, CacheEntry<TKey, TValue>> = new Map<
		TKey,
		CacheEntry<TKey, TValue>
	>();

	constructor(limit = 0) {
		this.limit = limit;
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
		const entry = this.keymap.get(key)!;
		if (this.newest !== entry) {
			const older = entry.older;
			const newer = entry.newer;
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
			const entry = this.keymap.get(key)!;
			entry.value = value;
		} else {
			const entry = new CacheEntry<TKey, TValue>(key, value);
			if (!this.limit || this.size < this.limit) {
				this.size++;
			} else {
				const firstEntry = this.oldest;
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
	const cache = new LRUCache<string, any>(limit);
	return (target: any) =>
		(...args: any[]) => {
			const key = args.map((v) => `${v}`).join(";");
			let value = cache.getItem(key);
			if (!value) {
				value = target.apply(null, args);
				cache.setItem(key, value);
			}
			return value;
		};
}
