import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "lucide-react";

import ThemeSelector from "./ThemeSelector";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-base-content/10 bg-base-100/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl">
        <div className="navbar min-h-[4rem] justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBagIcon className="size-7 text-primary" />
            <span className="font-mono text-xl font-bold tracking-tight">
              My<span className="text-primary">Store</span>
            </span>
          </Link>

          <ThemeSelector />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
