import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BookList } from './components/BookList';
import { Box, Container, Typography } from '@mui/material';
import { Bottom } from './components/Bottom';
import { EditBook } from './components/EditBook';
import { AddBook } from './components/AddBook';
import { Navbar } from './components/Navbar';

function App() {

  
    return (   
        <Container>            
            <BrowserRouter>
                <Navbar/>
                    <Routes>
                        <Route path="/" element={<BookList />} />
                        <Route path="/books/list" element={<BookList />} />
                        <Route path="/books/edit/:id" element={<EditBook />} />
                        <Route path="/books/add/" element={<AddBook />} />
                    </Routes>
                </BrowserRouter>    
            <Bottom/>  
        </Container>                     
    );

}

export default App;
