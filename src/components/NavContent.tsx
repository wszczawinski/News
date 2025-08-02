import { Link } from "@tanstack/react-router";
import { TvMinimalPlay } from "lucide-react";

export const NavContent = ({ onClick }: { onClick?: () => void }) => {
  return (
    <>
      <Link
        to="/"
        onClick={onClick}
        activeOptions={{ includeSearch: true }}
        className="text-muted-foreground transition-colors hover:text-foreground"
        activeProps={{ className: "text-sky-600 hover:text-sky-600" }}
      >
        Home
      </Link>
      <Link
        to="/links"
        onClick={onClick}
        className="text-muted-foreground transition-colors hover:text-foreground"
        activeProps={{ className: "text-sky-600" }}
      >
        Linki
      </Link>
      <Link
        to={"/"}
        onClick={onClick}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Rowerowa
      </Link>
      <a href={"#"} onClick={onClick}>
        <TvMinimalPlay />
      </a>
    </>
  );
};
