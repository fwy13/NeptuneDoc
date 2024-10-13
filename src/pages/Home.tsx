import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import getAllUnit from "../services/getAllUnit";
import getScoreBoard from "../services/getScoreBoard";
import formatTimeCount, { formatNumber } from "../utils/formatTimeCount";
import createUidUser from "../utils/createUidUser";
import FramerMotion from "../components/FramerMotion";

const HomePage = () => {
    const getData = async () => {
        setData(await getAllUnit());
        const resScore = await getScoreBoard();
        setScoreBoard(resScore);
    };
    const [isData, setData] = useState<{
        allUnit: { name: string; link: string }[];
    }>();
    const [isScoreBoard, setScoreBoard] = useState<
        {
            Id: string;
            Name: string;
            Score: number;
            Time: number;
            Unit: number;
        }[]
    >();
    const useInput = useRef<HTMLInputElement>(null);
    const useModal = useRef<HTMLDialogElement | null>(null);
    const [isUnlock, setUnlock] = useState<boolean>(true);
    const [isName, setName] = useState<string>("");
    const [isSearch, setSearch] = useState<boolean>(false);
    const [isValue, setValue] = useState<string>("");
    const [isSearchResult, setSearchResult] = useState<
        {
            Id: string;
            Name: string;
            Score: number;
            Time: number;
            Unit: number;
        }[]
    >();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
        const filterName = isScoreBoard?.filter((item) =>
            item.Name.toLocaleLowerCase().includes(
                e.currentTarget.value.toLocaleLowerCase()
            )
        );
        const filterUnit = isScoreBoard?.filter((item) =>
            `${item.Unit}`
                .toLocaleLowerCase()
                .includes(e.currentTarget.value.toLocaleLowerCase())
        );
        if ((filterName?.length ?? 0) > 0) {
            setSearchResult(filterName);
        }
        if ((filterUnit?.length ?? 0) > 0) {
            setSearchResult(filterUnit);
        }
    };

    useEffect(() => {
        if (isName.length === 0) {
            if (localStorage.getItem("name") && localStorage.getItem("id")) {
                setName(localStorage.getItem("name") ?? "Ẩn danh");
            } else {
                localStorage.setItem("name", "Ẩn danh");
                localStorage.setItem("id", createUidUser());
            }
        }
    }, []);
    useEffect(() => {
        getData();
    }, []);
    return (
        <FramerMotion style={{}}>
            <div className="w-full h-screen">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="mt-5 text-2xl text-gray-100">NeptuneDoc</h1>
                    <div className="flex justify-between px-5 items-center py-2">
                        <div className="flex w-full justify-center items-center p-3 gap-2">
                            <button
                                className="rounded-md hover:text-white hover:scale-110"
                                onClick={() => useModal.current!.showModal()}
                            >
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
                                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                                    />
                                </svg>
                            </button>
                            <div
                                className="tooltip tooltip-right"
                                data-tip="Mã nguồn"
                            >
                                <Link
                                    to={"https://github.com/fwy13/NeptuneDoc"}
                                    className="rounded-md hover:text-white hover:scale-110"
                                >
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
                                            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                                        />
                                    </svg>
                                </Link>
                            </div>

                            <dialog ref={useModal} className="modal">
                                <div className="modal-box px-3">
                                    <div className="flex justify-between items-center px-2">
                                        <div className="flex gap-2 items-center h-[40px]">
                                            <label className="swap swap-rotate flex items-center relative">
                                                <input
                                                    type="checkbox"
                                                    onClick={() => {
                                                        setSearch(!isSearch);
                                                        setValue("");
                                                        setSearchResult([]);
                                                    }}
                                                />
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6 swap-off fill-current absolute"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                                    />
                                                </svg>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6 swap-on fill-current"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18 18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </label>
                                            <input
                                                type="text"
                                                className={`outline-none p-2 rounded-lg bg-base-200 w-44 ${
                                                    isSearch ? "" : "hidden"
                                                } animate-fade-right`}
                                                placeholder="Tên muốn tìm kiếm"
                                                onChange={handleSearch}
                                                value={isValue}
                                            />
                                        </div>
                                        <button
                                            className="hover:text-white hover:scale-110"
                                            onClick={() =>
                                                useModal.current!.close()
                                            }
                                        >
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
                                                    d="M6 18 18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex flex-col justify-center items-center w-full p-2">
                                        <div className="divider mt-0"></div>
                                        <div className="h-80 overflow-y-auto">
                                            <table className="table">
                                                <thead>
                                                    <tr className="text-center">
                                                        <th>Hạng</th>
                                                        <th>Tên</th>
                                                        <th>Điểm</th>
                                                        <th>Thời gian</th>
                                                        <th>Unit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(isSearchResult?.length ??
                                                        0) > 0
                                                        ? isSearchResult?.map(
                                                              (el, i) => (
                                                                  <tr
                                                                      className="hover text-center"
                                                                      key={i}
                                                                  >
                                                                      <th>
                                                                          {formatNumber(
                                                                              i +
                                                                                  1
                                                                          )}
                                                                      </th>
                                                                      <td>
                                                                          {
                                                                              el.Name
                                                                          }
                                                                      </td>
                                                                      <td>
                                                                          {
                                                                              el.Score
                                                                          }
                                                                      </td>
                                                                      <td>
                                                                          {formatTimeCount(
                                                                              Number(
                                                                                  el.Time
                                                                              )
                                                                          )}
                                                                      </td>
                                                                      <td>
                                                                          {
                                                                              el.Unit.toString().slice(4)
                                                                          }
                                                                      </td>
                                                                  </tr>
                                                              )
                                                          )
                                                        : isScoreBoard?.map(
                                                              (el, i) => (
                                                                  <tr
                                                                      className="hover text-center"
                                                                      key={i}
                                                                  >
                                                                      <th>
                                                                          {formatNumber(
                                                                              i +
                                                                                  1
                                                                          )}
                                                                      </th>
                                                                      <td>
                                                                          {
                                                                              el.Name
                                                                          }
                                                                      </td>
                                                                      <td>
                                                                          {
                                                                              el.Score
                                                                          }
                                                                      </td>
                                                                      <td>
                                                                          {formatTimeCount(
                                                                              Number(
                                                                                  el.Time
                                                                              )
                                                                          )}
                                                                      </td>
                                                                      <td>
                                                                          {
                                                                              el.Unit.toString().slice(4)
                                                                          }
                                                                      </td>
                                                                  </tr>
                                                              )
                                                          )}
                                                </tbody>
                                            </table>
                                            <div>
                                                {isScoreBoard === undefined ? (
                                                    <div className="w-full flex justify-center items-center">
                                                        <h3>
                                                            Đang tải dữ liệu...
                                                        </h3>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                        <input
                            type="text"
                            className="outline-none p-2 w-36 bg-transparent text-end"
                            disabled={isUnlock}
                            value={isName}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            ref={useInput}
                        />
                        <button
                            onClick={() => {
                                useInput.current!.focus();
                                setUnlock(!isUnlock);
                                localStorage.setItem(
                                    "name",
                                    useInput.current!.value
                                );
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
                        {/* <div className="avatar pl-2 py-2">
                            <div className="size-8 rounded-full">
                                <img src="https://i.pinimg.com/736x/0a/cd/67/0acd67c6da429a00d8e04746bb028a21.jpg" />
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="flex items-center justify-center flex-col gap-4 p-4">
                    {isData !== undefined ? (
                        isData.allUnit.map((el, i) => (
                            <Link to={`/unit/${el.link}`} key={i}>
                                <div className="p-3 px-10 border border-emerald-400 rounded-md flex items-center">
                                    <h3>{el.name.replace("t", "t ")}</h3>
                                    <div className="divider divider-horizontal divider-error"></div>
                                    <h3 className="text-success">Đã làm</h3>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <span className="loading loading-dots loading-lg"></span>
                    )}
                </div>
            </div>
        </FramerMotion>
    );
};
export default HomePage;
