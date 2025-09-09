export interface ContactInterface {
    _id: string;
    name: string;
    phoneNumber: number;
    tags: string[];

    workspaceId: {
        _id: string;
        name: string;
        description?: string;
    };

    createdBy: {
        _id: string;
        email: string;
    };

    createdAt: string;
    updatedAt: string;
}

export interface SendContactInterface {
    name: string;
    phoneNumber: number;
    tags: string[];
    workspaceId: string;
}