"use client";
import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

function AlertDialogScanDone() {
  function close() {
    setIsOpen(false);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-20 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0">
              <DialogTitle>
                <img
                  src="http://fmr.nbtc.go.th/fmr/_inc/img/logo@2x.png"
                  alt=""
                  className="h-12 w-12 rounded-md"
                />
              </DialogTitle>
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black/80"
              >
                การสแกนความถี่เสร็จสมบูรณ์
              </DialogTitle>

              <p className="mt-2 text-sm/6 text-black/80">
                ถ้าคุณต้องการ สแกนความถี่ อีกครั้ง กรุณากดปุ่ม Scan ใหม่อีกครั้ง
              </p>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AlertDialogScanDone;
