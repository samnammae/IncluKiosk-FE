import { v4 as uuidv4 } from "uuid";

export function generateSessionId(storeId: string): string {
  const now = new Date();

  // YYYYMMDD-HHmmss 형태
  const timestamp =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    "-" +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");

  return `${storeId}-${timestamp}-${uuidv4()}`;
}
