import { put } from "redux-saga/effects";
import { setUser } from "../../ducks/user";
import { setIsUser } from "../../ducks/userAuthorization";


export function* handleError (error) {
    if (error.response.data.error === "Blocked") {
        localStorage.removeItem("user");
        yield put(setUser(null));
        yield put(setIsUser(error.response.data.error));
      }
}