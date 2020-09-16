'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const res = await db.collection('notes').doc(event.id).update({
		title:event.title,
		content:event.content,
		dateTime:event.dateTime,
	})
	return {
		code:200,
		msg:'更新成功'
	}
};
