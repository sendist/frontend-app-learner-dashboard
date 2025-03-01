import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiShare2 } from "react-icons/ci";
import { GoReport } from "react-icons/go";
import { MdFormatListBulleted } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

const QuizKreatif = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [tags, setTags] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [link, setLink] = useState("");
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");
    const [currentQuizId, setCurrentQuizId] = useState(null);
    const [isQuizizzLink, setIsQuizizzLink] = useState(false);
    const [linkError, setLinkError] = useState("");

    const handleTambahQuizClick = () => {
        navigate("/tambah-quiz");
    };

    const handleMyQuizBtn = () => {
        navigate(`/my-quiz`);
    };

    const getAllQuiz = async () => {
        try {
            const response = await axios.get(
                "http://194.233.93.124:3030/quiz/quizzes" //server
                //"http://localhost:5000/quizzes"
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
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    const handleRadioChange = (event) => {
        setSelectedReason(event.target.value);
    };

    const handleDropdownChange = async (event) => {
        let tag = event.target.value;
        try {
            let response;
            if (tag === "Semua") {
                response = await axios.get("http://194.233.93.124:3030/quiz/quizzes");
            } else {
                response = await axios.get(
                    `http://194.233.93.124:3030/quiz/quizzes?tag=${tag}`
                );
            }
            setQuizzes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleReportSubmit = async (quizId) => {
        try {
            const response = await axios.post(
                "http://194.233.93.124:3030/quiz/report",
                {
                    user_id: "2",
                    quiz_id: quizId,
                    report_type: selectedReason,
                }
            );

            if (response.status === 201) {
                alert("Thank you for your report. We will review it shortly.");
                setModalShow(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("You have already reported this quiz.");
            } else {
                alert(
                    "There was an error processing your report. Please try again later."
                );
            }
            console.error("Error submitting report:", error);
        }
    };

    const validateLink = (inputLink) => {
        const quizizzPattern = /^https?:\/\/(www\.)?quizizz\.com/; // Regex pattern for checking if it's a Quizizz link
        return quizizzPattern.test(inputLink);
    };

    const handleLinkChange = (event) => {
        const inputLink = event.target.value;
        setLink(inputLink);
        if (validateLink(inputLink)) {
            setIsQuizizzLink(true);
            setLinkError("");
        } else {
            setIsQuizizzLink(false);
            setLinkError("Please enter a valid Quizizz link.");
        }
    };

    const handleStartQuiz = (quizLink) => {
        if (!quizLink.startsWith('http://') && !quizLink.startsWith('https://')) {
            quizLink = 'https://' + quizLink;
        }
        window.open(quizLink, "_blank");
    };

    useEffect(() => {
        getAllQuiz();
        getAllTag();

        console.log("username: ", getAuthenticatedUser.username)
    }, []);

    return (
        <div>
            {/* <NavbarQuiz /> */}
            <div className="container mx-auto p-8">
                {copied && (
                    <div className="fixed top-20 right-1/2 transform translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-xl z-50">
                        Link telah di-copy!
                    </div>
                )}
                <div className="mb-4">
                    <div className="flex justify-between mb-3 flex-col">
                        <div>
                            <p className="text-3xl font-semibold mb-8">Quiz Kreatif</p>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <button
                                    onClick={handleTambahQuizClick}
                                    className="bg-teal-500 hover:bg-teal-700 text-white text-sm py-2 px-6 rounded mr-2"
                                >
                                    Tambah Quiz
                                </button>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-white hover:bg-gray-100 text-teal-500 text-sm py-2 px-12 border border-teal-500 rounded"
                                >
                                    Join Quiz
                                </button>
                                {showModal && (
                                    <div>
                                        <div className="fixed inset-0 bg-black opacity-50 z-[30]"></div>
                                        <div className="fixed inset-0 flex items-center justify-center z-[99]">
                                            <div className="bg-white rounded-lg p-6 w-1/2">
                                                <h2 className="text-lg font-bold mb-4 w-full">
                                                    Masukkan Link Quiz
                                                </h2>
                                                <div className="">
                                                    <p className="text-gray-700 flex w-full justify-between">
                                                        <input
                                                            type="text"
                                                            value={link}
                                                            onChange={handleLinkChange}
                                                            className="border rounded py-2 px-3 w-full my-2"
                                                            placeholder="Enter link"
                                                        />
                                                    </p>
                                                    {linkError && <p className="text-red-500 text-xs italic">{linkError}</p>}
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => setShowModal(false)}
                                                            className="bg-white hover:bg-gray-300 text-teal-500 text-sm border border-teal-500 py-2 px-4 mt-4 rounded"
                                                        >
                                                            Tutup
                                                        </button>
                                                        <button
                                                            onClick={handleSaveChanges}
                                                            disabled={!isQuizizzLink}
                                                            className={`${isQuizizzLink ? "bg-teal-500 hover:bg-teal-700" : "bg-gray-300 cursor-not-allowed"} text-white text-sm px-4 py-1 mt-4 rounded`}
                                                        >
                                                            Masuk Quiz
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative inline-block text-left flex items-center mb-8">
                                <button
                                    onClick={handleMyQuizBtn}
                                    className="bg-teal-500 hover:bg-teal-700 text-white text-sm py-2 px-6 rounded mr-4"
                                >
                                    My Quiz
                                </button>
                                <TbCategory className="mr-3 text-teal-400 text-2xl " />
                                <select
                                    onChange={handleDropdownChange}
                                    className="text-sm bg-white text-gray-500 border border-gray-300 py-2 pr-10 pl-3 rounded-lg text-left inline-flex items-center appearance-none"
                                >
                                    <option value="Semua">Semua Kategori Quiz</option>
                                    {tags.map((tag) => (
                                        <option key={tag.id} value={tag.nama_tag}>
                                            {tag.nama_tag}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-2 transform -translate-y-1/2 pointer-events-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 14.586L5.707 10.293a1 1 0 011.414-1.414L10 12.586l3.879-3.879a1 1 0 111.414 1.414L10 14.586z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="container bg-slate-50 mx-auto p-6 rounded-lg">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {quizzes.length > 0 ? (
                                    quizzes.map((quiz) => (
                                        <div
                                            key={quiz.id}
                                            className="max-w-sm rounded-lg overflow-hidden shadow-lg p-5 bg-white flex flex-col justify-between"
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
                                                        <p className="text-gray-400 text-xs">
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
                                            <div className="mt-5 flex gap-2 justify-between w-full">
                                                <button className="bg-teal-500 hover:bg-teal-700 text-white font-base text-[13px] py-1 px-12 rounded" onClick={() => handleStartQuiz(quiz.link)}>
                                                    Mulai Quiz
                                                </button>
                                                <div className="flex">
                                                    <button className="items-center flex-col flex px-2 py-1 bg-white hover:bg-gray-300 text-teal-500 rounded mr-2">
                                                        <CopyToClipboard
                                                            text={quiz.link}
                                                            onCopy={handleShareClick}
                                                        >
                                                            <div
                                                                onClick={handleShareClick}
                                                                className="flex flex-col items-center justify-center"
                                                            >
                                                                <CiShare2 className="" />
                                                                <p className="text-[9px] m-0">Bagikan</p>
                                                            </div>
                                                        </CopyToClipboard>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setModalShow(true);
                                                            setCurrentQuizId(quiz.id);
                                                        }}
                                                        className="items-center flex-col flex px-2 py-1 bg-white hover:bg-gray-300 text-teal-500 rounded"
                                                    >
                                                        <GoReport className="" />
                                                        <p className="text-[9px]">Laporkan</p>
                                                    </button>
                                                    {modalShow && (
                                                        <div>
                                                            <div className="fixed inset-0 bg-black bg-opacity-10"></div>
                                                            <div className="fixed inset-0 flex items-center justify-center z-50 full">
                                                                <div className="bg-white rounded p-8 max-w-md">
                                                                    <div className="flex items-center justify-between mb-4">
                                                                        <h2 className="text-lg font-bold">
                                                                            Laporkan
                                                                        </h2>
                                                                        <button onClick={() => setModalShow(false)}>
                                                                            &times;
                                                                        </button>
                                                                    </div>

                                                                    <hr />
                                                                    <div className="bg-white rounded max-w-md">
                                                                        <div className="flex items-center p-3 justify-between mb-2">
                                                                            <p className="text-md font-bold">
                                                                                Apa masalah yang ingin anda laporkan ?{" "}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid bg-teal-50 p-3 rounded border border-gray-400 w-full">
                                                                        <div className="mr-3 gap-5 justify-between">
                                                                            <div className="flex mt-1 items-center justify-between">
                                                                                <label
                                                                                    htmlFor="plagiat"
                                                                                    className="ml-2 w-10/12"
                                                                                >
                                                                                    <b>Plagiat</b>
                                                                                    <br />
                                                                                    <p className="text-sm">
                                                                                        Quiz atau pertanyaan dalam quiz
                                                                                        merupakan plagiat dari sumber lain tanpa
                                                                                        izin atau atribusi yang tepat
                                                                                    </p>
                                                                                </label>
                                                                                <input
                                                                                    type="radio"
                                                                                    id="plagiat"
                                                                                    name="reportReason"
                                                                                    value="Plagiat"
                                                                                    className="form-radio h-4 w-4 text-teal-500"
                                                                                    onChange={handleRadioChange}
                                                                                />
                                                                            </div>
                                                                            <div className="flex mt-5 items-center justify-between">
                                                                                <label
                                                                                    htmlFor="privasi"
                                                                                    className="ml-2 w-10/12"
                                                                                >
                                                                                    <b>Privasi</b>
                                                                                    <br />
                                                                                    <p className="text-sm">
                                                                                        Membagikan informasi pribadi, mengancam
                                                                                        akan membagikan/menyebarkan informasi
                                                                                        pribadi
                                                                                    </p>
                                                                                </label>
                                                                                <input
                                                                                    type="radio"
                                                                                    id="privasi"
                                                                                    name="reportReason"
                                                                                    value="Privasi"
                                                                                    className="form-radio h-4 w-4 text-teal-500"
                                                                                    onChange={handleRadioChange}
                                                                                />
                                                                            </div>
                                                                            <div className="flex mt-5 items-center justify-between">
                                                                                <label
                                                                                    htmlFor="penghinaan"
                                                                                    className="ml-2 w-10/12"
                                                                                >
                                                                                    <b>
                                                                                        Penghinaan & Pelecehan secara Online
                                                                                    </b>
                                                                                    <br />
                                                                                    <p className="text-sm">
                                                                                        Penghinaan, konten seksual yang tidak
                                                                                        diinginkan, konten NSFW & grafis yang
                                                                                        tidak diinginkan, pelecehan bertarget
                                                                                    </p>
                                                                                </label>
                                                                                <input
                                                                                    type="radio"
                                                                                    id="penghinaan"
                                                                                    name="reportReason"
                                                                                    value="Penghinaan & Pelecehan secara Online"
                                                                                    className="form-radio h-4 w-4 text-teal-500"
                                                                                    onChange={handleRadioChange}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex justify-end">
                                                                        <button
                                                                            onClick={() => handleReportSubmit(currentQuizId)}
                                                                            disabled={!selectedReason}
                                                                            className={`${selectedReason ? "bg-teal-500 hover:bg-teal-700" : "bg-gray-300 cursor-not-allowed"} text-white text-sm py-2 px-4 rounded-md mt-4`}
                                                                        >
                                                                            Laporkan
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div
                                        className="px-4 py-3 rounded relative"
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
        </div>
    );
};

export default QuizKreatif;
