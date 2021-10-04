"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20210912202432 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210912202432 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null default \'NOW()\', "username" text not null, "password" text not null);');
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
        this.addSql('alter table "post" drop constraint if exists "post_created_at_check";');
        this.addSql('alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
        this.addSql('alter table "post" alter column "created_at" set default \'NOW()\';');
        this.addSql('alter table "post" drop constraint if exists "post_updated_at_check";');
        this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
        this.addSql('alter table "post" alter column "updated_at" set default \'NOW()\';');
    }
}
exports.Migration20210912202432 = Migration20210912202432;
//# sourceMappingURL=Migration20210912202432.js.map