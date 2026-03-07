import { Column, Entity, Index } from "typeorm";
import SupportEntity from "./support-entity";

@Entity("user")
@Index(["email"], { unique: true })
export class User extends SupportEntity {
    @Column({ default: "" })
    firstName: string;

    @Column({ default: "" })
    lastName: string;

    @Column({ default: "" })
    middleName: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ default: false })
    isEmailVerified: boolean;

    @Column({ nullable: false })
    password: string;

    @Column({ type: "date", nullable: true })
    dateOfBirth: Date;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: "timestamp", nullable: true })
    lastLoggedInAt?: Date;

    @Column({ type: "timestamp", nullable: true })
    passwordChangedAt: Date;

    toJSON() {
        return {
            ...this,
            uuid: undefined, // Removes 'id' when serializing
            password: undefined,
        };
    }
}
