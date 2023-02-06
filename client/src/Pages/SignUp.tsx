import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
// Components
// import { Footer } from "../Components/Footer";
// import { Header } from "../Components/Header";
import { Form } from "../Components/SignUp/Form";
import { InterestsRoles } from "../Components/SignUp/InterestsRoles";
// CSS
import "../Styles/SignUp.css";
// Images
import mentorIcon from "../Images/SignUp/mentor-icon.png";
import businessIcon from "../Images/SignUp/business-icon.png";
import hrIcon from "../Images/SignUp/hr-icon.png";
// Interface
// Sign Up Form data
interface FormSignUp {
  title: string;
  description: string;
  formTag1: string;
  formTag2: string;
  formTag3: string;
}
// Sign Up Roles
interface Roles {
  title: string;
  description: string;
  role1: string;
  role2: string;
  role3: string;
  role4: string;
  role5: string;
  role6: string;
}
interface SignUpI {
  form: FormSignUp;
  roles: Roles;
}
const SignUp = () => {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState<SignUpI>({
    form: {
      title: "",
      description: "",
      formTag1: "",
      formTag2: "",
      formTag3: "",
    },
    roles: {
      title: "",
      description: "",
      role1: "",
      role2: "",
      role3: "",
      role4: "",
      role5: "",
      role6: "",
    },
  });
  const [roles, setRoles] = useState<string[]>([]);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [opacity, setOpacity] = useState(1);
  const handleChange = (role: string) => {
    if (roles.includes(role)) {
      setRoles(roles.filter((i) => i !== role));
    } else {
      setRoles([...roles, role]);
    }
  };
  const parameters: string | undefined = useParams().user;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target.form);
    const data = Object.fromEntries(formData.entries());
    if (data.password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      const formData = ({ ...data, interests: roles });
      axios.post(`http://localhost:5000/signup/${parameters}`, formData);
    }
  };
  useEffect(() => {
    if (parameters === "business") {
      setSignUpForm(tempData.business);
      setOpacity(1);
    } else if (parameters === "mentor") {
      setSignUpForm(tempData.mentor);
      setOpacity(1);
    } else if (parameters === "hr") {
      setOpacity(0);
      setSignUpForm(tempData.hr);
    }
  }, [parameters]);
  return (
    <section>
      {/* <Header /> */}
      <main>
        <section className="form-section">
          <form onSubmit={handleSubmit}>
            {/* Top Section */}
            <section className="sign-up-section">
              <section className="sign-up-details">
                <Form {...signUpForm.form} />
              </section>
              <section className="icon-section">
                <img
                  src={
                    parameters === "business"
                      ? businessIcon
                      : parameters === "mentor"
                      ? mentorIcon
                      : hrIcon
                  }
                  alt={`${parameters} Sign Up Icon`}
                ></img>
              </section>
            </section>
            <div className="divider"></div>
            <section className="sign-up-bottom-section">
              <section className="sign-up-interests">
                <InterestsRoles
                  rolesData={signUpForm.roles}
                  handleChange={handleChange}
                  opacity={opacity}
                  passwordError={passwordError}
                  handleSubmit={handleSubmit}
                  setConfirmPassword={setConfirmPassword}
                  confirmPassword={confirmPassword}
                />
              </section>
              <section className="sign-in-basic"></section>
            </section>
          </form>
        </section>
      </main>
      {/* <Footer /> */}
    </section>
  );
};

export default SignUp;

const tempData = {
  business: {
    form: {
      title: "Business Sign Up",
      description:
        "Unlock the full potential of our business resources and support. As a member, you'll have access to various resources. With our help, you can take your business to the next level and achieve success!",
      formTag1: "Business Name",
      formTag2: "Owner Full Name",
      formTag3: "Business Description",
    },
    roles: {
      title: "Business Interests",
      description: `Select the interests that best describe your business to find the resources you need:`,
      role1: "Technology",
      role2: "Education",
      role3: "Retail",
      role4: "Restaurant",
      role5: "Logistics",
      role6: "Health",
    },
  },
  mentor: {
    form: {
      title: "Mentor Sign Up",
      description:
        "Join our community of experienced professionals and share your knowledge and expertise with others. As a mentor, you will have the opportunity to guide and support individuals on their professional journey.",
      formTag1: "Full Name",
      formTag2: "Profession",
      formTag3: "Description",
    },
    roles: {
      title: "Mentor Interests",
      description: `Select the roles that best describe your mentoring expertise. These are the areas you will be able to help others in:`,
      role1: "Technology",
      role2: "Education",
      role3: "Retail",
      role4: "Restaurant",
      role5: "Logistics",
      role6: "Health",
    },
  },
  hr: {
    form: {
      title: "Human Resource Sign Up",
      description:
        "Join Bank of America's HR team and make a impact. You'll promote a positive work environment, manage employee relations and oversee HR programs.",
      formTag1: "Full Name",
      formTag2: "Employee ID",
      formTag3: "Description",
    },
    roles: {
      title: "Human Resource Roles",
      description: `Join our team of human resources experts and help shape the future of our company. As an HR representative, you will play a crucial role in building and maintaining a positive and productive work environment. Please provide your current role as HR`,
      role1: "Technology",
      role2: "Education",
      role3: "Retail",
      role4: "Restaurant",
      role5: "Logistics",
      role6: "Health",
    },
  },
};