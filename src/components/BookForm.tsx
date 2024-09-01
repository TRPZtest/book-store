import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete, Typography } from '@mui/material';
import { Tag } from '../services/models/Tag';
import { Category } from '../services/models/Category';
import { BookDTO } from '../services/models/BookDTO'; // Import the correct DTO type

interface BookFormProps {
    initialBook: BookDTO;
    categories: Category[];
    tags: Tag[];
    onSubmit: (book: BookDTO) => Promise<void>;
}

export function BookForm({ initialBook, categories, tags, onSubmit }: BookFormProps) {
    const [bookDTO, setBookDTO] = useState<BookDTO>(initialBook);

    useEffect(() => {
        setBookDTO(initialBook); // Update local state when initialBook changes
    }, [initialBook]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBookDTO({
            ...bookDTO,
            [e.target.name]: e.target.value,
        });
    };

    const handleTagsChange = (event: any, value: Tag[]) => {
        setBookDTO({
            ...bookDTO,
            tags: value.map((tag) => tag.id), // Map selected tags to their IDs
        });
    };

    const handleCategoryChange = (event: any, newValue: Category | null) => {
        setBookDTO({
            ...bookDTO,
            categoryId: newValue ? newValue.id : 0, // Set categoryId to the selected category's ID
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (bookDTO.name && bookDTO.description && bookDTO.categoryId) {
                await onSubmit(bookDTO as BookDTO); // Cast to BookDTO to ensure correct typing
            } else {
                alert('Please fill in all required fields.');
            }
        } catch (error) {
            console.error('Error submitting book:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h4">{bookDTO.id ? 'Edit Book' : 'Add Book'}</Typography>
            <TextField
                label="Name"
                name="name"
                value={bookDTO.name || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Description"
                name="description"
                value={bookDTO.description || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
            />
            <Autocomplete
                multiple
                options={tags}
                getOptionLabel={(option) => option.name}
                value={tags.filter((tag) => bookDTO.tags?.includes(tag.id)) || []}
                onChange={handleTagsChange}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                    <TextField {...params} label="Tags" placeholder="Select tags" margin="normal" />
                )}
            />
            <Autocomplete
                options={categories}
                getOptionLabel={(option) => option.name}
                value={categories.find((cat) => cat.id === bookDTO.categoryId) || null}
                onChange={handleCategoryChange}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                    <TextField {...params} label="Category" margin="normal" fullWidth required />
                )}
            />
            <Button type="submit" variant="contained" color="primary">
                {bookDTO.id ? 'Save Changes' : 'Add Book'}
            </Button>
        </form>
    );
}
