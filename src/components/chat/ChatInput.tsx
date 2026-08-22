import { useRef, useState } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ChatInput({
  onSend,
  disabled,
  placeholder = "Send a message…",
  allowAttachments = true,
}: {
  onSend: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  allowAttachments?: boolean;
}) {
  const [value, setValue] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  return (
    <div className="border-t border-border bg-background/85 p-3 backdrop-blur-xl sm:p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-card focus-within:border-primary/40">
        {allowAttachments && (
          <>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) toast.success(`Attached ${file.name} (demo only)`);
                e.target.value = "";
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-xl"
              aria-label="Attach file"
              onClick={() => fileRef.current?.click()}
            >
              <Paperclip className="size-[18px]" />
            </Button>
          </>
        )}

        <textarea
          rows={1}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          className="max-h-40 min-h-10 flex-1 resize-none bg-transparent px-1 py-2.5 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-60"
        />

        <Button
          size="icon"
          className="shrink-0 rounded-xl"
          aria-label="Send message"
          disabled={disabled || !value.trim()}
          onClick={submit}
        >
          <SendHorizontal className="size-[18px]" />
        </Button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground">
        Responses are mock data generated in the browser for demonstration.
      </p>
    </div>
  );
}
