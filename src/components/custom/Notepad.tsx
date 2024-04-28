import React, { useRef, useEffect, useState } from "react";
import FormCatatan from "./FormCatatan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faWindowMinimize,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { CatatanData, MethodType, Privasi } from "../../lib/types";
import ViewCatatan from "./ViewCatatan";

interface NotepadProps {
  isOpen: boolean;
  onClose: () => void;
  method: MethodType;
  catatanData?: CatatanData;
}

const Notepad: React.FC<NotepadProps> = ({
  isOpen,
  onClose,
  method,
  catatanData,
}) => {
  const notepadRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [formCatatanData, setFormCatatanData] = useState<CatatanData>({
    id_akun: 2,
    judul_catatan: "",
    isi_catatan: "",
    privasi: Privasi.PRIVATE,
    gambar: "",
    nama_tag: [],
  });

  useEffect(() => {
    if (catatanData) {
      setFormCatatanData(catatanData);
    }
  }, [catatanData]);

  useEffect(() => {
    if (!isOpen)
      setFormCatatanData({
        id_akun: 2,
        judul_catatan: "",
        isi_catatan: "",
        privasi: Privasi.PRIVATE,
        gambar: "",
        nama_tag: [],
      });
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMinimized(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      notepadRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, isMinimized]);

  const handleCatatanSubmit = async (isSubmit: boolean) => {
    if (isSubmit) {
      onClose();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const updateCatatanData = (updatedData: Partial<CatatanData>) => {
    setFormCatatanData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  if (isOpen && !isMinimized) {
    return (
      <div
        ref={notepadRef}
        tabIndex={0}
        className="fixed bottom-0 right-0 mb-4 mr-4 overflow-y-auto shadow rounded-lg"
        style={{ maxHeight: "80vh", minWidth: "400px" }}
      >
        <div className="bg-white shadow rounded-lg max-w-lg w-full p-4 relative">
          {/* header */}
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold break-all max-w-80 md:max-w-[420px]">
              {method == "GET" ? catatanData?.judul_catatan : "Notepad"}
            </h4>
            <div>
              <button
                id="minimize-btn"
                className="p-1 rounded-full focus:outline-none"
                onClick={toggleMinimize}
              >
                <FontAwesomeIcon icon={faWindowMinimize} />
              </button>
              <button
                className="p-1 rounded-full focus:outline-none"
                onClick={onClose}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
          {
            /* content */
            method == "GET" ? (
              <ViewCatatan
                onSubmit={handleCatatanSubmit}
                catatanData={catatanData}
              />
            ) : (
              <FormCatatan
                catatanData={formCatatanData}
                onCatatanDataChange={updateCatatanData}
                onSubmit={handleCatatanSubmit}
                method={method}
              />
            )
          }
        </div>
      </div>
    );
  } else if (isMinimized) {
    return (
      <Button
        className="fixed bottom-0 right-0 mb-4 mr-4 p-3"
        onClick={toggleMinimize}
        variant="outline"
      >
        Notepad is minimized
        <FontAwesomeIcon icon={faCaretUp} className="ml-3" />
      </Button>
    );
  }
};

export default Notepad;
