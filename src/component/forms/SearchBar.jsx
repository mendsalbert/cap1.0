function SearchBar() {
  return (
    <div className="searchbar-wrapper">
      <div className="px flex h-[56px] w-[300px] items-center justify-between rounded-lg border border-transparent bg-bgray-50 px-4 focus-within:border-success-300 dark:bg-darkblack-500 lg:w-[400px]">
        <div className="flex w-full items-center space-x-3.5">
          <span>
            <svg
              className="stroke-bgray-900 dark:stroke-bgray-50"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="9.78639"
                cy="9.78602"
                r="8.23951"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.5176 15.9447L18.7479 19.1667"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <label htmlFor="search" className="w-full">
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="search-input w-full border-none bg-bgray-50 bg-none px-0 text-sm tracking-wide text-bgray-600 placeholder:text-sm placeholder:font-semibold focus:outline-none focus:ring-0 dark:bg-darkblack-500 dark:placeholder:text-bgray-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
