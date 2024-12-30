import { Outlet } from "react-router-dom";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "../redux/slice/authSlice";
import Footer from "../../components/Footer";
import ModalContainer from "../../components/Modal/ModalContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser() as never);
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <ModalContainer />
      <div className="flex">
        <SideMenu />
        <div className="flex flex-col w-full px-4 ">
          <Header />
          <div className="py-2">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
