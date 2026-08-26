/**
 * `node:sqlite` est disponible nativement depuis Node 22.5 mais n'est pas
 * encore typé dans `@types/node@20` (version installée dans ce projet).
 * Déclaration minimale, limitée à l'API réellement utilisée par `lib/auth/db.ts`.
 */
declare module "node:sqlite" {
  export interface StatementResultingChanges {
    changes: number | bigint;
    lastInsertRowid: number | bigint;
  }

  export class StatementSync {
    run(...params: unknown[]): StatementResultingChanges;
    get(...params: unknown[]): Record<string, unknown> | undefined;
    all(...params: unknown[]): Record<string, unknown>[];
  }

  export class DatabaseSync {
    constructor(location: string, options?: { open?: boolean; readOnly?: boolean });
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
    close(): void;
  }
}
