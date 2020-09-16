'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const res = await db.collection('mkdirs').add(event)
	return {
		code:200,
		msg:'添加成功'
	}
};
