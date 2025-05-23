"use client";

import { useState, useEffect } from "react";
import { BookCover } from "@/components/BookCover";
import { AddBookButton } from "@/components/AddBookButton";
import { AddBookDialog } from "@/components/AddBookDialog";
import { Book } from "@/types/book";
import { getItem, setItem } from "@/lib/storage";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const savedBooks = getItem<Book[]>("books", []);
    setBooks(savedBooks);
  }, []);

  const handleAddBook = (newBook: Book) => {
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    setItem("books", updatedBooks);
  };

  const handleEditBook = (id: string, updatedBook: Partial<Book>) => {
    const updatedBooks = books.map(book => 
      book.id === id ? { ...book, ...updatedBook } : book
    );
    setBooks(updatedBooks);
    setItem("books", updatedBooks);
  };

  const handleDeleteBook = (id: string) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    setItem("books", updatedBooks);
  };

  return (
    <main className="h-screen overflow-hidden flex flex-col items-center justify-center p-8 gradient-background">
      <div className="w-full max-w-[1000px] flex flex-col items-center gap-6">
        <h1 className="font-bricolage text-5xl font-bold text-[#dddddd] opacity-40 tracking-wide">
          My Bookshelf
        </h1>
        <div className="w-full h-[600px] bg-white/20 backdrop-blur-lg rounded-xl shadow-lg">
          <div className="h-full scrollbar-overlay">
            <div className="max-w-[900px] mx-auto">
              <div className="grid grid-cols-4 gap-8 p-8 pb-16">
                <AddBookButton onClick={() => setIsDialogOpen(true)} />
                {books.map((book) => (
                  <BookCover 
                    key={book.id} 
                    book={book}
                    onEdit={handleEditBook}
                    onDelete={handleDeleteBook}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddBookDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddBook={handleAddBook}
      />
    </main>
  );
}
