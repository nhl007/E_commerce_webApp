import { useReducer } from "react"
import reducer from "./reducer"
import { useFeatureContext } from "../feature/FeatureContext"

const AdminContext=React.createContext()


const initialState={
    users:null,
    currentPage:0,
    
}
const AdminProvider =({children})=>{
    const {displayAlert}=useFeatureContext()
  const apiUrl = import.meta.env.VITE_API_URL;

const [state,dispatch]=useReducer(reducer,initialState)

const getAllUsers = async () => {
    await axios
      .get(`${apiUrl}/admin/users`)
      .then((res) => {
        console.log(res.data)
        displayAlert('Logged out successfully !');
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
      });
  };
    return <AdminContext.Provider value={...state}>
        {children}
    </AdminContext.Provider>
}