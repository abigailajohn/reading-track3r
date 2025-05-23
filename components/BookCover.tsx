import { useState } from "react";
import { Star } from "lucide-react";
import { Book } from "@/types/book";
import { BookDetailsDialog } from "./BookDetailsDialog";

interface BookCoverProps {
  book: Book;
  onEdit: (id: string, updatedBook: Partial<Book>) => void;
  onDelete: (id: string) => void;
}

export function BookCover({ book, onEdit, onDelete }: BookCoverProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div 
        onClick={() => setIsDialogOpen(true)}
        className="w-full cursor-pointer"
      >
        <div className="aspect-[2/3] rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.2)] overflow-hidden bg-white/5 animate-subtle-shake">
          <img 
            src={book.coverUrl} 
            alt={`${book.title} cover`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 drop-shadow-md ${
              star <= book.rating
                ? "fill-yellow-400 text-yellow-400 animate-pulse"
                : "text-gray-400/40"
            }`}
          />
        ))}
      </div>
      <BookDetailsDialog
        book={book}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
} 