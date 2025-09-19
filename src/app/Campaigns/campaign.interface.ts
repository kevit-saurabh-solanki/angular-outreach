export interface CampaignInterface {
    _id: string;
    name: string;
    targetTags: string[];
    description: string;
    status: string;

    messageId: {
        _id: string,
        title: string
    }

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
    messageId: string;
    targetTags: string[];
    description: string;
    workspaceId: string;
}

export interface PaginatedCampaignsInterface {
    data: CampaignInterface[];
    page: number;
    total: number;
    totalPages: number;
}