class Cache {
	constructor() {
		this.data = new Map();
	}

	getAvatarUrl(userId) {
		const res = this.data.get(userId);
		if (!res) return;

		if (this.isExpired(res.timestamp)) {
			this.data.delete(userId);
			return;
		}

		return res.url;
	}

	setAvatarUrl(userId, url) {
		this.data.set(userId, { url, timestamp: Date.now() });
	}

	isExpired(timestamp) {
		// expired if 10 mins old
		return Date.now() - 1000 * 60 * 10 > timestamp;
	}
}

export default new Cache();
