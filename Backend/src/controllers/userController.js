const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const Follow = require('../models/followTable');
const User = require('../models/user');

async function getInfoUser(req, res) {
  try {
    const user_id = req.query.user_id;

    const user = await User.findByPk(user_id, {
      attributes: ['user_id', 'user_name', 'full_name', 'avatar_path'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get followers and following counts
    const followers_count = await Follow.count({ where: { user_id_2: user_id } });
    const following_count = await Follow.count({ where: { user_id_1: user_id } });

    res.json({
      user_id: user.user_id,
      user_name: user.user_name,
      full_name: user.full_name,
      avatar_path: user.avatar_path,
      followers_count,
      following_count,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserByID(user_id) {
  try {
    const getOneUser = await User.findOne({
      where: { user_id: user_id },
    });

    if (getOneUser) {
      return getOneUser.user_id;
    } else {
      return 1;
    }
  } catch (error) {
    console.error('Get user by id error:', error);
    throw error;
  }
}

async function getAllUserExclude(arrUserID) {
  try {
    let users = await User.findAll({
      where: {
        user_id: {
          [Sequelize.Op.notIn]: arrUserID
        }
      },
      attributes: ['user_id', 'user_name', 'avatar_path']
    });

    return users;
  } catch (error) {
    console.error('Get all users excluding some IDs error:', error);
    throw error;
  }
}

async function getNotFollow(req, res) {
  const user_id = req.params.id;

  try {
    const getOneUser = await getUserByID(user_id);
    const getFollowUsers = await getFollowByUserID(getOneUser);
    const getAllNotFollow = await getAllUserExclude(getFollowUsers);
    const uniqueNotFollow = [...new Set(getAllNotFollow)];

    res.json(uniqueNotFollow);
  } catch (error) {
    console.error('Error fetching pen ids:', error);
    throw error;
  }
}

module.exports = {
  getNotFollow,
  getInfoUser
};
