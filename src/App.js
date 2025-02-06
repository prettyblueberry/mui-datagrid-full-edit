import "./styles.css";
import SellerManageGrid from "./SellerManageGrid";
import CustomSellerManageGrid from "./CustomSellerManageGrid";

export default function App() {
  return (
      <div className="App">
          <div style={{margin: 50}}>
              <h3>Default Grid</h3>
              <SellerManageGrid/>
          </div>
          <div style={{margin: 50}}>
              <h3>Customized Grid</h3>
              <p>Hide the "Actions" column and use a custom toolbar without the "Add" button.</p>
              <CustomSellerManageGrid />
          </div>
      </div>
  );
}
