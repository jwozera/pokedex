import "./filter.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { reset, setType } from "../../../features/pokemons/pokemonsSlice";
import { getTypes } from "../../../features/pokemons/pokemonsAction";

const Filter = () => {
  const { typesList, success, error, type } = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();
  const [ filter, setFilter ] = useState("")
  const [ displayDropDown, setDisplayDropDown ] = useState(false);
  const handleDropdown = () => {
    setDisplayDropDown(!displayDropDown);
  }

  useEffect(()=> {
    dispatch(getTypes());

    if(error) {
      console.log(error);
    }
  }, [dispatch, error, success, type]) 

  useEffect(() => {
    if(filter !== "") {
      dispatch(setType(filter))
    }
    return () => {
      dispatch(reset())
    };
  }, [dispatch, filter])

  return (
    <section className="filter-container">
      <div className="filter" onClick={handleDropdown}>
        <input
          type="text"
          readOnly
          placeholder="Serch by Type"
          value={filter}
          className="filter-input"
        />

        <i className="fa-solid fa-angle-down"></i>
      </div>
      {displayDropDown ? (
          <div className="dropdown">
            {typesList.map( (type, i) => (
              <div key={i} className="dropdown-item" onClick={()=> {
                setFilter(type.name);
                handleDropdown();
              }}>{type.name}</div>
            ))}
          </div>
      ) : null}
    </section>
  );
};

export default Filter;
