import {ActionStats, LoadUpdateLogStatsProps, LoadUpdateLogStatsResponse} from "@/types/stats";
import {fetchJSON} from "@chumsinc/ui-utils";

export async function fetchStats(arg:LoadUpdateLogStatsProps):Promise<LoadUpdateLogStatsResponse> {
    try {
        const params = new URLSearchParams();
        if (arg.action) {
            params.append('action', arg.action);
        }
        if (arg.start) {
            params.append('start', arg.start.toString());
        }
        if (arg.limit) {
            params.append('limit', arg.limit.toString());
        }

        const url = `/api/shopify/admin/updates/stats/:period.json?${params.toString()}`
            .replace(':period', arg.period || 'weekly');
        const res = await fetchJSON<ActionStats[]>(url, {cache: 'no-cache'});
        return {
            stats: res ?? [],
            updated: new Date().toISOString(),
        };
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchStats()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchStats()", err);
        return Promise.reject(new Error('Error in fetchStats()'));
    }
}
