// collectionsController.js

const Collection = require('../models/collection');
const CollectionPen = require('../models/collection_pen');
const CollectionUser = require('../models/collection_user'); // Import collection_user model

async function createOrUpdateCollection(req, res) {
  try {
    const { collectionId, name, user_id, penIds } = req.body;

    if (collectionId) {
      const [updatedRows] = await Collection.update({ name }, { where: { collection_id: collectionId } });

      if (updatedRows === 0) {
        return res.status(404).json({ code: 404, message: 'Không tìm thấy collection để cập nhật' });
      }

      if (penIds && penIds.length > 0) {
        await CollectionPen.destroy({ where: { collection_id: collectionId } });
        await CollectionPen.bulkCreate(penIds.map(penId => ({ collection_id: collectionId, pen_id: penId })));
      }

      const updatedCollection = await Collection.findByPk(collectionId);
      
      // Update the collection_user table
      await CollectionUser.update({ user_id }, { where: { collection_id: collectionId } });

      return res.status(200).json({ code: 200, collection: updatedCollection, message: 'Cập nhật collection thành công' });
    } else {
      const newCollection = await Collection.create({ name, user_id });

      if (penIds && penIds.length > 0) {
        await CollectionPen.bulkCreate(penIds.map(penId => ({ collection_id: newCollection.collection_id, pen_id: penId })));
      }

      // Add a new entry to the collection_user table for the new collection
      await CollectionUser.create({ collection_id: newCollection.collection_id, user_id });

      return res.status(201).json({ code: 201, collection: newCollection, message: 'Tạo mới collection thành công' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình tạo hoặc cập nhật collection' });
  }
}

async function getCollectionsByUser(req, res) {
  try {
    const userId = req.params.userId;

    const collections = await Collection.findAll({ where: { user_id: userId } });

    return res.status(200).json({ code: 200, collections, message: 'Lấy danh sách collection thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy danh sách collection' });
  }
}

async function getPensInCollection(req, res) {
  try {
    const collectionId = req.params.collectionId;

    const collection = await Collection.findByPk(collectionId);

    if (!collection) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy collection' });
    }

    const pens = await CollectionPen.findAll({ where: { collection_id: collectionId } });

    return res.status(200).json({ code: 200, collection, pens, message: 'Lấy danh sách pen trong collection thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy danh sách pen trong collection' });
  }
}

module.exports = {
  createOrUpdateCollection,
  getCollectionsByUser,
  getPensInCollection,
};
