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
  return (
    <>
      <p
        className="redirect-sign-up"
        onClick={() =>
          navigate(`/signup/${parameters === "mentor" ? "business" : "mentor"}`)
        }
      >
        Not a {parameters === "business" ? "Business" : "Mentor"}? Sign Up as a{" "}
        {parameters === "mentor" ? "Business" : "Mentor"}
      </p>

      <p className="sign-up-title">{formData.title}</p>
      <p className="sign-up-description">{formData.description}</p>
      <input
        className="form-input"
        placeholder={formData.formTag1}
        name={formData.formTag1}
      ></input>
      <input
        className="form-input"
        placeholder={formData.formTag2}
        name={formData.formTag2}
      ></input>
      <input
        className="form-input"
        placeholder={formData.formTag3}
        name={formData.formTag3}
      ></input>
    </>
  );
};
