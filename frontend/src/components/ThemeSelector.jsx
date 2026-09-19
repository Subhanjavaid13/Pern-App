import { CheckIcon, PaletteIcon } from "lucide-react";

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

      <div
        tabIndex={0}
        className="dropdown-content mt-3 w-56 rounded-xl border border-base-content/10 bg-base-100 p-1.5 shadow-xl"
      >
        <p className="px-2.5 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
          Theme
        </p>

        <ul className="max-h-72 space-y-0.5 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-base-content/20 [&::-webkit-scrollbar]:w-1.5">
          {THEMES.map(({ name, value }) => {
            const isActive = theme === value;

            return (
              <li key={value}>
                <button
                  onClick={() => handleSelect(value)}
                  className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                    isActive ? "bg-base-content/10 font-medium" : "hover:bg-base-content/5"
                  }`}
                >
                  {/* Preview of the theme's core colors, rendered in that theme. */}
                  <span className="shrink-0 overflow-hidden rounded-md ring-1 ring-inset ring-base-content/15">
                    <span data-theme={value} className="grid grid-cols-2">
                      <span className="size-2.5 bg-primary" />
                      <span className="size-2.5 bg-secondary" />
                      <span className="size-2.5 bg-accent" />
                      <span className="size-2.5 bg-neutral" />
                    </span>
                  </span>

                  <span className="flex-1 text-left">{name}</span>

                  {isActive && <CheckIcon className="size-4 shrink-0 text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ThemeSelector;
