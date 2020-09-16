'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const res = await db.collection('notes').where({
		mkdirId: event.mkdirId
	}).get()
	if(res.data.length<100){
		await db.collection('notes').add(event)
		await db.collection('mkdirs').doc(event.mkdirId).update({
			qty:dbCmd.inc(1)
		})
		return {
			code:200,
			msg:'添加成功'
		}
	}else{
		return {
			code:200,
			msg:'添加失败，笔记数量超过最大值'
		}
	}
	
};
