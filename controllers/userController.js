import User from "../models/userModel.js";

// register business logic
const register = async (req, res) => {
  try {
    // lets get the body from the request
    const { name, email, bio, password } = req.body;

    // check if required user details are available
    if (!name || !email || !bio || !password) {
      res.status(400).json({
        success: false,
        message: "Required fields needed",
      });
      return;
    }

    const userexists = await User.findOne({ email: email }).exec();

    if (userexists) {
      res.status(409).json({
        success: false,
        message: "user already exists",
      });
      return;
    }

    console.log("the user = ", userexists);

    await User.create(req.body);

    res.status(200).json({
      success: true,
      message: "The login endpoint hit..",
      // body: body,
    });
  } catch (error) {
    console.log("the error => ", error);
  }
};

export { register };
