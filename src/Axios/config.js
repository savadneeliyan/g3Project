import axios from "axios";
import { baseurl } from "../urls";
const instance = axios.create({
  baseURL: baseurl,
});
export default instance