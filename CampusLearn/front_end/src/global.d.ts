// src/global.d.ts

// This file extends the global types for React to allow non-standard folder upload attributes

declare namespace React {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // Non-standard attributes for folder upload support
    webkitdirectory?: 'true' | 'false' | string;
    directory?: 'true' | 'false' | string;
  }
}

// NOTE: If the error persists, you may need to restart your IDE (VS Code)
// or run the command "TypeScript: Restart TS Server" to re-read the types.