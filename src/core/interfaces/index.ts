interface EventIdentifier {
    eventIdentifier?: string;
}

export interface CreateUserSuccessfulEmailPayload extends EventIdentifier {
    firstName: string;
    lastName: string;
    email: string;
}
