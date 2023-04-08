# mui-datagrid-full-edit

[![NPM Version](https://img.shields.io/npm/v/mui-datagrid-full-edit.svg)](https://www.npmjs.com/package/mui-datagrid-full-edit)
[![NPM Downloads](https://img.shields.io/npm/dt/mui-datagrid-full-edit.svg)](https://www.npmjs.com/package/mui-datagrid-full-edit)
[![NPM License](https://img.shields.io/npm/l/mui-datagrid-full-edit.svg?style=flat)](https://github.com/prettyblueberry/mui-datagrid-full-edit/blob/main/LICENSE)
[![Issues](https://img.shields.io/github/issues-raw/prettyblueberry/mui-datagrid-full-edit.svg?maxAge=25000)](https://github.com/prettyblueberry/mui-datagrid-full-edit/issues)

[//]: # ([![npm]&#40;https://img.shields.io/github/stars/prettyblueberry/mui-datagrid-full-edit.svg&#41;]&#40;https://github.com/prettyblueberry/mui-datagrid-full-edit&#41;)
[//]: # ([![fork]&#40;https://img.shields.io/github/forks/prettyblueberry/mui-datagrid-full-edit.svg&#41;]&#40;https://github.com/prettyblueberry/mui-datagrid-full-edit/fork&#41;)

## Overview

`mui-datagrid-full-edit` is a full functioned grid component with CRUD. But you can use it very simply with few props settings.

It is an easy way of `@mui/x-data-grid`. If you're thinking `@mui/x-data-grid` is good for your admin page but difficult a bit, `mui-datagrid-full-edit` would be the best choice for you. 

You can experience a good react datagrid which is very **simple** to use but with **full functions**. By default, the grid has a paginator and abilities like hide-column, export-as-CSV, advanced-filters.

`export-as-excel` is coming soon. `@mui/x-data-grid-pro` and `@mui/x-data-premium` provide it by license key, but `mui-datagrid-full-edit` will provide it without any license key. 

## How to Use

### Examples
#### mui-datagrid-full-edit-sample1

[View on CodeSandbox](https://codesandbox.io/s/github/prettyblueberry/mui-datagrid-full-edit-sample1)

[View on GitHub](https://github.com/prettyblueberry/mui-datagrid-full-edit-sample1)

### Install

```bash
$ npm install --save mui-datagrid-full-edit
```
or
```bash
$ yarn add mui-datagrid-full-edit
```

### Simple Usage
Here is an example of `mui-datagrid-full-edit`.

```javascript
import FullEditDataGrid from "mui-datagrid-full-edit";

...

<FullEditDataGrid
    columns={columns}
    rows={rows}
    onSaveRow={onSaveRow}
    onDeleteRow={onDeleteRow}
    createRowData={createRowData}
/>
```
*columns*, *rows*, *onSaveRow*, *onDeleteRow*, *createRowData* is required props.

#### Props
- `columns` (Array): Definition of grid header. It is same as `@mui/x-data-grid`and the documentation is [here](https://mui.com/x/react-data-grid/column-definition/).

    Here is an example of `columns`.
    ```javascript
    const columns = [
      {
        field: "id",
        headerName: "Id",
        width: 50,
        hide: true,
        align: "center",
        type: "number",
        editable: false
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
        field: "dateCreated",
        headerName: "DateCreated",
        width: 150,
        headerAlign: "center",
        type: "date",
        editable: false,
        align: "center",
        renderCell: ({ value }) => moment(value).format("MM/DD/yyyy")
      }
    ];
    ```

- `rows` (Array): data of the grid.
    
    Here is an example of `rows`.
    
    ```javascript
    let rows = [
          {
            id: 1,
            title: "Cycle-Depot",
            dateCreated: "2023-03-09"
          },
          {
            id: 2,
            title: "Top Lowrider",
            dateCreated: "2023-03-09"
          }
      ];
  ```
 
- `onSaveRow` (Function): save action handler. When you do save action on the grid, this handler will be performed.

  The function is for server communication. If your saving on server is success, you need to update rows in the function to repaint the result of communication.
    
  Here is an example of `onSaveRow`.
    
    ```javascript
    const [rows, setRows] = useState([]);
    
    ...
    
    /*
        id: id value of saved row
        updateRow: entire data or saved row
        rows: all entire old rows of grid
        oldRow: data of row before you update.
    */
    const onSaveRow = (id, updatedRow, oldRow, oldRows) => {
    sellerController // server communication controller
      .saveRow(updatedRow) // send row data of the component
      .then((res) => {
        console.log("server saving success!");
        const dbRow = res.data; // get exact row data of server from response
        setRows(oldRows.map((r) => (r.id === updatedRow.id ? { ...dbRow } : r))); // syncronize server and component
      })
      .catch((err) => {
        console.log("server saving failed!");
        setRows(oldRows); // update nothing on component by old rows
      });
  };
  ```
 
- `onDeleteRow` (Function): delete action handler. When you do delete action on the grid, this handler will be performed.

  The function is for server communication. If your deleting on server is success, you need to update rows in the function to repaint the result of communication.
    
  Here is an example of `onDeleteRow`.
    
    ```javascript
    const [rows, setRows] = useState([]);
    
    ...
    
    /*
        id: id value of deleted row
        oldRow: data of row before you update.
        rows: all entire old rows of grid
    */
    const onDeleteRow = (id, oldRow, oldRows) => {
    sellerController
      .deleteRow(id)
      .then((res) => {
        console.log("server deleting success!");
        const dbRowId = res.data.id; // get exact deleted id of server from response
        setRows(oldRows.filter((r) => r.id !== dbRowId)); // remove row in component
      })
      .catch((err) => {
        console.log("server deleting failed!");
        setRows(oldRows); // update nothing on component by old rows
      });
  };
  ```
  
- `createRowData` (Function): function to generate data of new row. When you do create new row action, new row will be inserted with data from the function into the component.
  You can unset this prop. If you unset, new data will have only max id value by default.
  Here is an example of `createRowData`.
    
    ```javascript
    /*
        rows: all entire old rows of grid
    */
    const createRowData = (oldRows) => {
        const newId = Math.max(...rows.map((r) => (r.id ? r.id : 0) * 1)) + 1;
        return { id: newId, title: "Default Name" };
    };
  ```
  

### Advanced Usage
If you want more functions in the component, you can use any props of `@mui/x-data-grid` on this component element.

In this case, you need to know props of `@mui/data-grid` in more detail [here](https://mui.com/x/api/data-grid/data-grid/).

Here is an example.
```javascript
<DeleteOnlyDataGrid
  columns={columns}
  rows={rows}
  onDeleteRow={onDeleteRow}
  selectionModel={selectionModel} // this props comes from @mui/x-data-grid
  loading={loading} // this props comes from @mui/x-data-grid
/>
```

#### @mui/x-data-grid

[@mui/x-data-grid](https://www.npmjs.com/package/@mui/x-data-grid) is a data grid library for React users, created by the Material UI team. It features powerful filtering, sorting, and pagination functionality, as well as customizable column headers and cell rendering. Its API is extremely flexible, enabling users to implement various use cases without much difficulty. The library is built with performance in mind, making it an excellent choice for handling large datasets or complex UI scenarios.

The documentation of `@mui/x-data-grid` is [here](https://mui.com/x/react-data-grid/). While reading, please remember that it is `@mui/x-data-grid`, not `@mui/x-data-grid-pro` or `@mui/x-data-grid-premium`.


## Please Be a Contributor !
This module is always integrated with the latest version of `@mui/x-data-grid`. But `@mui/x-data-grid` might be updated and I might miss it. So I want your help.

And it aims to be not only easy way of `@mui/x-data-grid`, but also good abilities of `@mui/x-data-grid-pro` and `@mui/x-data-grid-premium`.

So if you have a good idea. Please feel free to make a **pull request** and [an issue](https://github.com/prettyblueberry/mui-datagrid-full-edit/issues/new).

GitHub Repository: [https://github.com/prettyblueberry/mui-datagrid-full-edit](https://github.com/prettyblueberry/mui-datagrid-full-edit)

## Author: Blueberry
[Blueberry's GitHub](https://github.com/prettyblueberry)

[Contact Blueberry](https://form.jotform.com/230442827812353)
