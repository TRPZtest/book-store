import { Fragment, useEffect, useState } from "react";
import { BookStoreService } from "../services/BookStoreService";
import { Book } from "../services/models/Book";
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Box, Chip, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const service = new BookStoreService();
                const books : Book[] = await service.getAllBooks();

                setBooks(books);
            } catch (error) {
               
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Fragment>
            <Typography variant="h4" component="span">
                Books List
            </Typography>
            <List>
                {books.map((book) => (
                    <ListItem key={book.id} disablePadding>
                        <ListItemButton component={Link} to={`/books/edit/${book.id}`}>
                            <ListItemText                         
                                primary={book.name}
                                secondary={
                                    <>
                                      <Typography component="span" variant="body2" color="textPrimary">
                                            Category: {book.category.name}
                                        </Typography>                  
                                        <br/>                                                           
                                        {book.tags.map((tag) => (
                                            <Chip
                                                component="span"
                                                key={tag.id}
                                                label={tag.name}
                                                size="small"
                                                sx={{ mr: 0.5, mb: 0.5 }}
                                            />
                                        ))}                                    
                                    </>                                                                                                                          
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Fragment>
    );
};
