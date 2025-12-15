import { Mail, UserIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTypedSelector } from "@/app/hook";

const Account = () => {
  const { user } = useTypedSelector((store) => store.auth);
  return (
    <div className="space-y-6 pb-7 first:pt-0">
      <div>
        <h3 className="text-base font-semibold">Account</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account information and security settings.
        </p>
      </div>

      <div className="space-y-6">
        {/* Account Information */}
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <div className="flex gap-2">
            <UserIcon className="h-4 w-4 mt-3 text-muted-foreground" />
            <Input defaultValue={user?.name || "Unknow"} readOnly />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="flex gap-2">
            <Mail className="h-4 w-4 mt-3 text-muted-foreground" />
            <Input defaultValue={user?.email || "Unknow"} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
