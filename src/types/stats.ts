export interface ActionStats {
    actionYear: string|number;
    actionPeriod: string;
    actions: string[];
    actionCount: number;
    responseCount: number;
    errorCount: number;
    minTimestamp: string;
    maxTimestamp: string;
}

export interface LoadUpdateLogStatsProps {
    period: 'hourly'|'daily'|'weekly'|'monthly'|string;
    action?: string;
    start?: number|string;
    limit?: number|string;
}


export interface LoadUpdateLogStatsResponse {
    stats: ActionStats[];
    updated: string;
}
