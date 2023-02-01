import React from "react";
import { useNavigate, useParams } from "react-router-dom";

interface SignUpFormData {
  title: string;
  description: string;
  formTag1: string;
  formTag2: string;
  formTag3: string;
}

<<<<<<< Updated upstream
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
      <input
        className="form-input"
        placeholder={formData.formTag3}
        name={processInput(formData.formTag3)}
        required
      ></input>
    </>
  );
};
=======
interface Props {
  formData: SignUpFormData;
}

interface State {
  parameters: string | undefined;
}

export class Form extends React.Component<Props, State> {
  navigate: any;
  constructor(props: Props) {
    super(props);
    this.navigate = useNavigate();
    this.state = {
      parameters: useParams().user
    };
  }

  handleClick = () => {
    this.navigate(
      `/signup/${
        this.state.parameters === "mentor" ? "business" : "mentor"
      }`
    );
  };

  render() {
    const { title, description, formTag1, formTag2, formTag3 } = this.props.formData;
    return (
      <>
        <p
          className="redirect-sign-up"
          onClick={this.handleClick}
        >
          Not a {this.state.parameters === "business" ? "Business" : "Mentor"}? Sign Up as a{" "}
          {this.state.parameters === "mentor" ? "Business" : "Mentor"}
        </p>

        <p className="sign-up-title">{title}</p>
        <p className="sign-up-description">{description}</p>
        <input
          className="form-input"
          placeholder={formTag1}
          name={formTag1}
        ></input>
        <input
          className="form-input"
          placeholder={formTag2}
          name={formTag2}
        ></input>
        <input
          className="form-input"
          placeholder={formTag3}
          name={formTag3}
        ></input>
      </>
    );
  }
}

export default SignUpFormData
>>>>>>> Stashed changes
