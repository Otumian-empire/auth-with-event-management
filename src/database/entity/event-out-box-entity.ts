import { Column, Entity, Index } from "typeorm";
import SupportEntity from "./support-entity";
import { NotificationChannels } from "../../core/constants";

@Entity()
export class EventOutBox extends SupportEntity {
    @Column({ type: "varchar" })
    type: NotificationChannels;

    @Column("jsonb")
    payload: any;

    @Column({ default: false })
    processed: boolean;
}
