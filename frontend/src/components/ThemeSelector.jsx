import { PaletteIcon } from "lucide-react";

import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  const handleSelect = (value) => {
    setTheme(value);
    // DaisyUI dropdowns stay open while focused, so close it after picking.
    document.activeElement?.blur();
  };

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle btn-sm" aria-label="Change theme">
        <PaletteIcon className="size-5" />
      </button>

      <ul
        tabIndex={0}
        className="scrollbar-slim dropdown-content mt-3 max-h-80 w-56 space-y-0.5 overflow-y-auto rounded-xl border border-base-content/10 bg-base-100 p-1.5 shadow-xl"
      >
        {THEMES.map(({ name, value }) => {
          const isActive = theme === value;

          return (
            <li key={value}>
              <button
                onClick={() => handleSelect(value)}
                className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                  // No text-primary here: on pale themes (pastel, retro) the
                  // primary color has too little contrast to stay readable.
                  isActive ? "bg-base-content/10 font-semibold" : "hover:bg-base-content/5"
                }`}
              >
                <PaletteIcon className="size-4 shrink-0" />
                <span className="flex-1 text-left">{name}</span>

                {/* Preview of the theme's main colors, rendered in that theme.
                    bg-transparent is required: DaisyUI paints base-100 onto every
                    [data-theme] element, which would show as a bar behind the dots. */}
                <span data-theme={value} className="flex shrink-0 gap-1 bg-transparent">
                  <span className="size-2 rounded-full bg-primary" />
                  <span className="size-2 rounded-full bg-secondary" />
                  <span className="size-2 rounded-full bg-accent" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ThemeSelector;
