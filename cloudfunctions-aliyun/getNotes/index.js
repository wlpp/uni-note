'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const res = await db.collection('notes').where(event).get();
	return res;
};
