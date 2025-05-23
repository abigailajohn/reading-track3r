export function AddBookButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="space-y-3">
      <div
        onClick={onClick}
        className="w-full cursor-pointer"
      >
        <div className="aspect-[2/3] w-full rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.2)] border-2 border-dashed border-white/20 hover:border-white/40 transition-colors bg-white/5" />
      </div>
      <div className="h-[28px]" /> {/* Exact height to match star rating space */}
    </div>
  );
} 