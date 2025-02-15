import { Sidebar } from "@/components/layout/components/Sidebar";

export const PrivateLayout = ({ children }) => {
  return (
    <div className="h-screen grid grid-cols-[240px_1fr]">
      <Sidebar />
      <main className="flex flex-col overflow-hidden">
        <header className="border-b border-[#f6f6f6] px-4 py-5 flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36px"
            height="36px"
            fill="none"
            viewBox="0 0 64 64"
            className="Icon Icon-module_Icon--primary__DMpkV"
          >
            <path
              fill="#16A121"
              fillRule="evenodd"
              d="M64 32c0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0c17.673 0 32 14.327 32 32Zm-2.667 0C61.333 48.2 48.2 61.333 32 61.333S2.667 48.2 2.667 32 15.8 2.667 32 2.667 61.333 15.8 61.333 32Z"
              clipRule="evenodd"
            />
            <path
              fill="#FD337E"
              fillRule="evenodd"
              d="M64 32c0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0c17.673 0 32 14.327 32 32Zm-2.667 0C61.333 48.2 48.2 61.333 32 61.333S2.667 48.2 2.667 32 15.8 2.667 32 2.667 61.333 15.8 61.333 32Z"
              clipRule="evenodd"
            />
            <path
              fill="#FD337E"
              fillRule="evenodd"
              d="M64 32c0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0c17.673 0 32 14.327 32 32Zm-2.667 0C61.333 48.2 48.2 61.333 32 61.333S2.667 48.2 2.667 32 15.8 2.667 32 2.667 61.333 15.8 61.333 32Z"
              clipRule="evenodd"
            />
            <path
              fill="#FD337E"
              fillRule="evenodd"
              d="M64 32c0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0c17.673 0 32 14.327 32 32Zm-2.667 0C61.333 48.2 48.2 61.333 32 61.333S2.667 48.2 2.667 32 15.8 2.667 32 2.667 61.333 15.8 61.333 32Z"
              clipRule="evenodd"
            />
            <path
              fill="#FD337E"
              fillRule="evenodd"
              d="M64 32c0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0c17.673 0 32 14.327 32 32Zm-2.667 0C61.333 48.2 48.2 61.333 32 61.333S2.667 48.2 2.667 32 15.8 2.667 32 2.667 61.333 15.8 61.333 32Z"
              clipRule="evenodd"
            />
            <path
              fill="#FD337E"
              fillRule="evenodd"
              d="M64 32c0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0c17.673 0 32 14.327 32 32Zm-2.667 0C61.333 48.2 48.2 61.333 32 61.333S2.667 48.2 2.667 32 15.8 2.667 32 2.667 61.333 15.8 61.333 32Z"
              clipRule="evenodd"
            />
            <path
              fill="FD337E"
              fillRule="evenodd"
              d="M64 32c0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0c17.673 0 32 14.327 32 32Zm-2.667 0C61.333 48.2 48.2 61.333 32 61.333S2.667 48.2 2.667 32 15.8 2.667 32 2.667 61.333 15.8 61.333 32Z"
              clipRule="evenodd"
            />
            <path
              fill="#FD337E"
              fillRule="evenodd"
              d="M31.858 32.659c3.71 0 11.035 1.686 11.366 5.034l.012.237v2.635c0 1.383-1.15 2.517-2.611 2.626l-.234.01H23.325c-1.493 0-2.717-1.066-2.835-2.42l-.01-.216V37.93c0-3.505 7.58-5.271 11.378-5.271ZM31.858 29.647c-2.932 0-5.31-2.397-5.31-5.355v-1.337c0-2.958 2.378-5.355 5.31-5.355 2.933 0 5.31 2.397 5.31 5.355v1.337c0 2.958-2.377 5.355-5.31 5.355Z"
              clipRule="evenodd"
            />
          </svg>
        </header>
        {children}
      </main>
    </div>
  );
};
