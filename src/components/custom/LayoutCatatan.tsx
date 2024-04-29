import { useEffect, useState } from "react";
import CardCatatan from "./CardCatatan";
import Notepad from "./Notepad";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "../ui/input";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { CatatanData, MethodType, Privasi } from "../../lib/types";

function LayoutCatatan() {
  const [isNotepadOpen, setIsNotepadOpen] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [method, setMethod] = useState<MethodType>("POST");
  const [catatanBelajar, setCatatanBelajar] = useState<CatatanData[]>([]);
  const [catatanData, setCatatanData] = useState<CatatanData>();
  const [loggedInAccountId] = useState(3);
  const toggleNotepad = (
    newMethod?: MethodType,
    newCatatanData?: CatatanData
  ) => {
    if (newMethod) setMethod(newMethod);

    if (newCatatanData) {
      setCatatanData(newCatatanData);
    } else {
      setCatatanData(undefined);
    }

    setIsNotepadOpen(!isNotepadOpen);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  
  useEffect(() => {
    fetchData(); // Fetch data tanpa keyword
  }, [isNotepadOpen==false]);
  
  useEffect(() => {
    if (searchKeyword !== "") {
      searchCatatan(searchKeyword); // Panggil searchCatatan jika searchKeyword tidak kosong
    } else {
      fetchData(); // Panggil fetchData jika searchKeyword kosong
    }
  }, [searchKeyword]);
  
  // Fungsi untuk melakukan pencarian
  const searchCatatan = async (keyword: string) => {
    try {
      const response = await axios.get<CatatanData[]>(
        `http://194.233.93.124:3030/catatanBelajar?keyword=${keyword}`
      );
      const filteredCatatanList = response.data.filter(catatan => catatan.id_akun === loggedInAccountId || catatan.privasi === Privasi.PUBLIC);
      setCatatanBelajar(filteredCatatanList);
      console.log(filteredCatatanList);
    } catch (error) {
      console.error("Failed to search data:", error);
    }
  };
  
  // Fungsi untuk melakukan fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get<CatatanData[]>(
        "http://194.233.93.124:3030/catatanBelajar/catatanBelajars"
      );
      const filteredCatatanList = response.data.filter(catatan => catatan.id_akun === loggedInAccountId || catatan.privasi === Privasi.PUBLIC);
      setCatatanBelajar(filteredCatatanList);
      console.log(filteredCatatanList);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  

  // Menampilkan catatan belajar
  let cards;
  if (catatanBelajar.length > 0) {
    cards = catatanBelajar.map((catatan) => (
      <div
        key={catatan.id}
        className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0 pb-3 px-4 flex"
      >
        <CardCatatan catatan={catatan} toggleNotepad={toggleNotepad} loggedInAccountId={loggedInAccountId}/>
      </div>
    ));
  } else {
    cards = <div className="text-center">Data not found</div>;
  }

  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-left">Catatan Belajar</h1>
      <div className="flex justify-between mt-12">
        <Button onClick={() => toggleNotepad("POST")} className="bg-[#38B0AB]">
          <FontAwesomeIcon icon={faPlus} className="pb-0.5 pr-2"/>
          Tambah
        </Button>
        <div className="relative w-1/4">
          <Input
            type="search"
            placeholder="Search for catatan belajar..."
            className="rounded-xl pl-10"
            value={searchKeyword}
            onChange={handleSearchInputChange}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      <div className="container mx-auto mt-4 rounded-xl bg-[#F5F7F9]">
        <div className="pt-4 pb-4 flex flex-wrap">{cards}</div>
        <Notepad
          isOpen={isNotepadOpen}
          onClose={toggleNotepad}
          method={method}
          catatanData={catatanData}
        />
      </div>
    </div>
  );
}

export default LayoutCatatan;