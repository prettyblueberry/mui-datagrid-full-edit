"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GridExcelExportMenuItem;
require("core-js/modules/web.dom-collections.iterator.js");
var _material = require("@mui/material");
var XLSX = _interopRequireWildcard(require("xlsx"));
var React = _interopRequireWildcard(require("react"));
var _xDataGrid = require("@mui/x-data-grid");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function getExcelData(apiRef) {
  // Select rows and columns
  const filteredSortedRowIds = (0, _xDataGrid.gridFilteredSortedRowIdsSelector)(apiRef);
  const visibleColumnsField = (0, _xDataGrid.gridVisibleColumnFieldsSelector)(apiRef);

  // Format the data. Here we only keep the value
  return filteredSortedRowIds.map(id => {
    const row = {};
    visibleColumnsField.forEach(field => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });
}
function handleExport(apiRef, columns) {
  const data = getExcelData(apiRef);
  const fields = columns.map(c => c.field);
  const rows = data.map(row => {
    const mRow = {};
    for (const key of fields) {
      mRow[key] = row[key];
    }
    return mRow;
  });
  const columnNames = columns.map(c => c.headerName);
  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.sheet_add_aoa(worksheet, [[...columnNames]], {
    origin: 'A1'
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, document.title + ".xlsx", {
    compression: true
  });
}
function GridExcelExportMenuItem(props) {
  const apiRef = (0, _xDataGrid.useGridApiContext)();
  const {
    hideMenu,
    columns
  } = props;
  return /*#__PURE__*/React.createElement(_material.MenuItem, {
    onClick: () => {
      handleExport(apiRef, columns);
      // Hide the export menu after the export
      hideMenu === null || hideMenu === void 0 ? void 0 : hideMenu();
    }
  }, "Download as Excel");
}