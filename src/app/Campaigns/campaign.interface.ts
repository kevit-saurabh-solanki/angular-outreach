export interface CampaignInterface {
    _id: string;
    name: string;
    messageId: string;
    targetTags: string[];
    content: string;
    status: string;

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

export interface SendCampaignInterface {
    name: string;
    message: string;
    targetTags: string[];
    content: string;
    status: string;
    workspaceId: string;
}