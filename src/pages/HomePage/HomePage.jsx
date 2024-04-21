import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { clearMovie } from "../../redux/currentMovie/slice";
import { clearShow } from "../../redux/currentShow/slice";


export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMovie());
    dispatch(clearShow());
  }, [dispatch])

  return(<>Home</>)
}