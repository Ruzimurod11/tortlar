import React from "react";

// debounce
import debounce from "lodash.debounce";

// scss
import s from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filter/slice";

export const Search: React.FC = () => {
   const dispatch = useDispatch();
   const [value, setValue] = React.useState("");
   const inputRef = React.useRef<HTMLInputElement>(null);

   const onClickClear = () => {
      dispatch(setSearchValue(""));
      setValue("");
      inputRef.current?.focus();
   };

   const updateSearchValue = React.useCallback(
      debounce((str) => {
         dispatch(setSearchValue(str));
      }, 200),
      []
   );

   const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      updateSearchValue(e.target.value);
   };

   return (
      <div className={s.root}>
         <svg
            className={s.icon}
            enableBackground="new 0 0 32 32"
            id="Editable-line"
            version="1.1"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg">
            <circle
               cx="14"
               cy="14"
               fill="none"
               id="XMLID_42_"
               r="9"
               stroke="#000000"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeMiterlimit="10"
               strokeWidth="2"
            />
            <line
               fill="none"
               id="XMLID_44_"
               stroke="#000000"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeMiterlimit="10"
               strokeWidth="2"
               x1="27"
               x2="20.366"
               y1="27"
               y2="20.366"
            />
         </svg>
         <input
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            className={s.input}
            placeholder="Ismingiz yozilgan tort... "
         />

         {value && (
            <svg
               onClick={onClickClear}
               className={s.clearIcon}
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
               <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
         )}
      </div>
   );
};
