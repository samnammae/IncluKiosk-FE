export {};

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            autoDisplay?: boolean;
            includedLanguages?: string;
            layout?: unknown;
          },
          elementId: string
        ) => void;
      };
    };
  }
}
