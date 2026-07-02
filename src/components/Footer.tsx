import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t border-white/[0.06] py-6 px-8", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-11">
          LixenAI Operations Dashboard
        </p>
        <p className="text-sm text-slate-11">
          Internal Use Only
        </p>
      </div>
    </footer>
  );
}
