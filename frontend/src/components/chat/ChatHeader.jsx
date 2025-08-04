import React from 'react';
import { ArrowLeft, Phone, Video, X } from 'lucide-react';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';

const ChatHeader = () => {

  const {selectedUser, setSelectedUser} = useChatStore();
  const {onlineUsers} = useAuthStore();

  return (
    <div className="w-full px-4 py-3 border-b border-base-300 bg-base-100 flex items-center justify-between">
      
      {/* Kiri: tombol back + avatar + nama */}
      <div className="flex items-center gap-3">
        {/* Tombol back (bisa tampil hanya di layar kecil) */}
        <button className="btn btn-ghost btn-sm" onClick={() => setSelectedUser(null)}>
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Avatar dan nama pengguna */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={selectedUser.profilePic || '/avatar.png'} alt={selectedUser.fullName} />
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-base-content">{selectedUser.fullName}</div>
            <div className="text-xs text-base-content/60">{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</div>
          </div>
        </div>
      </div>

      {/* Kanan: tombol aksi */}
      <div className="flex items-center gap-1">
        <button className="btn btn-ghost btn-sm">
          <Phone className="w-4 h-4" />
        </button>
        <button className="btn btn-ghost btn-sm">
          <Video className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
