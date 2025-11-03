"use client"
import { useSelector } from "react-redux";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function HelloRedux() {
    const { message } = useSelector((state: any) => state.helloReducer);
    return (
        <div id="wd-hello-redux">
            <h3>Hello Redux</h3>
            <h4>{message}</h4> <hr />
        </div>
    );
}
