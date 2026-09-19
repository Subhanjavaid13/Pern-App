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
      <button tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Change theme">
        <PaletteIcon className="size-5" />
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu mt-2 max-h-96 w-56 flex-nowrap gap-1 overflow-y-auto rounded-box border border-base-content/10 bg-base-200 p-2 shadow-xl"
      >
        {THEMES.map((option) => (
          <li key={option.value}>
            <button
              onClick={() => handleSelect(option.value)}
              className={theme === option.value ? "active" : ""}
            >
              <PaletteIcon className="size-4" />
              <span className="flex-1 text-left text-sm font-medium">{option.name}</span>

              {/* Preview of the theme's main colors, rendered in that theme. */}
              <span data-theme={option.value} className="flex gap-1">
                <span className="size-2 rounded-full bg-primary" />
                <span className="size-2 rounded-full bg-secondary" />
                <span className="size-2 rounded-full bg-accent" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
