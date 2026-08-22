import { useRef, useState, type DragEvent } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FileUpload({
  title,
  hint,
  accept,
  buttonLabel = "Choose File",
  onFile,
  busy = false,
}: {
  title: string;
  hint: string;
  accept: string;
  buttonLabel?: string;
  onFile: (file: File) => void;
  busy?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/70 px-6 py-14 text-center transition-colors",
        dragging && "border-primary/60 bg-accent/40",
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
        <UploadCloud className="size-6" />
      </span>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{hint}</p>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
      <Button className="mt-5 rounded-xl" disabled={busy} onClick={() => inputRef.current?.click()}>
        {busy ? "Processing…" : buttonLabel}
      </Button>
      <p className="mt-3 text-[11px] text-muted-foreground">or drag and drop the file here</p>
    </div>
  );
}
