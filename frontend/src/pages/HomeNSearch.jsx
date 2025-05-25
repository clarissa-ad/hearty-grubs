import { Link } from "react-router-dom"
import { SearchBar } from "../components/SearchBar"

export const HomeNSearch = () => {
  return (
    <>
        <img src=".\src\assets\Logo.svg" alt="Food" className="w-2/3 mx-auto mt-10" />
        
        <SearchBar />

        {/* Links to categories */}
        <div className="flex justify-center space-x-10 mt-6 text-md font-medium">
          <a href="#" className="hover:underline">
            Most Popular
          </a>
          <a href="#" className="hover:underline">
            Favorites
          </a>
      </div>
    </>
  )
}
