const Collection = require('../models/collection');
const CollectionPen = require('../models/collection_pen');

async function createOrUpdateCollection(req, res) {
  try {
    const { name, user_id, penIds, isPublic } = req.body;
    const newCollection = await Collection.create({
      name : name,
      status: isPublic ? 'public' : 'private',
      user_id: user_id,
    });

    if (penIds && penIds.length > 0) {
      await CollectionPen.bulkCreate(penIds.map(penId => ({ collection_id: newCollection.collection_id, pen_id: penId })));
    }

    return res.status(201).json({ code: 201, collection: newCollection, message: 'Tạo mới collection thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình tạo hoặc cập nhật collection', detailedError: error.message });
  }
}

async function getCollectionsByUser(req, res) {
  try {
    const userId = req.params.userId;

    const collections = await Collection.findAll({
      where: { user_id: userId },
    });

    return res.status(200).json({ code: 200, collections, message: 'Lấy danh sách collection thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy danh sách collection' });
  }
}

async function getPensInCollection(req, res) {
  try {
    const collectionId = req.params.collectionId;

    const collection = await Collection.findByPk(collectionId, {
      attributes: ['collection_id', 'name'],
    });

    if (!collection) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy collection' });
    }

    const pens = await CollectionPen.findAll({
      where: { collection_id: collectionId },
      attributes: ['pen_id'],
    });

    return res.status(200).json({
      code: 200,
      collection: {
        collection_id: collection.collection_id,
        name: collection.name,
      },
      pen_ids: pens.map(pen => pen.pen_id),
      collectionName: collection.name,
      message: 'Lấy danh sách pen trong collection thành công',
    });
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
