import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import { Form } from "../Components/Sign Up/Form";
import { InterestsRoles } from "../Components/Sign Up/InterestsRoles";

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

export const SignUp = () => {
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

  const parameters: string | undefined = useParams().user;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target.form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  useEffect(() => {
    if (parameters === "business") {
      setSignUpForm(tempData.business);
    } else if (parameters === "mentor") {
      setSignUpForm(tempData.mentor);
    } else if (parameters === "hr") {
      setSignUpForm(tempData.hr);
    } else {
    }
  }, [parameters]);

  return (
    <section>
      <Header />
      <main>
        <section className="form-section">
          <form onSubmit={handleSubmit}>
            {/* Top Section */}
            <Form {...signUpForm.form} />

            {/* Middle Section */}
            <InterestsRoles {...signUpForm.roles} />

            {/* Bottom Section */}
            <p className="sign-up-title">Sign Up Information</p>
            <p className="sign-up-description"></p>
            <input
              className="form-input"
              placeholder="Email Address"
              name="email"
            ></input>
            <input
              className="form-input"
              placeholder="Phone Number"
              name="phone"
            ></input>
            <input
              className="form-input"
              placeholder="Password"
              name="password"
            ></input>
            <input
              className="form-input"
              placeholder="Confirm Password"
              name="confirmPassword"
            ></input>

            <input type="submit" value="Sign Up" onClick={handleSubmit}></input>
          </form>
        </section>
        <section className="icon-section"></section>
      </main>
      <Footer />
    </section>
  );
};

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
        "Join our team of human resources experts and help shape the future of our company. As an HR representative, you will play a crucial role in building and maintaining a positive and productive work environment.",
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
