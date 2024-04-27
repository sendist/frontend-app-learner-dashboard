import { Link } from "react-router-dom";
import Badge from "./Badge";
import Capaian from "./Capaian";
import { Button } from "../ui/button";

const TimelineLayout = () => {
  return (
    <div className="flex">
      <div className="flex-1 text-left mx-auto p-4">
        <h1 className="text-4xl font-semibold mb-5">Timeline</h1>
        <Badge
          nama="Mvp Limitzz"
          tanggalPenyelesaian="April 20, 2024"
          namaBadge="Badge Name"
          fotoSrc="https://akademik.polban.ac.id/fotomhsrekap/211524037.jpg"
        />
        <Capaian
          nama="Rzanta"
          tanggalPenyelesaian="20 April 2024"
          namaCourse="Belajar React"
          fotoSrc="https://akademik.polban.ac.id/fotomhsrekap/211524059.jpg"
        />
        <div className="mt-4">
          <Link to="/findfriends">
            <Button className="bg-[#38B0AB] hover:bg-teal-700">
              Cari Teman
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TimelineLayout;
