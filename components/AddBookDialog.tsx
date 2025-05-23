import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
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

interface AddBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBook: (book: Book) => void;
}

export function AddBookDialog({ open, onOpenChange, onAddBook }: AddBookDialogProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      coverUrl: "",
      rating: 0,
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newBook: Book = {
      id: crypto.randomUUID(),
      ...values,
      dateAdded: new Date().toISOString(),
    };
    onAddBook(newBook);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-black text-white border-white/20 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-bricolage">Add a New Book</DialogTitle>
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
                    <Input placeholder="Enter book title" className="bg-white/10 border-white/20 rounded-lg" {...field} />
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
                    <Input placeholder="Enter author name" className="bg-white/10 border-white/20 rounded-lg" {...field} />
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
                    <Input placeholder="Enter cover image URL" className="bg-white/10 border-white/20 rounded-lg" {...field} />
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
                          className="p-1 h-auto hover:bg-white/10 rounded-lg"
                          onMouseEnter={() => setHoveredRating(rating)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => field.onChange(rating)}
                        >
                          <Star
                            className={`w-6 h-6 ${
                              rating <= (hoveredRating || field.value)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-500"
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
                      className="resize-none bg-white/10 border-white/20 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-[#b7e6a1] hover:bg-[#a5d990] text-black font-medium py-2 rounded-lg transition-colors"
            >
              Add Book
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 