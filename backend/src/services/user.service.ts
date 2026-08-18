import User from "../models/User";

export const updateUserProfile = async (
  userId: string,
  name: string,
  email: string
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.name = name;
  user.email = email;
  user.profileCompleted = true;

  await user.save();

  return user;
};