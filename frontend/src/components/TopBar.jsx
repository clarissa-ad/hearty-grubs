import { Link } from "react-router-dom"

export function TopBar() {
    return (
        <>
            <div className="bg-[#A2D883] py-4 text-white fixed w-full top-0 left-0 text-center justify-start text-white text-3xl font-bold font-['Overpass']">
                Find your next perfect meal!
            </div>
            <nav className="navbar">
                {/* <Link to="/"><button className="navb">Home</button></Link> */}
            </nav>
        </>
    )
}