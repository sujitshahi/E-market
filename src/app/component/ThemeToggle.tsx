

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <label className="relative inline-flex items-center cursor-pointer ml-7">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <div className="  w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full"></div>

        <div
            className="
            absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow
            peer-checked:translate-x-7
            transition-transform
            ">
        </div>

    </label>
  );
}




