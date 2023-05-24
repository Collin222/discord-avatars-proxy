import request from 'request';
import cache from '../../../../cache';

const getSearchFromQuery = query => {
	let search = '';
	for (const x of Object.entries(query)) {
		search += `&${x[0]}=${x[1]}`;
	}
	if (search.startsWith('&')) search = search.substring(1);
	return search;
};

export default async function handler(req, res) {
	if (!req.query.userId) throw new Error('User ID is required');

	const searchParams = { ...req.query };
	delete searchParams.userId;
	const search = getSearchFromQuery(searchParams);

	if (cache.getAvatarUrl(req.query.userId)) {
		request(cache.getAvatarUrl(req.query.userId) + `?${search}`).pipe(res);
		return;
	}

	const r = await fetch(`https://discord.com/api/users/${req.query.userId}`, {
		headers: {
			Authorization: `Bot ${process.env.BOT_TOKEN}`,
		},
	});
	if (r.status !== 200) return res.status(500).send();
	const data = await r.json();

	let url = data.avatar
		? `https://cdn.discordapp.com/avatars/${req.query.userId}/${data.avatar}`
		: `https://cdn.discordapp.com/embed/avatars/${data.discriminator % 5}.png`;

	cache.setAvatarUrl(req.query.userId, url);

	url += `?${search}`;

	request(url).pipe(res);
}
