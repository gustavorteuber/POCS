import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    title!: string;

  @Column({ default: false })
    completed!: boolean;

  @Column()
    isDeleted!: boolean;

  @Column()
    isMigrate!: boolean;
}
