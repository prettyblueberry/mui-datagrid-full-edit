import { MenuItem } from '@mui/material';
import * as XLSX from 'xlsx';
import * as React from 'react';
import {
    gridFilteredSortedRowIdsSelector,
    gridVisibleColumnFieldsSelector,
    useGridApiContext,
} from '@mui/x-data-grid';

function getExcelData(apiRef) {
    // Select rows and columns
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    // Format the data. Here we only keep the value
    return filteredSortedRowIds.map((id) => {
        const row = {};
        visibleColumnsField.forEach((field) => {
            row[field] = apiRef.current.getCellParams(id, field).value;
        });
        return row;
    });
}

function handleExport(apiRef, columns) {
    const data = getExcelData(apiRef);
    const fields = columns.map(c => c.field);
    const rows = data.map((row) => {
        const mRow = {};
        for (const key of fields) {
            mRow[key] = row[key];
        }
        return mRow;
    });

    const columnNames = columns.map( c => c.headerName);
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.sheet_add_aoa(worksheet, [[...columnNames]], {
        origin: 'A1',
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, document.title + ".xlsx", { compression: true });
}

export default function GridExcelExportMenuItem(props) {
    const apiRef = useGridApiContext();
    const { hideMenu, columns } = props;

    return (
        <MenuItem
            onClick={() => {
                handleExport(apiRef, columns);
                // Hide the export menu after the export
                hideMenu?.();
            }}
        >
            Download as Excel
        </MenuItem>
    );
}