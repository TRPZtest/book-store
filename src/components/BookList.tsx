import { Fragment, useEffect, useState } from "react";
import { BookStoreService } from "../services/BookStoreService";
import { Book } from "../services/models/Book";
import { GetBooksDTO } from "../services/models/GetBooksDTO";
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Box, Chip, List, ListItem, ListItemButton, ListItemText, Pagination, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(5); // You can adjust the page size as needed
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const service = new BookStoreService();
      const response: GetBooksDTO = await service.getBooks(page, pageSize);
      setBooks(response.books);
      setTotalPages(response.totalPageNumber);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Error while fetching books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(pageNumber);
  }, [pageNumber]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Fragment>
      <Typography variant="h4" component="span">
        Books List
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
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
                    <br />
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
      <Box display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Fragment>
  );
}