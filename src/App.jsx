import "./styles.css";
import StreamingProvider from "./components/context/StreamingProvider";
import FiltersProvider from "./components/context/FiltersProvider";
import UIProvider from "./components/context/UIProvider";
import Header from "./components/Header";
import Filters from "./components/Filters/Filters";
import StreamingList from "./components/StreamingList/StreamingList";
import StreamingListWrapper from "./components/modals/StreamingListWrapper";
import Footer from "./components/Footer";
import toCapitalize from "./utils";


export default function App() {
  return (
    <>
      <Header />
      <StreamingProvider>
        <FiltersProvider>
          <UIProvider>
            <Filters />
            <StreamingListWrapper />
            <StreamingList />
          </UIProvider>
        </FiltersProvider>
      </StreamingProvider>
      <Footer />
    </>
  );
}
