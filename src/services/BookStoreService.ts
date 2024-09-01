import axios, { AxiosResponse } from "axios";

class BookStoreService {
    private  URL : string;

    constructor() {
        this.URL = 'http://127.0.0.1:8001/';
    }

    public async fetchBooks(): Promise<Book[]> {
        try {
            const response: AxiosResponse<Book[]> = await axios.get(`${this.URL}/books`);
            return response.data;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    }
}