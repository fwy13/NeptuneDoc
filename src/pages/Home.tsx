import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import getAllUnit from "../services/getAllUnit";
import getScoreBoard from "../services/getScoreBoard";
import { formatNumber } from "../utils/formatTimeCount";

const HomePage = () => {
    const getData = async () => {
        setData(await getAllUnit());
        const resScore = await getScoreBoard();
        setScoreBoard(resScore);
    };
    const [isData, setData] = useState<{ allUnit: string[] }>();
    const [isScoreBoard, setScoreBoard] = useState<{
        scoreBoard: {
            Rank: string;
            Name: string;
            Score: number;
            Time: number;
        }[][];
    }>();
    const useInput = useRef<HTMLInputElement>(null);
    const [isUnlock, setUnlock] = useState<boolean>(true);
    const [isName, setName] = useState<string>("");
    useEffect(() => {
        setName(localStorage.getItem("name") ?? "");
    }, []);
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="w-full h-screen">
            <div className="flex justify-center">
                <h1 className="mt-5 text-2xl text-gray-100">
                    FlashCardEnglish
                </h1>
            </div>
            <div className="flex w-full justify-end px-4">
                <input
                    type="text"
                    className="outline-none p-2 w-36 bg-transparent text-end"
                    disabled={isUnlock}
                    placeholder={isName}
                    ref={useInput}
                />
                <button
                    onClick={() => {
                        useInput.current!.focus();
                        setUnlock(!isUnlock);
                        localStorage.setItem("name", useInput.current!.value);
                    }}
                >
                    {isUnlock ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                            />
                        </svg>
                    )}
                </button>
                <div className="avatar pl-2 py-2">
                    <div className="size-8 rounded-full">
                        <img src="https://i.pinimg.com/736x/0a/cd/67/0acd67c6da429a00d8e04746bb028a21.jpg" />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center flex-col gap-4 p-4">
                {isData !== undefined ? (
                    isData.allUnit.map((el, i) => (
                        <Link to={`/unit/${i + 1}`} key={i}>
                            <div className="p-3 border border-emerald-400 rounded-md flex items-center">
                                <h3>{el.replace("t", "t ")}</h3>
                                <div className="divider divider-horizontal divider-error"></div>
                                <h3 className="text-success">Đã hoàn thành</h3>
                                <div className="divider divider-horizontal divider-error"></div>
                                <button className="btn btn-primary text-white">
                                    Làm
                                </button>
                            </div>
                        </Link>
                    ))
                ) : (
                    <span className="loading loading-dots loading-lg"></span>
                )}
            </div>
            <div className="flex flex-col justify-center items-center w-full">
                <h3 className="text-2xl text-emerald-400">Bảng xếp hạng</h3>
                <div className="h-80 overflow-y-auto">
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>Hạng</th>
                                <th>Tên</th>
                                <th>Điểm</th>
                                <th>Thời gian</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {isScoreBoard?.scoreBoard[0].map((el, i) => (
                                <tr className="hover text-center" key={i}>
                                    <th>{formatNumber(Number(el.Rank))}</th>
                                    <td>{el.Name}</td>
                                    <td>{el.Score}</td>
                                    <td>{el.Time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        {isScoreBoard === undefined ? (
                            <div className="w-full flex justify-center items-center">
                                <h3>Đang tải dữ liệu...</h3>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomePage;
