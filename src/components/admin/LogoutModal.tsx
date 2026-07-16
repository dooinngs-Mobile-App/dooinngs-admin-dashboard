"use client";

import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button"; // Assuming you have a button component

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const { logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4">Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="mt-6 flex justify-between">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              logout();
              onClose();
            }}
            variant="destructive"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
