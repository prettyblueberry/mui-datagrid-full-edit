"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var React = _interopRequireWildcard(require("react"));
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _DeleteOutlined = _interopRequireDefault(require("@mui/icons-material/DeleteOutlined"));
var _Save = _interopRequireDefault(require("@mui/icons-material/Save"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _xDataGrid = require("@mui/x-data-grid");
var _DefaultToolbar = _interopRequireDefault(require("./components/DefaultToolbar"));
const _excluded = ["columns", "rows", "defaultPageSize", "onSaveRow", "onDeleteRow", "createRowData", "onProcessRowUpdateError"]; // translate to javascript and custom it by Blueberry 03/02/2023
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function FullFeaturedCrudGrid(_ref) {
  let {
      columns,
      rows,
      defaultPageSize,
      onSaveRow,
      onDeleteRow,
      createRowData,
      onProcessRowUpdateError
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const [internalRows, setInternalRows] = React.useState(rows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  (0, React.useEffect)(() => {
    setInternalRows(rows);
  }, [rows]);
  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };
  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };
  const handleEditClick = id => () => {
    setRowModesModel(_objectSpread(_objectSpread({}, rowModesModel), {}, {
      [id]: {
        mode: _xDataGrid.GridRowModes.Edit
      }
    }));
  };
  const handleSaveClick = id => () => {
    setRowModesModel(_objectSpread(_objectSpread({}, rowModesModel), {}, {
      [id]: {
        mode: _xDataGrid.GridRowModes.View
      }
    }));
  };
  const handleDeleteClick = id => () => {
    setInternalRows(internalRows.filter(row => row.id !== id));
    onDeleteRow(id, internalRows.find(row => row.id === id), internalRows);
  };
  const handleCancelClick = id => () => {
    setRowModesModel(_objectSpread(_objectSpread({}, rowModesModel), {}, {
      [id]: {
        mode: _xDataGrid.GridRowModes.View,
        ignoreModifications: true
      }
    }));
    const editedRow = internalRows.find(row => row.id === id);
    if (editedRow.isNew) {
      setInternalRows(internalRows.filter(row => row.id !== id));
    }
  };
  const processRowUpdate = newRow => {
    const updatedRow = _objectSpread({}, newRow);
    if (!updatedRow.isNew) updatedRow.isNew = false;
    const oldRow = internalRows.find(r => r.id === updatedRow.id);
    setInternalRows(internalRows.map(row => row.id === newRow.id ? updatedRow : row));
    onSaveRow(updatedRow.id, updatedRow, oldRow, internalRows);
    return updatedRow;
  };
  const appendedColumns = [...columns, {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: _ref2 => {
      var _rowModesModel$id;
      let {
        id
      } = _ref2;
      const isInEditMode = ((_rowModesModel$id = rowModesModel[id]) === null || _rowModesModel$id === void 0 ? void 0 : _rowModesModel$id.mode) === _xDataGrid.GridRowModes.Edit;
      if (isInEditMode) {
        return [/*#__PURE__*/React.createElement(_xDataGrid.GridActionsCellItem, {
          icon: /*#__PURE__*/React.createElement(_Save.default, null),
          label: "Save",
          onClick: handleSaveClick(id)
        }), /*#__PURE__*/React.createElement(_xDataGrid.GridActionsCellItem, {
          icon: /*#__PURE__*/React.createElement(_Close.default, null),
          label: "Cancel",
          className: "textPrimary",
          onClick: handleCancelClick(id),
          color: "inherit"
        })];
      }
      return [/*#__PURE__*/React.createElement(_xDataGrid.GridActionsCellItem, {
        icon: /*#__PURE__*/React.createElement(_Edit.default, null),
        label: "Edit",
        className: "textPrimary",
        onClick: handleEditClick(id),
        color: "inherit"
      }), /*#__PURE__*/React.createElement(_xDataGrid.GridActionsCellItem, {
        icon: /*#__PURE__*/React.createElement(_DeleteOutlined.default, null),
        label: "Delete",
        onClick: handleDeleteClick(id),
        color: "inherit"
      })];
    }
  }];

  //pagination
  const [pageSize, setPageSize] = React.useState(defaultPageSize);
  return /*#__PURE__*/React.createElement(_xDataGrid.DataGrid, _extends({
    rows: internalRows,
    columns: appendedColumns,
    editMode: "row",
    rowModesModel: rowModesModel,
    onRowModesModelChange: newModel => setRowModesModel(newModel),
    onRowEditStart: handleRowEditStart,
    onRowEditStop: handleRowEditStop,
    processRowUpdate: processRowUpdate,
    onProcessRowUpdateError: onProcessRowUpdateError,
    slots: {
      toolbar: _DefaultToolbar.default
    },
    slotProps: {
      toolbar: {
        rows: internalRows,
        setRows: setInternalRows,
        setRowModesModel,
        createRowData,
        columns
      }
    },
    experimentalFeatures: {
      newEditingApi: true
    }

    //pagination
    ,
    pageSize: pageSize,
    onPageSizeChange: newPageSize => setPageSize(newPageSize)
  }, props));
}
FullFeaturedCrudGrid.defaultProps = {
  //action
  onSaveRow: (id, updatedRow /*, oldRow, rows*/) => {
    console.log("save row", updatedRow);
  },
  onDeleteRow: (id, oldRow /*, rows*/) => {
    console.log("delete row", oldRow);
  },
  onProcessRowUpdateError: error => {
    console.error(error);
  },
  initialState: {
    columns: {
      columnVisibilityModel: {
        id: false
      }
    }
  },
  autoHeight: true,
  //pagination
  pagination: true,
  defaultPageSize: 25,
  rowsPerPageOptions: [5, 10, 25, 50, 100]
};
var _default = FullFeaturedCrudGrid;
exports.default = _default;