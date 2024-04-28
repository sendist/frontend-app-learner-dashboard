import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faFileArrowDown,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";
import { CatatanData, MethodType, Privasi } from "../../lib/types";

const CardCatatan: React.FC<{
  catatan: CatatanData;
  toggleNotepad: (newMethod?: MethodType, newCatatanData?: CatatanData) => void;
  loggedInAccountId: number;
}> = ({ catatan, toggleNotepad, loggedInAccountId }) => {

  return (
    <Card className="w-[265px]" onClick={() => toggleNotepad("GET", catatan)}>
      <CardHeader>
        <CardTitle className="text-left text-lg font-bold flex justify-between">
          <div className="overflow-hidden h-[48px] leading-tight line-clamp-2">
            {catatan.judul_catatan}
          </div>
          {catatan.privasi === Privasi.PRIVATE && (
            <FontAwesomeIcon icon={faLock} color="#38B0AB" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            {catatan.gambar ? (
              <img src={catatan.gambar} alt="Gambar Catatan" className="h-28 w-auto object-cover" />
            ) : (
              <Label
                htmlFor="name"
                className="text-left font-normal overflow-hidden h-[105px] w-[245px] leading-tight line-clamp-6"
              >
                {parse(catatan.isi_catatan)}
              </Label>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Label className="text-sm font-medium ml-2">Nama si User</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="justify-start">
          {catatan.catatanbelajar_tag?.map(
            (tag) => (
              console.log(tag),
              (
                <Badge
                  key={tag.tag.nama_tag}
                  className="bg-[#F9A682] text-[#B23E19] hover:bg-[#F9A682] hover:text-[#B23E19] rounded-md  mr-1"
                >
                  {tag.tag.nama_tag}
                </Badge>
              )
            )
          )}
        </div>
        <div className="flex items-center">
          {loggedInAccountId === catatan.id_akun &&  (
              <Button
                className="w-6 h-6 p-0 text-xs border-2 border-[#E7EAE9]"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNotepad("PUT", catatan);
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} color="#38B0AB" />
              </Button>
          )}
          {(catatan.privasi === Privasi.PUBLIC || loggedInAccountId === catatan.id_akun)   &&  (
              <Button
                className="mx-1 w-6 h-6 p-0 text-xs border-2 border-[#E7EAE9]"
                variant="ghost"
              >
                <FontAwesomeIcon icon={faFileArrowDown} color="#38B0AB" />
              </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardCatatan;
