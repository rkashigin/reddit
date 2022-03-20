import { Entity, BaseEntity, ManyToOne, PrimaryColumn, Column } from 'typeorm';

import { User } from './User';
import { Post } from './Post';

@Entity({ name: 'updoots' })
export class Updoot extends BaseEntity {
  @Column({ type: 'int' })
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.updoots)
  user: User;

  @PrimaryColumn()
  postId: Date;

  @ManyToOne(() => Post, (post) => post.updoots)
  post: Post;
}
