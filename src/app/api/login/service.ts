import User from "@/sequelize/models/user";
import { comparePassword } from "@/libs/encryptPass";
import { saveCookies } from "@/libs/cookies";

export const login: any = async (request: any) => {
  try {
    let { userId, password } = request;

    let user: any = await User.findOne({ where: { email: userId } });
    if (!user) throw new Error("User not found");

    const checkPass = await comparePassword(password, user.dataValues.password);
    if (!checkPass) throw new Error("Password wrong");

    await saveCookies("session", user.dataValues);
    return user.dataValues;
  } catch (error) {
    console.log(error);
    
    return false;
  }
};
