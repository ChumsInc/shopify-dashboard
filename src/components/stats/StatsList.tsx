import {DataTable, type DataTableField} from "@chumsinc/sortable-tables";
import type {ActionStats} from "@/types/stats";
import {useAppSelector} from "@/app/configureStore";
import {selectStats} from "@/ducks/stats";
import classNames from "classnames";

const fields: DataTableField<ActionStats>[] = [
    {field: 'actionPeriod', title: 'Period'},
    {field: "actionCount", title: "Count"},
    {
        field: "actions",
        title: "Actions",
        render: (row) => (<div>{row.actions.map(action => (<div key={action}>{action}</div>))}</div>)
    },
    {field: "responseCount", title: "Response Records", align: "end"},
    {
        field: "errorCount",
        title: "Error Records",
        align: "end",
        className: (row) => classNames({'text-danger': row.errorCount > 0})
    },
    // {field: "minTimestamp", title: "From/To", align: "end", render: (row) => (
    //     <div>
    //         <div>{dayjs(row.minTimestamp).format("MM/DD/YYYY HH:mm")}</div>
    //         <div>{dayjs(row.maxTimestamp).format("MM/DD/YYYY HH:mm")}</div>
    //     </div>
    //     )},
];

export interface StatsListProps {
    onClick: (item: ActionStats) => void,
}

export default function StatsList({onClick}: StatsListProps) {
    const stats = useAppSelector(selectStats);

    return (
        <div>
            <DataTable fields={fields} data={stats} keyField="actionPeriod" size="xs" onSelectRow={onClick}/>
        </div>
    )
}
