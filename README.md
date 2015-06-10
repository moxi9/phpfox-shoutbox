# PHPfox v4 Shoutbox App

This is a small app developed for developers to show how to connect a PHPfox community to a NodeJS app, which in this case uses
socket.io to create a shoutbox on a clients index page.

## Setup

On your PHPfox server. Run...
```
cd /PF.Site/Apps/
```

```
mkdir -p shoutbox/shoutbox
```

```
cd shoutbox/shoutbox
```

```
git clone https://github.com/moxi9/phpfox-shoutbox.git .
```

```
touch app.lock
```

```
cd nodejs
```

```
npm install
```

```
node index.js
```

Now that we have setup our app and nodejs, we need to provide the NodeJS url in the PHPfox AdminCP. From your AdminCP,
go to **Apps** and click on **Shoutbox**. You will then find a page where you can enter your **NodeJS URL**. By default,
we setup the port to **3000**. So enter **http://localhost:3000** if you are developing locally. For clients, this is where
 they would enter your NodeJS server.

