import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Book } from "./models/Book";
import { BookDTO } from "./models/BookDTO";
import { Category } from "./models/Category";
import { GetBooksDTO } from "./models/GetBooksDTO";
import { Tag } from "./models/Tag";


export class BookStoreService {
    private  URL : string;
    private axiosInstance: AxiosInstance;

    constructor() {
        this.URL = process.env.REACT_API_BASE_URL || 'http://127.0.0.1:8000/api';
        this.axiosInstance = axios.create({
            baseURL: this.URL,                    
        });
    }

    public async getBooks(pageNumber : number, pageSize : number): Promise<GetBooksDTO> {
        try {
            const response: AxiosResponse<GetBooksDTO> = await this.axiosInstance.get(`${this.URL}/books`, { params: { pageNumber, pageSize } });
            const getBooksDTO = response.data;
            return getBooksDTO;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    }

    public async getBookById(id: number): Promise<Book> {
        try {
            const response: AxiosResponse<Book> = await this.axiosInstance.get(`/book/`, { params: { id } });
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