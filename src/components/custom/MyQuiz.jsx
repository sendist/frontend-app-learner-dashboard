import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiShare2 } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
// import NavbarQuiz from "../components/NavbarQuiz";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoIosSearch } from "react-icons/io";

const MyQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [tags, setTags] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [link, setLink] = useState("");
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const { userId } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [showCopyNotification, setShowCopyNotification] = useState(false);

    const handleTambahQuizClick = () => {
        navigate("/tambah-quiz");
    };

    const getMyQuiz = async () => {
        try {
            const response = await axios.get(
                `http://194.233.93.124:3030/quiz/quizzes/user/${userId}`
            );
            setQuizzes(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllTag = async () => {
        try {
            const response = await axios.get("http://194.233.93.124:3030/quiz/tags");
            setTags(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSaveChanges = () => {
        let formattedLink = link;
        if (
            !formattedLink.startsWith("http://") &&
            !formattedLink.startsWith("https://")
        ) {
            formattedLink = "http://" + formattedLink;
        }
        handleClose();
        window.open(formattedLink, "_blank");
    };

    const handleShareClick = () => {
        setShowCopyNotification(true);
        setTimeout(() => {
            setShowCopyNotification(false);
        }, 2000); // Notifikasi akan hilang setelah 2 detik
    };

    const handleDeleteQuiz = async (quizId) => {
        const confirmDelete = window.confirm(
            "Apakah anda yakin ingin menghapus quiz ini?"
        );
        if (confirmDelete) {
            try {
                const response = await axios.delete(
                    `http://194.233.93.124:3030/quiz/quiz/${quizId}`
                );
                console.log(response.data);
                getMyQuiz();
            } catch (error) {
                console.error("Failed to delete quiz:", error);
                alert("Failed to delete quiz. Please try again.");
            }
        }
    };

    const handleEditQuiz = (quizId) => {
        navigate(`/edit-quiz/${quizId}`);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `http://194.233.93.124:3030/quiz/quizzes/user/${userId}?search=${encodeURIComponent(
                    searchTerm
                )}`
            );
            setQuizzes(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    useEffect(() => {
        getMyQuiz();
        getAllTag();
    }, [userId]);

    return (
        <div>
            <div className="block">
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                        <div className="bg-white p-8 rounded max-w-sm">
                            <button onClick={handleClose}>&times;</button>
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className="border rounded py-2 px-3 w-full my-2"
                                placeholder="Enter link"
                            />
                            <button
                                onClick={handleSaveChanges}
                                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Masuk Quiz
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="container mx-auto p-8">
                {showCopyNotification && (
                    <div className="fixed top-20 right-1/2 transform translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-xl z-50">
                        Link telah di-copy!
                    </div>
                )}
                <div className="mb-4">
                    <div className="flex justify-between mb-3 flex-col">
                        <div>
                            <p className="text-3xl font-semibold mb-8">My Quiz</p>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <button
                                    onClick={handleTambahQuizClick}
                                    className="bg-teal-500 hover:bg-teal-700 text-white text-sm py-2 px-6 rounded mr-2"
                                >
                                    Tambah Quiz
                                </button>
                            </div>

                            <div className="mb-4 relative">
                                <input
                                    type="text"
                                    className="text-sm bg-white text-gray-500 border border-gray-300 py-2 pl-5 rounded-lg text-left inline-flex items-center w-full"
                                    placeholder="Find My Quiz"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                />
                                <IoIosSearch
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
                                    onClick={handleSearch}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="container bg-slate-50 mx-auto p-6 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {quizzes.length > 0 ? (
                                quizzes.map((quiz) => (
                                    <div
                                        key={quiz.id}
                                        className="max-w-sm rounded-lg overflow-hidden shadow-lg p-5 bg-white"
                                    >
                                        <div className="font-semibold text-xl mb-4">
                                            {quiz.title}
                                        </div>
                                        {quiz.image && (
                                            <div>
                                                <img
                                                    className="object-cover w-96 h-48 rounded"
                                                    src={quiz.image}
                                                    alt={quiz.title}
                                                />
                                            </div>
                                        )}

                                        <div className="flex items-center mt-5 gap-3">
                                            <div className="flex h-full items-center">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src="https://3.bp.blogspot.com/-oa9m6Vjs78s/VMCqdcEo_lI/AAAAAAAAAqw/3GeZJLcpCYQ/s1600/IMG_0008.JPG"
                                                />
                                            </div>
                                            <div className="flex w-full justify-between mt-2 mb-2">
                                                <div className="flex-col">
                                                    <div>
                                                        <span className="text-sm text-gray-950">
                                                            Anya Felissa
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center px-3 gap-2">
                                                    <MdFormatListBulleted className="text-orange-400" />
                                                    <p>{quiz.jumlahSoal} Qs</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            {quiz.tags.map((tag) => (
                                                <span
                                                    key={tag.id}
                                                    className="inline-block bg-orange-300 rounded-md px-3 py-1 text-xs text-red-600 mr-2"
                                                >
                                                    {tag.nama_tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-5 flex justify-between items-start w-full">
                                            <div className="p-2">
                                                <p className="text-black-400 text-xs">
                                                    Dibuat tanggal{" "}
                                                    {new Date(quiz.createdAt).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleDeleteQuiz(quiz.id)}
                                                    className="items-center flex-col flex px-2 py-1 bg-white hover:bg-gray-300 text-teal-500 rounded"
                                                >
                                                    <MdDeleteOutline />
                                                    <p className="text-[5px]"></p>
                                                </button>
                                                <button
                                                    onClick={() => handleEditQuiz(quiz.id)}
                                                    className="items-center flex-col flex px-2 py-1 bg-white hover:bg-gray-300 text-teal-500 rounded"
                                                >
                                                    <FaRegEdit />
                                                    <p className="text-[5px]"></p>
                                                </button>
                                                <button
                                                    onClick={() => setModalShow(true)}
                                                    className="items-center flex-col flex px-2 py-1 bg-white hover:bg-gray-300 text-teal-500 rounded mr-2"
                                                >
                                                    <CopyToClipboard
                                                        text={quiz.link}
                                                        onCopy={handleShareClick}
                                                    >
                                                        <div className="flex flex-col items-center justify-center">
                                                            <CiShare2 className="" />
                                                            <p className="text-[5px] m-0"></p>
                                                        </div>
                                                    </CopyToClipboard>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div
                                    className=" px-4 py-3 rounded relative"
                                    role="alert"
                                >
                                    <p className="font-bold">
                                        Quiz yang kamu cari tidak tersedia !
                                    </p>
                                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyQuiz;
