import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Book } from "./models/Book";
import { Tag } from "./models/Tag";
import { Category } from "./models/Category";
import { BookDTO } from "./models/BookDTO";

export class BookStoreService {
    private  URL : string;
    private axiosInstance: AxiosInstance;

    constructor() {
        this.URL = process.env.REACT_API_BASE_URL + '/api' || 'http://127.0.0.1:8000/api';
        this.axiosInstance = axios.create({
            baseURL: this.URL,                    
        });
    }

    public async getAllBooks(): Promise<Book[]> {
        try {
            const response: AxiosResponse<Book[]> = await this.axiosInstance.get(`${this.URL}/books`);
            const books = response.data;
            return books;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    }

    public async getBookById(id: number): Promise<Book> {
        try {
            const response: AxiosResponse<Book> = await this.axiosInstance.get(`/book/`, { params: { id: id } });
            return response.data;
        } catch (error) {
            console.error(`Error fetching book with id ${id}:`, error);
            throw error;
        }
    }

    public async addBook(bookDTO : BookDTO): Promise<Book> {
        try {
            const response: AxiosResponse<Book> = await this.axiosInstance.post('/book', bookDTO);
            return response.data;
        } catch (error) {
            console.error('Error adding book:', error);
            throw error;
        }
    }

    public async updateBook(bookDTO : BookDTO): Promise<Book> {
        try {
            const response: AxiosResponse<Book> = await this.axiosInstance.put(`/book`, bookDTO);
            return response.data;
        } catch (error) {
            console.error(`Error updating book with id ${bookDTO.id}:`, error);
            throw error;
        }
    }

    public async getTags() : Promise<Tag[]> 
    {
        try {
            const response: AxiosResponse<Tag[]> = await this.axiosInstance.get(`/tags`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching tags:`, error);
            throw error;
        }
    }

    public async getAllCategories() : Promise<Category[]> 
    {
        try {
            const response: AxiosResponse<Category[]> = await this.axiosInstance.get(`/categories`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching categories:`, error);
            throw error;
        }
    }
}