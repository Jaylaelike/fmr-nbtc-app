"use client";
import React from "react";
import { useEffect, useState } from "react";
import IconRipple from "~/components/animata/icon/con-ripple";


interface PropsType {
  isActives: boolean | null;
  isBefores: boolean | null;
}

// create state reload <tbody> only  every 10 sec for update status record
function UpdateTableRecords({ isActives, isBefores,  }: PropsType) {

        // create state reload <tbody> only  every 10 sec for update status record using rxjs observable


  const [reload, setReload] = useState(false);



  useEffect(() => {
    const interval = setInterval(() => {
      setReload(!reload);
    }, 5000);
    return () => clearInterval(interval);
  }, [reload, isActives, isBefores]);


  return (
    <>
      {reload ? (
        <>
          <td>
            <>
              {isActives ? (
                <IconRipple />
              ) : isBefores ? (
                <div className="badge badge-ghost text-nowrap">No Active</div> // Changed badge for "No Active" state
              ) : (
                <div className="badge badge-success">Success</div>
              )}
            </>
          </td>
        </>
      ) : (
        <td>
          <>
            {isActives ? (
              <IconRipple />
            ) : isBefores ? (
              <div className="badge badge-ghost text-nowrap">No Active</div> // Changed badge for "No Active" state
            ) : (
              <div className="badge badge-success">Success</div>
            )}
          </>
        </td>
      )}
    </>
  );
}

export default UpdateTableRecords;
