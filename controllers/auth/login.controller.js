import loginCredentials from "../../services/auth/login.service.js";
import getToken from "../../utils/authJwt.js";

const login = async (req, res, next) => {
  try {
    const isPatient = await loginCredentials.patientLogin(req.body);
    const isStaff = await loginCredentials.staffLogin(req.body);
    const isHopital = await loginCredentials.hospitaLogin(req.body);
    // Check User
    let userType = "";
    if (isPatient) userType = "Patient";
    else if (isStaff) userType = "Staff";
    else if (isHopital) userType = "Hospital";

    switch (userType) {
      case "Patient":
        res.status(200).json({
          message: `Welcome Back ${isPatient.full_name} `,
          token: getToken({id : isPatient._id}),
          userType,
        });
        break;
      case "Staff":
        res.status(200).json({
          message: `Welcome Back ${isStaff.full_name} `,
          token: getToken({id : isStaff._id}),
          userType,
        });
        break;
      case "Hospital":
        res.status(200).json({
          message: `Welcome Back ${isHopital.name} `,
          token: getToken({id : isHopital._id}),
          userType,
        });
        break;
      default:
        res.status(401).json({
          message: "Invalid Email",
        });
    }
  } catch (error) {
    next(error);
  }
};
export default login;
