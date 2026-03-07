import {
    BaseEntity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

export default abstract class SupportEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @CreateDateColumn({ type: "timestamp" })
    createdDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedDate: Date;

    constructor(model?: Partial<SupportEntity>) {
        super();
        Object.assign(this, model);
    }

    toJSON() {
        return {
            ...this,
            id: undefined, // Removes 'id' when serializing
        };
    }
}
