/**
 * Welrent API SDK
 * Search + rental contract helpers for Act + wr-frontend.
 */
class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL || (
            (typeof window !== 'undefined' &&
                window.location &&
                window.location.hostname.indexOf('act.welrent.com') === -1 &&
                window.location.hostname !== 'localhost' &&
                window.location.hostname !== '127.0.0.1')
                ? 'https://act.welrent.com'
                : ''
        );
    }

    async search(query) {
        try {
            const response = await fetch(`${this.baseURL}/api/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Network response failed');
            const data = await response.json();
            return Array.isArray(data) ? data : (data.results || []);
        } catch (error) {
            console.error('API Search Error:', error);
            return [];
        }
    }

    async createContract(booking) {
        const response = await fetch(`${this.baseURL}/api/contracts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Welrent-Source': 'welrent-api-client',
            },
            body: JSON.stringify(booking || {}),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.error || 'Contract creation failed');
        }
        return data;
    }

    async listContracts(uid) {
        if (!uid) return [];
        const response = await fetch(`${this.baseURL}/api/contracts?uid=${encodeURIComponent(uid)}`);
        const data = await response.json().catch(() => ({ contracts: [] }));
        return data.contracts || [];
    }
}

window.WelrentAPI = new ApiClient();
