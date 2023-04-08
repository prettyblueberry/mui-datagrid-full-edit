"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var React = _interopRequireWildcard(require("react"));
var _xDataGrid = require("@mui/x-data-grid");
var _GridExcelExportMenuItem = _interopRequireDefault(require("./GridExcelExportMenuItem"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Add = _interopRequireDefault(require("@mui/icons-material/Add"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function DefaultToolbar(props) {
  const {
    rows,
    setRows,
    setRowModesModel,
    columns,
    createRowData
  } = props;
  const handleClick = () => {
    const newData = createRowData(rows);
    newData.isNew = true;
    if (!newData.hasOwnProperty("id")) newData.newId = Math.max(...rows.map(r => r.id * 1)) + 1;
    setRows(oldRows => {
      return [...oldRows, newData];
    });
    setRowModesModel(oldModel => {
      const firstEditable = columns.find(c => c.editable && !c.hide);
      return _objectSpread(_objectSpread({}, oldModel), {}, {
        [newData.id]: {
          mode: _xDataGrid.GridRowModes.Edit,
          fieldToFocus: firstEditable.field
        }
      });
    });
  };
  return /*#__PURE__*/React.createElement(_xDataGrid.GridToolbarContainer, null, /*#__PURE__*/React.createElement(_xDataGrid.GridToolbarColumnsButton, null), /*#__PURE__*/React.createElement(_xDataGrid.GridToolbarFilterButton, null), /*#__PURE__*/React.createElement(_xDataGrid.GridToolbarDensitySelector, null), /*#__PURE__*/React.createElement(_xDataGrid.GridToolbarExportContainer, null, /*#__PURE__*/React.createElement(_GridExcelExportMenuItem.default, {
    columns: columns
  }), /*#__PURE__*/React.createElement(_xDataGrid.GridCsvExportMenuItem, null)), /*#__PURE__*/React.createElement(_Button.default, {
    color: "primary",
    startIcon: /*#__PURE__*/React.createElement(_Add.default, null),
    onClick: handleClick
  }, "Add record"), /*#__PURE__*/React.createElement(_xDataGrid.GridToolbarQuickFilter, null));
}
DefaultToolbar.defaultProps = {
  createRowData: rows => {
    const newId = Math.max(...rows.map(r => r.id * 1)) + 1;
    return {
      id: newId
    };
  }
};
var _default = DefaultToolbar;
exports.default = _default;