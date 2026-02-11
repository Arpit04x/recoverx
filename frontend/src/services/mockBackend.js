import axios from 'axios';

// MOCK BACKEND IMPLEMENTATION
// This mimics a real backend using localStorage for persistence
// It is used when the real backend is unreachable or disabled

const TIMEOUT = 800; // Simulate network delay

class MockBackend {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem('lf_lost_items')) localStorage.setItem('lf_lost_items', JSON.stringify([]));
        if (!localStorage.getItem('lf_found_items')) localStorage.setItem('lf_found_items', JSON.stringify([]));
        if (!localStorage.getItem('lf_claims')) localStorage.setItem('lf_claims', JSON.stringify([]));

        // Seed some data if empty
        if (JSON.parse(localStorage.getItem('lf_found_items')).length === 0) {
            const seedFound = [
                { id: 201, category: 'Electronics', name: 'MacBook Charger', color: 'White', location: 'Library Area', date: '2023-10-25', description: 'Apple magsafe charger found under table.', image: null, anonymous: false },
                { id: 202, category: 'IDs/Wallets', name: 'Black Leather Wallet', color: 'Black', location: 'Cafeteria', date: '2023-10-26', description: 'Contains some cash and cards.', image: null, anonymous: true },
                { id: 203, category: 'Clothing', name: 'Blue Denim Jacket', color: 'Blue', location: 'Gym', date: '2023-10-27', description: 'Levis jacket, size M.', image: null, anonymous: false },
            ];
            localStorage.setItem('lf_found_items', JSON.stringify(seedFound));
        }
    }

    // Helpers
    getLost() { return JSON.parse(localStorage.getItem('lf_lost_items')); }
    getFound() { return JSON.parse(localStorage.getItem('lf_found_items')); }
    getClaims() { return JSON.parse(localStorage.getItem('lf_claims')); }

    saveLost(items) { localStorage.setItem('lf_lost_items', JSON.stringify(items)); }
    saveFound(items) { localStorage.setItem('lf_found_items', JSON.stringify(items)); }
    saveClaims(items) { localStorage.setItem('lf_claims', JSON.stringify(items)); }

    // API Methods
    async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@college.edu' && password === 'admin') {
                    resolve({ data: { token: 'mock-jwt-token-12345' } });
                } else {
                    reject({ response: { data: { message: 'Invalid credentials' } } });
                }
            }, TIMEOUT);
        });
    }

    async reportLost(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const items = this.getLost();
                const newItem = {
                    id: Date.now(),
                    ...Object.fromEntries(data), // Handle FormData
                    dateReported: new Date().toISOString()
                };
                items.push(newItem);
                this.saveLost(items);

                // Simple mock matching logic
                const foundItems = this.getFound();
                const matches = foundItems.filter(f =>
                    f.category === newItem.category ||
                    f.description.toLowerCase().includes(newItem.description.toLowerCase())
                ).map(m => ({ ...m, matchScore: Math.floor(Math.random() * 40) + 60 })); // Random high score

                resolve({ data: { message: 'Reported successfully', matches } });
            }, TIMEOUT);
        });
    }

    async reportFound(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const items = this.getFound();
                const newItem = {
                    id: Date.now(),
                    ...Object.fromEntries(data),
                    dateReported: new Date().toISOString()
                };
                items.push(newItem);
                this.saveFound(items);
                resolve({ data: { message: 'Reported successfully' } });
            }, TIMEOUT);
        });
    }

    async getItem(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const found = this.getFound().find(i => i.id == id);
                if (found) resolve({ data: found });
                else reject({ response: { status: 404 } });
            }, TIMEOUT);
        });
    }

    async submitClaim(itemId, data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const claims = this.getClaims();
                const item = this.getFound().find(i => i.id == itemId);
                const newClaim = {
                    id: Date.now(),
                    itemId: itemId,
                    item: item,
                    answers: data.answers, // In a real app complexity varies
                    status: 'Pending',
                    claimantName: 'Student User', // Mock user
                    date: new Date().toISOString().split('T')[0]
                };
                claims.push(newClaim);
                this.saveClaims(claims);
                resolve({ data: { message: 'Claim submitted' } });
            }, TIMEOUT);
        });
    }

    async getStats() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        totalLost: this.getLost().length,
                        totalFound: this.getFound().length,
                        pendingClaims: this.getClaims().filter(c => c.status === 'Pending').length
                    }
                });
            }, TIMEOUT);
        });
    }

    async getClaimsList(params) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let claims = this.getClaims();
                if (params?.status) {
                    claims = claims.filter(c => c.status.toLowerCase() === params.status.toLowerCase());
                }
                // Transform for dashboard view
                const formatted = claims.map(c => ({
                    id: c.id,
                    itemName: c.item?.name || c.item?.category,
                    claimantName: c.claimantName,
                    date: c.date,
                    status: c.status
                }));
                resolve({ data: formatted });
            }, TIMEOUT);
        });
    }

    async getClaimDetails(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const claim = this.getClaims().find(c => c.id == id);
                if (claim) {
                    // Format for detailed view
                    const detailed = {
                        ...claim,
                        claimant: { name: claim.claimantName, email: 'student@college.edu' },
                        item: { ...claim.item, foundDate: claim.item.date },
                        answers: Object.entries(claim.answers || {}).map(([k, v]) => ({ question: k, answer: v })),
                        score: 85 // Mock score
                    };
                    resolve({ data: detailed });
                } else {
                    reject({ response: { status: 404 } });
                }
            }, TIMEOUT);
        });
    }

    async updateClaimStatus(id, status) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const claims = this.getClaims();
                const index = claims.findIndex(c => c.id == id);
                if (index !== -1) {
                    claims[index].status = status;
                    this.saveClaims(claims);
                    resolve({ data: claims[index] });
                }
            }, TIMEOUT);
        });
    }

    async getAnalytics() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const lost = this.getLost();
                // Simple aggregation logic
                const categories = {};
                lost.forEach(i => { categories[i.category] = (categories[i.category] || 0) + 1; });

                const locations = {};
                lost.forEach(i => { locations[i.location] = (locations[i.location] || 0) + 1; });

                resolve({
                    data: {
                        categories: Object.entries(categories).map(([k, v]) => ({ name: k, count: v })),
                        locations: Object.entries(locations).map(([k, v]) => ({ name: k, count: v }))
                    }
                });
            }, TIMEOUT);
        });
    }
}

export const mockBackend = new MockBackend();
