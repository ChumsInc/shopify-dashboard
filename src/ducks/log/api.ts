import {GraphQLLog, LoadUpdatesLogProps} from "@/types/logs";
import {fetchJSON} from "@chumsinc/ui-utils";

export async function fetchLogs(arg: LoadUpdatesLogProps): Promise<GraphQLLog[]> {
    try {
        const params = new URLSearchParams();
        if (arg.action) {
            params.append('action', arg.action);
        }
        if (arg.minDate) {
            params.append('minDate', arg.minDate);
        }
        if (arg.maxDate) {
            params.append('maxDate', arg.maxDate);
        }
        if (arg.start) {
            params.append('start', arg.start.toString());
        }
        if (arg.limit) {
            params.append('limit', arg.limit.toString());
        }

        const url = `/api/shopify/admin/updates/log.json?${params.toString()}`;
        const res = await fetchJSON<GraphQLLog[]>(url, {cache: 'no-cache'});
        return res ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchLogs()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchLogs()", err);
        return Promise.reject(new Error('Error in fetchLogs()'));
    }
}
