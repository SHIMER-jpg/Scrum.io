import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ display: "flex" }}>
        <Sidebar />
        {children}
      </main>
    </>
  );
};

export default Layout;
