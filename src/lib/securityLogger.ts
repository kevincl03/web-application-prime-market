import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

interface SecurityEvent {
  event: string;
  email?: string;
  ip?: string;
  reason?: string;
  provider?: string;
  endpoint?: string;
  userAgent?: string;
}

const logPath =
  process.env.SECURITY_LOG_PATH ||
  path.join(process.cwd(), "logs", "security.log");

const getClientIp = (
  headers?: Record<string, unknown>
): string => {
  const forwardedFor = headers?.["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = headers?.["x-real-ip"];

  if (typeof realIp === "string" && realIp.trim()) {
    return realIp.trim();
  }

  return "unknown";
};

export const getSecurityClientIp = getClientIp;

export async function writeSecurityLog(
  event: SecurityEvent
): Promise<void> {
  try {
    const logDirectory = path.dirname(logPath);

    await mkdir(logDirectory, {
      recursive: true,
    });

    const record = {
      timestamp: new Date().toISOString(),
      ...event,
    };

    await appendFile(
      logPath,
      `${JSON.stringify(record)}\n`,
      "utf8"
    );
  } catch (error) {
    // El fallo del sistema de logging no debe impedir el login.
    console.error("Security logging error:", error);
  }
}
