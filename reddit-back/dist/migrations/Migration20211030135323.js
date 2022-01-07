"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20211030135323 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20211030135323 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null default \'NOW()\', "username" text not null, "email" text null, "password" text not null);');
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
        this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
        this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null default \'NOW()\', "title" text not null);');
    }
}
exports.Migration20211030135323 = Migration20211030135323;
//# sourceMappingURL=Migration20211030135323.js.map