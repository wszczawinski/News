import { Link } from "@tanstack/react-router";
import { Copyright } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().toLocaleDateString("pl-PL", {
    year: "numeric",
  });

  return (
    <div className="border-t border-border/40 px-4 md:px-6">
      <footer className="text-sm flex flex-col md:flex-row justify-between items-center gap-6 py-4 w-full mx-auto max-w-screen-lg">
        <div className="flex gap-8">
          <Link
            to={"/contact"}
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-sky-600" }}
          >
            Kontakt
          </Link>
          <Link
            to={"/links"}
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-sky-600" }}
          >
            Linki
          </Link>
        </div>
        <div className="flex gap-2 text-muted-foreground ">
          <Copyright size={20} /> 2006-{currentYear}
        </div>
      </footer>
    </div>
  );
};
