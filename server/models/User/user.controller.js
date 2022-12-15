import User from './user.model.js';

/**
 * route - GET /user/:id
 */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * route - GET /user/:id/friends
 */
const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    )

    const formattedFriends = friends
      .map(({ _id, firstName, lastName, location, occupation, picturePath }) => {
        return { _id, firstName, lastName, location, occupation, picturePath };
      })

    res.status(200).json({ formattedFriends })

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * route - UPDATE /user/:id/:friendId
 */
const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
 
    // FETCH FRIEND 
    const friend = await User.findById(friendId);

    // LOGIC TO REMOVE AND ADD FRIEND 
    if (user.friends.includes(friendId)) {
      // REMOVE FRIENDS 
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = user.friends.filter((id) => id !== id);
    } else {
      // ADD FRIENDS 
      user.friends.push(friendId);
      friend.friends.push(id)
    }

    // SAVE USERS 
    await user.save()
    await friend.save()

    // FETCH ALL USER FRIENDS AND FORMAT RESULT
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    )

    const formattedFriends = friends
      .map(({ _id, firstName, lastName, location, occupation, picturePath }) => {
        return { _id, firstName, lastName, location, occupation, picturePath };
      })

    res.status(200).json(formattedFriends);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const UserController = {
  getUser,
  getUserFriends,
  addRemoveFriend
}