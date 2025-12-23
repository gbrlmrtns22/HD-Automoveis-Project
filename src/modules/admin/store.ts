export type AuditEntry = {
  id: string;
  action: string;
  createdAt: string;
  actor: string;
};

const auditLog: AuditEntry[] = [];

export const inMemoryAuditLog = {
  add(entry: AuditEntry) {
    auditLog.unshift(entry);
  },
  list() {
    return auditLog;
  }
};
