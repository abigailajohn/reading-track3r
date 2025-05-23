import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Book } from "@/types/book";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  coverUrl: z.string().url("Please enter a valid URL"),
  rating: z.number().min(1).max(5),
  notes: z.string().optional(),
});

interface BookDetailsDialogProps {
  book: Book;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (id: string, updatedBook: Partial<Book>) => void;
  onDelete: (id: string) => void;
}

export function BookDetailsDialog({ book, open, onOpenChange, onEdit, onDelete }: BookDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
      rating: book.rating,
      notes: book.notes || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onEdit(book.id, values);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter book title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coverUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter cover image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            type="button"
                            variant="ghost"
                            className="p-1 h-auto"
                            onMouseEnter={() => setHoveredRating(rating)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => field.onChange(rating)}
                          >
                            <Star
                              className={`w-6 h-6 ${
                                rating <= (hoveredRating || field.value)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any notes about the book..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Save Changes</Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="absolute right-4 top-4 flex items-center gap-6">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                onDelete(book.id);
                onOpenChange(false);
              }}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <DialogClose className="h-8 w-8" />
        </div>
        <DialogHeader className="pt-6">
          <DialogTitle className="text-xl font-semibold">{book.title}</DialogTitle>
          <p className="text-muted-foreground">by {book.author}</p>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={book.coverUrl}
              alt={`${book.title} cover`}
              className="h-64 rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Rating</h3>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= book.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          {book.notes && (
            <div className="space-y-2">
              <h3 className="font-medium">Notes</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {book.notes}
              </p>
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            Added on {new Date(book.dateAdded).toLocaleDateString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 