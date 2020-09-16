'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let res = await db.collection('notes').where({
		mkdirId: event._id
	}).get()
	await res.data.map(item => {
		db.collection('notes').doc(item._id).remove()
	})
	await db.collection('mkdirs').doc(event._id).remove()
	return {
		code: 200,
		msg: '删除成功'
	}
};
