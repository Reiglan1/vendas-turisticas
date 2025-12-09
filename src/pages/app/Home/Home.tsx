import Dashboard from "./sections/Dashboard";
import Info from "./sections/Info";
import Search from "./sections/Search";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      <Dashboard />
      <Info />
      <Search />
    </div>
  );
}
