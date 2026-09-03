// #!/usr/bin/env -S node

import endContract from '../../snapshots/cd882d9875ed27050781d8c5d799a0ef71b42e98ccd737cbb120677044157e26/contract.json' with { type: 'json' };

import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

type End = typeof endContract;

export default class M extends Migration<never, any> {

  override readonly endContractJson = endContract;

  override get operations() {

    return [

      this.createSchema({ schema: 'public' }),

      this.createTable({
        schema: 'public',
        table: 'user',

        columns: [
          col('address', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' }
          }),

          col('email', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' }
          }),

          col('id', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' }
          }),

          col('name', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' }
          }),

          col('password', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' }
          }),

          col('phone', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' }
          }),
        ],

        constraints: [primaryKey(['id'])],
      }),

      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),

    ];
  }
}

MigrationCLI.run(import.meta.url, M);