import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { CatatanData, MethodType, Privasi } from "../../lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface FormCatatanProps {
  catatanData: CatatanData;
  onCatatanDataChange: (updatedData: Partial<CatatanData>) => void;
  onSubmit: (isSubmit: boolean) => void;
  method: MethodType;
}

const FormCatatan: React.FC<FormCatatanProps> = ({
  catatanData,
  onCatatanDataChange,
  onSubmit,
  method,
}) => {
  const {
    id: id_catatan,
    judul_catatan,
    isi_catatan,
    privasi,
    gambar,
    nama_tag,
    catatanbelajar_tag,
  } = catatanData;
  const [isPrivasi, setIsPrivasi] = useState<boolean>(
    privasi === Privasi.PUBLIC
  );

  useEffect(() => {
    setIsPrivasi(privasi === Privasi.PUBLIC);
  }, [privasi]);

  function combineTags(catatanData: CatatanData): string {
    if (
      catatanData.catatanbelajar_tag &&
      catatanData.catatanbelajar_tag.length > 0
    ) {
      const combinedTags = catatanData.catatanbelajar_tag
        .map((item) => item.tag.nama_tag)
        .join(",");
      return combinedTags;
    }
    return "";
  }

  const [isJudulValid, setIsJudulValid] = useState<boolean>(true);
  const [isIsiValid, setIsIsiValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleIsiChange = (value: string) => {
    onCatatanDataChange({ isi_catatan: value });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCatatanDataChange({
      nama_tag: e.target.value.split(","),
    });
  };

  const handleGambarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCatatanDataChange({ gambar: e.target.value });
  };

  const handlePrivasiChange = () => {
    const newPrivasi = !isPrivasi ? Privasi.PUBLIC : Privasi.PRIVATE;
    onCatatanDataChange({ privasi: newPrivasi });
  };

  const handleMethodChange = (newMethod: MethodType) => {
    method = newMethod;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Judul Catatan:", judul_catatan);
      console.log("Isi Catatan:", isi_catatan);

      if (!judul_catatan.trim()) {
        setIsJudulValid(false);
      } else {
        setIsJudulValid(true);
      }

      const isContentEmpty = !!(isi_catatan.trim() === "<p><br></p>");
      if (!isi_catatan.trim() || isContentEmpty) {
        setIsIsiValid(false);
      } else {
        setIsIsiValid(true);
      }

      if (!judul_catatan.trim() && (!isi_catatan.trim() || isContentEmpty)) {
        setIsJudulValid(false);
        setIsIsiValid(false);
        return;
      }

      if (!judul_catatan.trim()) {
        return;
      }

      if (!isi_catatan.trim() || isContentEmpty) {
        return;
      }

      let data: any;
      setIsLoading(true);

      if (method !== "DELETE") {
        data = {
          id_akun: 2,
          judul_catatan: judul_catatan,
          isi_catatan: isi_catatan,
          privasi: privasi,
          gambar: gambar,
          nama_tag: nama_tag,
        };
      }

      const response = await fetch(
        `http://194.233.93.124:3030/catatanbelajar/${
          id_catatan ? id_catatan : ""
        }`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create or update catatan");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsLoading(false);
      onSubmit(true);
    } catch (error) {
      console.error("Error creating or updating catatan:", error);
      alert("Failed to create or update catatan. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col space-y-4">
        <div className="text-left">
          <Input
            type="text"
            placeholder="Judul Catatan"
            onChange={(e) =>
              onCatatanDataChange({ judul_catatan: e.target.value })
            }
            value={judul_catatan}
            className={!isJudulValid ? "border border-red-500" : ""}
          />
          {!isJudulValid && (
            <label className="text-sm text-red-600 dark:text-red-500">
              Judul Catatan is required
            </label>
          )}
        </div>
        <div className="text-left">
          <ReactQuill
            value={isi_catatan}
            onChange={handleIsiChange}
            placeholder="Buat Catatan..."
            id="form_isi"
            theme="snow"
            modules={{
              toolbar: [
                ["image"],
                [{ font: [] }],
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                [{ color: [] }],
                ["clean"],
              ],
            }}
            formats={[
              "font",
              "image",
              "header",
              "bold",
              "italic",
              "underline",
              "list",
              "bullet",
              "align",
              "color",
            ]}
            className={!isIsiValid ? "border border-red-500" : ""}
          />
          {!isIsiValid && (
            <label className="text-sm text-red-600 dark:text-red-500">
              Isi Catatan is required
            </label>
          )}
          <label
            htmlFor="form_isi"
            className="block text-sm text-gray-400 mt-1 ml-1 text-left"
            style={{ fontSize: "12px" }}
          >
            Total ukuran gambar pada isi tidak boleh lebih dari 100KB
          </label>
        </div>
        <div className="text-left">
          <Label htmlFor="tag">Tag</Label>
          <Input
            type="text"
            placeholder="Masukan Tag"
            onChange={handleTagChange}
            value={
              nama_tag && nama_tag.length > 0
                ? nama_tag.join(",")
                : combineTags(catatanData)
            }
            id="tag"
          />

          <label
            htmlFor="tag"
            className="block text-sm text-gray-400 mt-1 ml-1 text-left"
            style={{ fontSize: "12px" }}
          >
            Jika lebih dari satu tag, pisahkan dengan koma (,) tanpa spasi
            sebelum/setelah koma tersebut
          </label>
        </div>

        <div className="text-left">
          <Label htmlFor="cover">Cover image</Label>
          <Input
            type="text"
            placeholder="Masukan URL gambar (cont: https://web.com/cover.jpg)"
            onChange={handleGambarChange}
            value={gambar}
            id="cover"
          />
        </div>

        {/* footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center">
              <Switch
                checked={isPrivasi}
                onCheckedChange={handlePrivasiChange}
              />
              <Label htmlFor="private-setting" className="ml-2 cursor-pointer">
                Public
              </Label>
            </div>
          </div>

          <div>
            {method == "PUT" && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="px-3 hover:none focus:outline-none font-bold border-2 border-red-600"
                        onClick={() => handleMethodChange("DELETE")}
                        variant="ghost"
                      >
                        <FontAwesomeIcon icon={faTrashCan} color="red" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Hapus Catatan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}

            <Button
              type="submit"
              className={`bg-[#38B0AB] hover:bg-[#22918D] text-white ml-2 `}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="inline w-5 h-5 mr-3 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  {method === "POST" ? "Simpan" : "Update"}
                </div>
              ) : method === "POST" ? (
                "Simpan"
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormCatatan;
