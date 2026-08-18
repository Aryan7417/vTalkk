import User from "../models/User";

// Update user profile



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


// Get all users except current user



export const getAllUsers = async (currentUserId: string) => {
  const users = await User.find({
    _id: { $ne: currentUserId },
    isVerified: true,
    profileCompleted: true,

  }).select(
    "_id phone name email isVerified profileCompleted"
  );

  return users;
};