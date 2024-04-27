import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ListTeman from "./ListTeman";

const LayoutRekomendasiTeman = () => {
  return (
    <div className="flex">
      <div className="flex-1 text-left mx-auto p-4">
        <h1 className="text-4xl font-semibold mb-5">Cari Teman Belajar</h1>
        <div className="flex items-center">
          <Input className="ml-4 w-1/2" placeholder="Cari Teman Belajar" />
          <Button className="bg-[#38B0AB] hover:bg-teal-700">Cari</Button>
        </div>
        <ListTeman
          nama="Rzanta"
          minat="Expline"
          fotoSrc="https://akademik.polban.ac.id/fotomhsrekap/211524059.jpg"
        />
        <ListTeman
          nama="Mvp Limitz"
          minat="Gold Line"
          fotoSrc="https://akademik.polban.ac.id/fotomhsrekap/211524037.jpg"
        />
        <div className="mt-4">
          <Link to="/findfriends/timeline">
            <Button className="bg-[#38B0AB] hover:bg-teal-700">
              Lihat Timeline
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LayoutRekomendasiTeman;
