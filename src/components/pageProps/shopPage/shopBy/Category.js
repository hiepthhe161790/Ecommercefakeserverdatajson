import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../../../../redux/orebiSlice";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);

  const checkedCategorys = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const dispatch = useDispatch();

  const category = [
    {
      id: 9006,
      title: "Imprimante",
    },
    {
      id: 9007,
      title: "Encre",
    },
    {
      id: 9008,
      title: "Ruban",
    },
    {
      id: 9009,
      title: "Tech",
    },
  ];

  const handleToggleCategory = (category) => {
    dispatch(toggleCategory(category));
  };

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={true} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {category.map((item) => (
            <li
              key={item.id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <input
                type="checkbox"
                id={item.id}
                checked={checkedCategorys.some((b) => b.id === item.id)}
                onChange={() => handleToggleCategory(item)}
              />
              {item.title}
              {item.icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        
        </ul>
      </div>
    </div>
  );
};

export default Category;
