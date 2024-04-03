export class LRUCache<TKey extends string | number, TValue> {
	limit = 0;
	private keymap: Map<TKey, TValue> = new Map<TKey, TValue>();

	constructor(limit = 0) {
		this.limit = limit;
	}

	clear() {
		this.keymap.clear();
	}

	getItem(key: TKey): TValue | undefined {
		if (!this.keymap.has(key)) {
			return undefined;
		}
		const value = this.keymap.get(key);
		this.keymap.delete(key);
		this.keymap.set(key, value!);
		return value;
	}

	setItem(key: TKey, value: TValue) {
		if (!this.keymap.has(key)) {
			this.keymap.set(key, value);
			if (this.limit > 0 && this.keymap.size > this.limit) {
				const iterator = this.keymap.entries().next();
				if (iterator.done) {
					return;
				}
				const [oldestKey] = iterator.value;
				this.keymap.delete(oldestKey);
			}
		} else {
			this.keymap.delete(key);
			this.keymap.set(key, value);
		}
	}
}

export function lru_cached(limit: number) {
	const cache = new LRUCache<string, any>(limit);
	return (target: any) =>
		(...args: any[]) => {
			const key = JSON.stringify(args);
			let value = cache.getItem(key);
			if (!value) {
				value = target.apply(null, args);
				cache.setItem(key, value);
			}
			return value;
		};
}
