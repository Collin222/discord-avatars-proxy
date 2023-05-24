import request from 'request';
import cache from '../../../../cache';

export default async function handler(req, res) {
	if (!req.query.userId) throw new Error('User ID is required');

	if (cache.getAvatarUrl(req.query.userId)) {
		console.log('Received avatar url from cache');
		request(cache.getAvatarUrl(req.query.userId)).pipe(res);
		return;
	}

	const r = await fetch(`https://discord.com/api/users/${req.query.userId}`, {
		headers: {
			Authorization: `Bot ${process.env.BOT_TOKEN}`,
		},
	});
	if (r.status !== 200) return res.status(500).send();
	const data = await r.json();

	const url = data.avatar
		? `https://cdn.discordapp.com/avatars/${req.query.userId}/${data.avatar}`
		: `https://cdn.discordapp.com/embed/avatars/${data.discriminator % 5}.png`;

	cache.setAvatarUrl(req.query.userId, url);

	request(url).pipe(res);
}
