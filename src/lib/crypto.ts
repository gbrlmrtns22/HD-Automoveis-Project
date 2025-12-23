import crypto from "crypto";
import { env } from "@/lib/env";

const algorithm = "aes-256-gcm";

export type EncryptedPayload = {
  iv: string;
  tag: string;
  payload: string;
};

const key = Buffer.from(env.LEAD_ENCRYPTION_KEY, "hex");

export const encryptText = (value: string): EncryptedPayload => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
    payload: encrypted.toString("hex")
  };
};

export const decryptText = (payload: EncryptedPayload): string => {
  const iv = Buffer.from(payload.iv, "hex");
  const tag = Buffer.from(payload.tag, "hex");
  const encrypted = Buffer.from(payload.payload, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
};
