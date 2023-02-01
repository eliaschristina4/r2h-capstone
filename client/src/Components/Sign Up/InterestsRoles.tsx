import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

interface Props {
  rolesData: Roles;
  handleChange: (role: string) => void;
  opacity: number;
  passwordError: boolean;
  handleSubmit: any;
  setConfirmPassword: any;
  confirmPassword: any;
}

export const InterestsRoles = ({
  rolesData,
  handleChange,
  opacity,
  passwordError,
  handleSubmit,
  setConfirmPassword,
  confirmPassword,
}: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <p className="sign-up-title">{rolesData.title}</p>
      <p className="sign-up-description">{rolesData.description}</p>
      <section className="sign-up-form-details">
        <section className="interest-section">
          {/* Roles */}
          <section>
            <section className="group">
              <input
                className="form-input"
                type="checkbox"
                onChange={() => handleChange(rolesData.role1)}
              ></input>
              <label htmlFor="role1">{rolesData.role1}</label>
            </section>

            <section className="group">
              <input
                className="form-input"
                type="checkbox"
                onChange={() => handleChange(rolesData.role2)}
              ></input>
              <label htmlFor="role2">{rolesData.role2}</label>
            </section>

            <section className="group">
              <input
                className="form-input"
                type="checkbox"
                onChange={() => handleChange(rolesData.role3)}
              ></input>
              <label htmlFor="role3">{rolesData.role3}</label>
            </section>
          </section>
          <section>
            <section className="group">
              <input
                className="form-input"
                type="checkbox"
                onChange={() => handleChange(rolesData.role4)}
              ></input>
              <label htmlFor="role4">{rolesData.role4}</label>
            </section>

            <section className="group">
              <input
                className="form-input"
                type="checkbox"
                onChange={() => handleChange(rolesData.role5)}
              ></input>
              <label htmlFor="role5">{rolesData.role5}</label>
            </section>

            <section className="group">
              <input
                className="form-input"
                type="checkbox"
                onChange={() => handleChange(rolesData.role6)}
              ></input>
              <label htmlFor="role6">{rolesData.role6}</label>
            </section>
          </section>
        </section>

        <section className="sign-up-information">
          {" "}
          <input
            className="form-input"
            placeholder="Email Address"
            name="email"
            type="email"
            required
          ></input>
          <input
            className="form-input"
            placeholder="Phone Number"
            name="phone"
            required
          ></input>
          <input
            className="form-input"
            placeholder="Password"
            name="password"
            required
          ></input>
          <input
            className="form-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
          <p
            className="redirect-sign-up"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate(`/signup/hr`);
            }}
            style={{ opacity }}
          >
            Not a Mentor or a Business? Sign up as an Employee
          </p>
          <p
            className="password-error"
            style={{ display: passwordError ? "block" : "none" }}
          >
            The Passwords Do Not Match
          </p>
          <input
            className="sign-up-btn"
            type="submit"
            value="Sign Up"
            onClick={handleSubmit}
          ></input>
        </section>
      </section>
    </>
  );
};
