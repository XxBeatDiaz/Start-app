import { useNavigate } from "react-router";

import "../stayles/addLink.css";
import { useState } from "react";

type addFunc = {
  navigateTo?: string;
  text: string;
  type: "navigate" | "input";
};

export default function AddLinkComps({ navigateTo, text, type }: addFunc) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "navigate" && navigateTo) {
      navigate(navigateTo);
    } else if (type === "input") {
      setShowInput(true);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <button onClick={handleClick} className="btn-add">
        {text}
      </button>
      {showInput && (
        <form onSubmit={handleSubmit} className="form-add-link">
          <input
            className="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="הוספת לינק.."
          />
          <button type="submit" className="btn-submit"></button>
        </form>
      )}
    </div>
  );
}
