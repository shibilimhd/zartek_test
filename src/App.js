import { Provider } from "react-redux";
import CategoryList from "./categoryList";
import store from "./store/store";

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
