import {InventoryChange, UserError, VariantPriceChange} from "chums-types/src/shopify";

export interface GraphQLLog {
    id: number;
    action: string | null;
    request: string | null;
    response: InventoryChange[] | VariantPriceChange[] | unknown[];
    errors: UserError[];
    actualQueryCost: number | null;
    timestamp: string;
}

export interface LoadUpdatesLogProps {
    action?: string;
    minDate?: string;
    maxDate?: string;
    start?: number;
    limit?: number;
}
