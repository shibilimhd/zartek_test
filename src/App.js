import { Provider } from "react-redux";
import store from "./store/store";
import CategoryList from "./pages/categoryList";
import "./style/style.scss";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <CategoryList />
      </Provider>
    </div>
  );
}

export default App;
