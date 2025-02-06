"use client";
import { useMemo } from "react";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

export const Editor = ({ onChange, value }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div className="">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};
