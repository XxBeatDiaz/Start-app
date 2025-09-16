export {};

declare global {
  interface Window {
    electronAPI: {
      openAllProjectItems: (project: any) => void;
    };
  }
}