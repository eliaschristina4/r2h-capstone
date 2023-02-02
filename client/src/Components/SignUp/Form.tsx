import { useNavigate, useParams } from "react-router-dom";

interface SignUpFormData {
  title: string;
  description: string;
  formTag1: string;
  formTag2: string;
  formTag3: string;
}

export const Form = (formData: SignUpFormData) => {
  const navigate = useNavigate();
  const parameters: string | undefined = useParams().user;

  const processInput = (input: string) => {
    let [firstWord, ...restOfString] = input.split(" ");
    return restOfString.length === 0
      ? input.toLowerCase()
      : `${firstWord.toLowerCase()}${restOfString.join(" ")}`;
  };

  return (
    <>
      <p
        className="redirect-sign-up"
        onClick={() =>
          navigate(
            `/signup/${
              parameters === "mentor"
                ? "business"
                : parameters === "hr"
                ? "business"
                : "mentor"
            }`
          )
        }
      >
        Not a{" "}
        {parameters === "business"
          ? "Business"
          : parameters === "hr"
          ? "Employee"
          : "Mentor"}
        ? Sign Up as a{" "}
        {parameters === "mentor"
          ? "Business"
          : parameters === "hr"
          ? "Business"
          : "Mentor"}
      </p>

      <p className="sign-up-title">{formData.title}</p>
      <p className="sign-up-description">{formData.description}</p>
      <input
        className="form-input"
        placeholder={formData.formTag1}
        name={processInput(formData.formTag1)}
        required
      ></input>
      <input
        className="form-input"
        placeholder={formData.formTag2}
        name={processInput(formData.formTag2)}
        required
      ></input>
      <textarea
        className="form-input"
        placeholder={formData.formTag3}
        name={processInput(formData.formTag3)}
        required
      ></textarea>
    </>
  );
};