import React, { useEffect, useState } from 'react';
import { BookStoreService } from '../services/BookStoreService';
import { useParams, useNavigate } from 'react-router-dom';
import { BookForm } from './BookForm';
import { Category } from '../services/models/Category';
import { Tag } from '../services/models/Tag';
import { BookDTO } from '../services/models/BookDTO'; // Import BookDTO

export function EditBook() {
    const service = new BookStoreService();
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<BookDTO>(new BookDTO());
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const bookData = await service.getBookById(Number(id));
                setBook({
                    id: bookData.id,
                    name: bookData.name,
                    description: bookData.description,
                    categoryId: bookData.category.id,
                    tags: bookData.tags.map((tag) => tag.id),
                });

                const tags = await service.getTags();
                setTags(tags);

                const categories = await service.getAllCategories();
                setCategories(categories);
            } catch (error) {
                alert('Error fetching book: ' + error);
            }
        }

        fetchData();
    }, [id]);

    const handleUpdateBook = async (updatedBook: BookDTO) => {
        try {
            const savedBook = await service.updateBook(updatedBook);
            navigate('/');
        } catch (error) {
            alert('Error updating book');
        }
    };

    return <BookForm initialBook={book} categories={categories} tags={tags} onSubmit={handleUpdateBook} />;
}