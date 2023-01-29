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

export const InterestsRoles = (rolesData: Roles) => {
  return (
    <>
      <p className="sign-up-title">{rolesData.title}</p>
      <p className="sign-up-description">{rolesData.description}</p>

      {/* Roles */}
      <input className="form-input" type="checkbox" name="role1"></input>
      <label htmlFor="role1">{rolesData.role1}</label>

      <input className="form-input" type="checkbox" name="role2"></input>
      <label htmlFor="role2">{rolesData.role2}</label>

      <input className="form-input" type="checkbox" name="role3"></input>
      <label htmlFor="role3">{rolesData.role3}</label>

      <input className="form-input" type="checkbox" name="role4"></input>
      <label htmlFor="role4">{rolesData.role4}</label>

      <input className="form-input" type="checkbox" name="role5"></input>
      <label htmlFor="role5">{rolesData.role5}</label>

      <input className="form-input" type="checkbox" name="role6"></input>
      <label htmlFor="role6">{rolesData.role6}</label>
    </>
  );
};
