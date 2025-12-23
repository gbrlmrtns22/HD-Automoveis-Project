import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { env } from "@/lib/env";

const getKey = () => {
  if (!env.LEAD_ENCRYPTION_KEY) {
    return null;
  }
  const buffer = Buffer.from(env.LEAD_ENCRYPTION_KEY, "base64");
  return buffer.length === 32 ? buffer : null;
};

export const encrypt = (value: string) => {
  const key = getKey();
  if (!key) {
    return value;
  }
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
};

export const decrypt = (payload: string) => {
  const key = getKey();
  if (!key) {
    return payload;
  }
  const buffer = Buffer.from(payload, "base64");
  const iv = buffer.subarray(0, 12);
  const tag = buffer.subarray(12, 28);
  const encrypted = buffer.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
};
