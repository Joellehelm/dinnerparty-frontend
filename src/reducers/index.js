import { combineReducers } from "redux";
import authReducer from "./authReducer";
import recipes from './SearchedRecipes';
import recipeInfo from './recipeInfo';
import partyList from './PartyList';


export default combineReducers({
  auth: authReducer,
  recipes: recipes,
  info: recipeInfo,
  partyList: partyList
  
});