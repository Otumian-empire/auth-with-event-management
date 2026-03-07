import { EntityManager } from "typeorm";
import { EventOutBox } from "../../database";
import { publisher } from "./publisher";

export async function EventOtuBoxRelayWorker(manager: EntityManager) {
    while (true) {
        try {
            const unprocessedEvents = await manager.find(EventOutBox, {
                where: { processed: false },
                take: 5,
                order: { createdDate: "ASC" },
            });

            for (const event of unprocessedEvents) {
                await publisher(event.type, {
                    ...event.payload,
                    eventIdentifier: event.uuid,
                });

                event.processed = true;

                await manager.save(EventOutBox, event);
            }
        } catch (error) {
            console.log(
                "An error occurred while pooling events for processing"
            );
            console.log((error as Error).stack);
        }

        await new Promise((resolve) => setTimeout(resolve, 5000));
    }
}
