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
}

export const InterestsRoles = ({ rolesData, handleChange }: Props) => {
  return (
    <>
      <p className="sign-up-title">{rolesData.title}</p>
      <p className="sign-up-description">{rolesData.description}</p>

      {/* Roles */}
      <input
        className="form-input"
        type="checkbox"
        onChange={() => handleChange(rolesData.role1)}
      ></input>
      <label htmlFor="role1">{rolesData.role1}</label>

      <input
        className="form-input"
        type="checkbox"
        onChange={() => handleChange(rolesData.role2)}
      ></input>
      <label htmlFor="role2">{rolesData.role2}</label>

      <input
        className="form-input"
        type="checkbox"
        onChange={() => handleChange(rolesData.role3)}
      ></input>
      <label htmlFor="role3">{rolesData.role3}</label>

      <input
        className="form-input"
        type="checkbox"
        onChange={() => handleChange(rolesData.role4)}
      ></input>
      <label htmlFor="role4">{rolesData.role4}</label>

      <input
        className="form-input"
        type="checkbox"
        onChange={() => handleChange(rolesData.role5)}
      ></input>
      <label htmlFor="role5">{rolesData.role5}</label>

      <input
        className="form-input"
        type="checkbox"
        onChange={() => handleChange(rolesData.role6)}
      ></input>
      <label htmlFor="role6">{rolesData.role6}</label>
    </>
  );
};
