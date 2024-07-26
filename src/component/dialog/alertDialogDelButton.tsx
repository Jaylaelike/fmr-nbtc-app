"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function AlertDialogDelButton(props: { alertId: number; stationIds: number }) {
  const router = useRouter();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteRecord = async (itemId: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/records/${itemId}`);

      // router.refresh();
      //reload page

      router.push(`/map/${props.stationIds}`);
      location.reload();
      close();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        onClick={open}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Delete Id {props.alertId}
      </Button>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0">
             <DialogTitle
          
             >
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
                คุณต้องการจะลบข้อมูลการบันทึก ID {props.alertId}?
              </DialogTitle>

              <p className="mt-2 text-sm/6 text-black/80">
              ถ้าคุณลบข้อมูลการบันทึก ทั้งหมดที่เกี่ยวข้องจะถูกลบออกจากระบบ !!!
              </p>
              <div className="mt-4 gap-3 space-x-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={() => handleDeleteRecord(props.alertId)}
                >
                  Delete
                </Button>

                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-black/20 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={close}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AlertDialogDelButton;
