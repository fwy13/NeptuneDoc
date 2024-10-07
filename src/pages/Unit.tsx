import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getUnit from "../services/getUnit";
import * as lodash from "lodash";
import getRandomInt from "../utils/randomInit";
import * as partyjs from "party-js";
import formatTimeCount, { formatNumber } from "../utils/formatTimeCount";
import { url } from "../constants";
type Data = {
    word: string;
    ans: unknown[];
    correct: string;
};

const Unit = () => {
    const params = useParams();
    const [isData, setData] = useState<Data[]>();
    const [isCurrentIndex, setCurrentIndex] = useState<number>(0);
    const [isError, setError] = useState<boolean>(false);
    const [isCount, setCount] = useState<number>(0);
    const [isDataAnswer, setDataAnswer] =
        useState<{ index: number; AnswerCorrect: string }[]>();
    const [isActive, setActive] = useState<boolean>(false);
    const [isEnd, setEnd] = useState<boolean>(false);
    const [isCountUp, setCountUp] = useState<number>(0);
    const [isResult, setResult] = useState<{
        error: boolean;
        message: string;
    }>();
    const useEl = useRef(null);
    const route = useNavigate();

    const saveResult = async () => {
        const name = localStorage.getItem("name");
        const score = isCount;
        const time = isCountUp;
        const response = await fetch(
            `${url}?name=${name}&score=${score}&time=${time}&unitScore=${params.number}`
        ).then((res) => res.json());
        setResult(response);
    };
    useEffect(() => {
        if (isResult !== undefined) {
            route("/");
        }
    }, [isResult]);
    const getData = async () => {
        const res: { data: { WORD: string; MEANING: string }[][] } | any =
            await getUnit(Number(params.number));
        if (res.error) {
            return setError(true);
        }
        setError(false);
        const dataOri: string[] = [];
        const dataStore: { index: number; AnswerCorrect: string }[] = [];
        const dataEdited: Data[] = [];
        const Data = lodash.shuffle(res.data[0]);
        Data.forEach((el) => {
            dataOri.push(el.MEANING);
        });
        Data.forEach((el, i) => {
            dataStore.push({
                index: i,
                AnswerCorrect: el.MEANING.toLocaleLowerCase().trim(),
            });
        });
        setDataAnswer(dataStore);
        // localStorage.setItem("correct", dataStore)
        Data.forEach((item) => {
            let dataArr: string[] = [];
            dataArr = [...dataOri];
            const ans: string[] = [];
            const indexSame = dataArr.indexOf(item.MEANING);
            dataArr.splice(indexSame, 1);
            [1, 2, 3].forEach(() => {
                const getRandom = getRandomInt(0, dataArr.length - 2);
                dataArr.splice(getRandom, 1);
                ans.push(dataArr[getRandom]);
            });
            ans.push(item.MEANING);
            dataEdited.push({
                word: item.WORD,
                ans: lodash.shuffle(ans),
                correct: item.MEANING,
            });
        });
        setData(dataEdited);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let total = 0;
    useEffect(() => {
        if (isData !== undefined && !isEnd) {
            const timer = setInterval(() => {
                total++;
                setCountUp(total);
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [isData, isEnd]);
    useEffect(() => {
        getData();
    }, []);
    const name = localStorage.getItem("name") ?? "Ẩn danh";
    return (
        <div className="w-full h-screen">
            {!isError ? (
                <div className="w-full h-full">
                    <header className="w-full flex justify-between p-4 items-center text-gray-100 bg-neutral gap-2">
                        <h3>{formatTimeCount(isCountUp)}</h3>
                        <h3>{name}</h3>
                        <h3>Điểm: {formatNumber(isCount)}</h3>
                    </header>
                    <div
                        className="w-full justify-center items-center bg-neutral mt-2 p-4 min-h-[400px]"
                        ref={useEl}
                    >
                        <button
                            onClick={() => {
                                route("/");
                            }}
                            className="ml-2 btn btn-circle flex justify-center items-center p-2 fixed left-0 bottom-10 bg-error text-white"
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
                                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                />
                            </svg>
                        </button>
                        {isData !== undefined &&
                        isDataAnswer !== undefined &&
                        !isEnd ? (
                            <div className="flex flex-col gap-10 p-2 justify-center items-center w-full">
                                <div className="flex flex-col gap-5 w-full">
                                    <h3 className="text-[18px] text-gray-200">
                                        Câu {isCurrentIndex + 1}:{" "}
                                        {isData[isCurrentIndex].word} nghĩa là:
                                    </h3>
                                    <div className="flex flex-col gap-4 w-full">
                                        {isData[isCurrentIndex].ans.map(
                                            (item, i) => (
                                                <button
                                                    key={i}
                                                    disabled={isActive}
                                                    onClick={() => {
                                                        if (
                                                            (item as string)
                                                                .toLocaleLowerCase()
                                                                .trim() ===
                                                            isDataAnswer[
                                                                isCurrentIndex
                                                            ].AnswerCorrect
                                                        ) {
                                                            partyjs.confetti(
                                                                useEl.current!,
                                                                {
                                                                    count: partyjs.variation.range(
                                                                        20,
                                                                        40
                                                                    ),
                                                                }
                                                            );
                                                            setCount(
                                                                isCount + 1
                                                            );
                                                        }
                                                        setActive(true);
                                                        setTimeout(() => {
                                                            if (
                                                                isCurrentIndex <
                                                                isData.length -
                                                                    1
                                                            ) {
                                                                setCurrentIndex(
                                                                    isCurrentIndex +
                                                                        1
                                                                );
                                                            } else {
                                                                setEnd(true);
                                                                saveResult();
                                                            }
                                                            setActive(false);
                                                        }, 1000);
                                                    }}
                                                    className={`bg-primary hover:bg-[#525cb7] p-4 text-white rounded-md text-center ${
                                                        isActive
                                                            ? (item as string)
                                                                  .toLocaleLowerCase()
                                                                  .trim() ===
                                                              isDataAnswer[
                                                                  isCurrentIndex
                                                              ].AnswerCorrect
                                                                ? "border-[5px] border-emerald-400"
                                                                : "border-[5px] border-error"
                                                            : ""
                                                    }`}
                                                >
                                                    {item as string}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full justify-center items-center h-full">
                                <span>Đang tải...</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex justify-center p-4">
                    <span className="text-error">
                        Trang bạn muốn truy cập hiện không có! Vui lòng quay
                        lại!
                    </span>
                </div>
            )}
        </div>
    );
};
export default Unit;
