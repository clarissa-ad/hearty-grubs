import { TopBar } from "./TopBar"
import { Outlet } from "react-router-dom"


export function Layout(){
    return(
        <>
            <TopBar />
            <main className="mt-16">
                <Outlet />
            </main>
        </>
    )
}