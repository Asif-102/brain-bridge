"use client";

import { updateUserInfo } from "@/app/actions/account";
import { ButtonLoading } from "@/components/button-loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactInfo({ userInfo }) {
  const [infoState, setInfoState] = useState({
    phone: userInfo.phone ?? "",
    socialMedia: userInfo.socialMedia ?? "",
  });

  const [loader, setLoader] = useState(false);

  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setInfoState({
      ...infoState,
      [field]: value,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoader(true);

    try {
      await updateUserInfo(userInfo?.email, infoState);
      toast.success("User contact info updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Phone No. :</Label>
            <Input
              name="phone"
              id="number"
              type="tel"
              pattern="(\+880|880|01)[0-9]{9}"
              value={infoState.phone}
              onChange={handleChange}
              // placeholder="Phone :"
              placeholder="Format: +8801234567890 or 8801234567890 or 01123456789"
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">Website :</Label>
            <Input
              name="socialMedia"
              value={infoState.socialMedia}
              onChange={handleChange}
              id="url"
              type="url"
              placeholder="Url :"
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
          <Button className="mt-5" type="submit">
            Update
          </Button>
        )}
      </form>
    </div>
  );
}
