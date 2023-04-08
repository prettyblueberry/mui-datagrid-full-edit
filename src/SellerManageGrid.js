/*
This file is
to customize the ui of the grid and
to integrate with a communication with backend.
 */

import * as React from "react";
import FullEditDataGrid from "./lib/index";
import { useEffect, useState } from "react";
import sellerController from "./seller";

export default function SellerManageGrid() {
    const [rows, setRawRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const setRows = (rows) => {
        return setRawRows([...rows.map((r, i) => ({ ...r, no: i + 1 }))]);
    };
    useEffect(() => {
        setLoading(true);
        sellerController
            .getAll()
            .then((res) => {
                setRows(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const onSaveRow = (id, updatedRow, oldRow, oldRows) => {
        sellerController
            .saveRow(updatedRow)
            .then((res) => {
                const dbRow = res.data;
                setRows(oldRows.map((r) => (r.id === updatedRow.id ? { ...dbRow } : r)));
            })
            .catch((err) => {
                setRows(oldRows);
            });
    };

    const onDeleteRow = (id, oldRow, oldRows) => {
        sellerController
            .deleteRow(id)
            .then((res) => {
                const dbRowId = res.data.id;
                setRows(oldRows.filter((r) => r.id !== dbRowId));
            })
            .catch((err) => {
                setRows(oldRows);
            });
    };

    const createRowData = (rows) => {
        const newId = Math.max(...rows.map((r) => (r.id ? r.id : 0) * 1)) + 1;
        const newNo = Math.max(...rows.map((r) => (r.no ? r.no : 0) * 1)) + 1;
        return { id: newId, no: newNo };
    };

    return (
        <FullEditDataGrid
            columns={columns}
            rows={rows}
            onSaveRow={onSaveRow}
            onDeleteRow={onDeleteRow}
            createRowData={createRowData}
            loading={loading}
        />
    );
}

const columns = [
    {
        field: "no",
        headerName: "No",
        width: 50,
        align: "center",
        type: "number",
        editable: false
    },
    {
        field: "id",
        headerName: "Id",
        width: 50,
        hide: true,
        align: "center",
        type: "number",
        editable: true
    },
    {
        field: "login",
        headerName: "Login",
        width: 100,
        headerAlign: "center",
        type: "string",
        align: "center",
        editable: true
    },
    {
        field: "title",
        headerName: "Title",
        width: 150,
        headerAlign: "center",
        type: "string",
        align: "center",
        editable: true
    },
    {
        field: "desc",
        headerName: "Description",
        width: 250,
        headerAlign: "center",
        type: "string",
        editable: true
    }
];
