import { Search } from "lucide-react"

function Input(props) {
    return <input {...props} type="text" />
}

function Button({ children, className, ...props }) {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    )
}

export function SearchBar() {
    return (
        <div className="flex justify-center mt-6">
            <div className="relative w-80">
                <Input
                    placeholder="Search for Recipes"
                    className="pr-10 rounded-full border border-gray-300 w-full py-2 px-4"
                />
                <Button
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black p-2"
                >
                    <Search className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}