A server to return a Discord avatar given a user ID. This saves the time and complexity of having to fetch user's, cache results, and return avatars yourself.

The project is hosted at https://discord-avatars-proxy.vercel.app/. You can host your own version on Vercel or any other deployment platform. You must provide the `BOT_TOKEN` environment variable.

# How to Use
This guide will use the domain hosted at https://discord-avatars-proxy.vercel.app/. If you're hosting your own version, replace it with your own domain.

### Get an Avatar with a User ID
- https://discord-avatars-proxy.vercel.app/api/avatar/:userId

If the user ID was 123, -> https://discord-avatars-proxy.vercel.app/api/avatar/123
