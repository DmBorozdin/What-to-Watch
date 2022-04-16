import {combineReducers} from "redux";
import {filmsData} from "./films-data/films-data";
import {filmsList} from "./films-list/films-list";
import {review} from "./review/review";
import {user} from "./user/user";

export const NameSpace = {
  DATA: `DATA`,
  LIST: `LIST`,
  REVIEW: `REVIEW`,
  USER: `USER`,
};

export default combineReducers({
  [NameSpace.DATA]: filmsData,
  [NameSpace.LIST]: filmsList,
  [NameSpace.REVIEW]: review,
  [NameSpace.USER]: user,
});
