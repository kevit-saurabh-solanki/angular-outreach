export interface MessageInterface {
    _id: string;
    title: string;
    messageType: string;
    imagePath?: string;
    content: string;

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

export interface SendMessageInterface {
    title: string;
    messageType: string;
    imagePath?: string;
    content: string;
    workspaceId: string;
}