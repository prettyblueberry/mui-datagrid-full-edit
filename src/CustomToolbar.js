/*
    This is a customized toolbar.
    Unlike the default toolbar, it does not include the "Add" button.
    Please refer to the commented code to see the differences between the default toolbar and this customized one.
 */

import * as React from "react";
import {
    GridRowModes,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExportContainer,
    GridCsvExportMenuItem,
    GridToolbarFilterButton,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";
import GridExcelExportMenuItem from "./lib/components/GridExcelExportMenuItem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function CustomToolbar(props) {
    const {/*rows, setRows, setRowModesModel,*/ columns/*, createRowData*/ } = props;

    // const handleClick = () => {
    //     const newData = createRowData(rows);
    //     newData.isNew = true;
    //     if(!newData.hasOwnProperty("id"))
    //         newData.newId = Math.max(...rows.map((r)=>r.id * 1)) + 1;
    //     setRows((oldRows) => {
    //         return [...oldRows, newData]
    //     });
    //     setRowModesModel((oldModel) => {
    //         const firstEditable = columns.find(c => c.editable && !c.hide);
    //         return {
    //             ...oldModel,
    //             [newData.id]: {mode: GridRowModes.Edit, fieldToFocus: firstEditable.field}
    //         }
    //     });
    // };

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExportContainer>
                <GridExcelExportMenuItem columns={columns} />
                <GridCsvExportMenuItem />
            </GridToolbarExportContainer>
            {/*<Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>*/}
            {/*    Add record*/}
            {/*</Button>*/}
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}

// DefaultToolbar.defaultProps = {
//     createRowData: (rows) => {
//         const newId = Math.max(...rows.map((r)=>r.id * 1)) + 1;
//         return {id: newId}
//     }
// }

export default CustomToolbar;