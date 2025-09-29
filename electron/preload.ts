import { contextBridge } from "electron";

export interface ElectronAPI {
  platform: NodeJS.Platform;
}

contextBridge.exposeInMainWorld("electron", {
  platform: process.platform,
} as ElectronAPI);
