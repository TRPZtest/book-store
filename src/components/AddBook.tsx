import React, { useState, useEffect } from 'react';
import { BookStoreService } from '../services/BookStoreService';
import { BookForm } from './BookForm';
import { Category } from '../services/models/Category';
import { Tag } from '../services/models/Tag';
import { BookDTO } from '../services/models/BookDTO'; // Import BookDTO
import { useNavigate } from 'react-router-dom';

export function AddBook() {
    const service = new BookStoreService();
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCategoriesAndTags() {
            try {
                const categories = await service.getAllCategories();
                setCategories(categories);

                const tags = await service.getTags();
                setTags(tags);
            } catch (error) {
                alert('Error fetching categories and tags');
            }
        }

        fetchCategoriesAndTags();
    }, []);

    const handleAddBook = async (newBook: BookDTO) => {
        try {
            const savedBook = await service.addBook(newBook);
            console.log('Book added:', savedBook);
            navigate('/');
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return <BookForm initialBook={ new BookDTO } categories={categories} tags={tags} onSubmit={handleAddBook} />;
}
