
function Spinner() {
    return (
        <div className="flex items-center justify-center fixed inset-0 bg-gray-200 bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
    );
}

export default Spinner;
