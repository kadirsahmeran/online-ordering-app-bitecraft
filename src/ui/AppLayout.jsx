import { Outlet } from "react-router";
import AppNav from "./AppNav";
import { useStickyFilterOffset } from "../hooks/useStickyFilterOffset";

export default function AppLayout() {
  useStickyFilterOffset();
  return (
    <>
      <AppNav />
      <main>
        <Outlet />
      </main>
    </>
  );
}
