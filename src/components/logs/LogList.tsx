import React from 'react';
import {DataTable, DataTableField, TablePagination} from "@chumsinc/sortable-tables";
import {GraphQLLog} from "@/types/logs";
import {selectAllLogs} from "@/ducks/log";
import {useAppSelector} from "@/app/configureStore";
import dayjs from "dayjs";
import classNames from "classnames";

const fields: DataTableField<GraphQLLog>[] = [
    {field: 'timestamp', title: 'Timestamp', render: (row) => dayjs(row.timestamp).format('YYYY-MM-DD HH:mm:ss')},
    {field: 'action', title: 'Action'},
    {field: 'response', title: 'Response', render: (row) => row.response.length, align: "end"},
    {
        field: 'errors',
        title: 'Errors',
        render: (row) => row.errors.length,
        align: "end",
        className: (row) => classNames({
            'text-danger': row.errors.length > 0,
            'text-secondary': row.errors.length === 0
        })
    },
    {field: 'actualQueryCost', title: 'Query Cost', align: 'end'},
]

export interface LogListProps {
    onClick: (item: GraphQLLog) => void,
    selected?: GraphQLLog;
}

export default function LogList({onClick, selected}: LogListProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const logs = useAppSelector(selectAllLogs);

    return (
        <div>
            <DataTable fields={fields} keyField="id" size="xs" onSelectRow={onClick}
                       selected={(row) => row.id === selected?.id}
                       data={logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}/>
            <TablePagination count={logs.length} showFirst showLast
                             page={page} rowsPerPage={rowsPerPage} onChangePage={setPage} size="sm"
                             rowsPerPageProps={{onChange: setRowsPerPage,}}/>
        </div>
    )
}
