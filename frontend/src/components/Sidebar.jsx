import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 bg-base-100 flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="border-b border-base-300 w-full px-5 py-4">
        <div className="flex items-center gap-3 text-primary">
          <Users className="size-6" />
          <span className="font-bold hidden lg:block text-lg">Contacts</span>
        </div>

        {/* Online toggle */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-success"
            />
            <span className="label-text text-sm text-zinc-600">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500 font-medium">
            {onlineUsers.length} online
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto w-full py-2 px-2 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`group w-full p-3 flex items-center gap-4 rounded-lg 
              transition-all duration-200 cursor-pointer
              ${selectedUser?._id === user._id ? "bg-base-300 ring-2 ring-primary" : ""}
            `}
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 rounded-full object-cover border border-base-200 shadow-sm"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white
                  animate-pulse"
                />
              )}
            </div>

            {/* Info */}
            <div className="hidden lg:block min-w-0 text-left">
              <div className="font-semibold text-primary truncate">
                {user.fullName}
              </div>
              <div className="text-sm text-zinc-500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-6 text-sm italic">
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
