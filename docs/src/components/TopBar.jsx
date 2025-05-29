import { Link } from "react-router-dom"

export function TopBar() {
    return (
        <>
            <div className="bg-[#A2D883] h-16 fixed w-full top-0 left-0 z-50 flex items-center justify-center text-white text-lg md:text-xl font-bold font-['Overpass']">
        Find your next perfect meal!
    </div>

            <nav className="navbar">
                {/* <Link to="/"><button className="navb">Home</button></Link> */}
            </nav>
        </>
    )
}