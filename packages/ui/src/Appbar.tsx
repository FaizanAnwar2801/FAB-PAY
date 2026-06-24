import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void | Promise<void>;
  onSignout: () => void | Promise<void>;
  onLogoClick?: () => void;
}

export const Appbar = ({
  user,
  onSignin,
  onSignout,
  onLogoClick,
}: AppbarProps) => {
  return (
    <div className="flex justify-between items-center border-b bg-white px-5 py-2 shadow-sm">
      <button
        onClick={onLogoClick}
        className="text-lg font-bold tracking-tight text-gray-900 hover:text-gray-600 transition-colors duration-150 focus:outline-none"
      >
        FAB-PAY
      </button>
      <Button variant={user ? "solid" : "outline"} onClick={user ? onSignout : onSignin}>
        {user ? "Logout" : "Login"}
      </Button>
    </div>
  );
};