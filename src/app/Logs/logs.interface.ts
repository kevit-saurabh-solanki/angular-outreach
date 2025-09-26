export interface LogsInterface {
    actionDoneAt: Date;
    action: string;
    resource: string;

    workspaceId: {
        _id: string;
        name: string;
    };

    actionTakenBy: {
        _id: string;
        email: string;
    };

    actionTakenOn: {
        _id: string;
        name?: string;
        title?: string;
        phoneNumber?: number;
    }
}