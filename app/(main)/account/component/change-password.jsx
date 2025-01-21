"use client";

import { changePassword } from "@/app/actions/account";
import { ButtonLoading } from "@/components/button-loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePassword({ email }) {
  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
    reTypedPassword: "",
  });

  const [loader, setLoader] = useState(false);

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setPasswordState({ ...passwordState, [key]: value });
  };

  const doPassowrdChange = async (event) => {
    event.preventDefault();

    const { newPassword, reTypedPassword } = passwordState;

    if (newPassword !== reTypedPassword) {
      toast.error("New password and re-typed password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoader(true);
    console.log(passwordState);

    try {
      await changePassword(
        email,
        passwordState?.oldPassword,
        passwordState?.newPassword
      );

      setPasswordState({
        ...passwordState,
        oldPassword: "",
        newPassword: "",
        reTypedPassword: "",
      });

      toast.success(`Password changed successfully.`);
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Change password :</h5>
      <form onSubmit={doPassowrdChange}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Old password :</Label>
            <Input
              type="password"
              placeholder="Old password"
              id="oldPassword"
              name="oldPassword"
              value={passwordState.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">New password :</Label>
            <Input
              type="password"
              placeholder="New password"
              id="newPassword"
              name="newPassword"
              value={passwordState.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">Re-type New password :</Label>
            <Input
              type="password"
              placeholder="Re-type New password"
              id="reTypedPassword"
              name="reTypedPassword"
              value={passwordState.reTypedPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/*end grid*/}
        {loader ? (
          <div className="mt-5">
            <ButtonLoading />
          </div>
        ) : (
          <Button className="mt-5 cursor-pointer" type="submit">
            Save password
          </Button>
        )}
      </form>
    </div>
  );
}
