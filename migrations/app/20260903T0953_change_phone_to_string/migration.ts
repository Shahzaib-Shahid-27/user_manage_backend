#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/cd882d9875ed27050781d8c5d799a0ef71b42e98ccd737cbb120677044157e26/contract';
import startContract from '../../snapshots/cd882d9875ed27050781d8c5d799a0ef71b42e98ccd737cbb120677044157e26/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/fc26a28c44145e2c5776e932540c36a142ab079a4608a33b4ec894fff3c4c2c1/contract';
import endContract from '../../snapshots/fc26a28c44145e2c5776e932540c36a142ab079a4608a33b4ec894fff3c4c2c1/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dataTransform(endContract, 'typechange-user-phone', {
        check: () => placeholder('typechange-user-phone:check'),
        run: () => placeholder('typechange-user-phone:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'user',
        column: 'phone',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
