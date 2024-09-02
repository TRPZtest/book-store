import { Fragment, useEffect, useState } from "react";
import { BookStoreService } from "../services/BookStoreService";
import { Book } from "../services/models/Book";
import { GetBooksDTO } from "../services/models/GetBooksDTO";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  Chip,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Delete } from "@mui/icons-material";

export function BookList() {
  const service = new BookStoreService();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchBooks = async (page: number) => {
    setLoading(true);
    try {
      const response: GetBooksDTO = await service.getBooks(page, pageSize);
      setBooks(response.books);
      setTotalPages(response.totalPageNumber);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await service.deleteBook(bookId);
        fetchBooks(pageNumber);
      } catch (error) {
        alert("Error deleting book");
      }
    }
  };

  useEffect(() => {
    fetchBooks(pageNumber);
  }, [pageNumber]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
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
      <List>
        {books.map((book) => (
          <ListItem key={book.id} disablePadding>   
              <ListItemText
                primary={
                    <>
                        <Link to={`/books/edit/${book.id}`}>  {book.name}</Link>   
                        <Button onClick={() => handleDelete(book.id)} startIcon={<Delete color="action"/>}/>                      
                    </>                      
                }
                secondary={
                  <>
                    <Typography component="span" color="textPrimary">                       
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