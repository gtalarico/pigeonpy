![PigeonPy Logo](https://github.com/gtalarico/pigeonpy/blob/master/pigeonpy/static/img/src/logo_logo.png)
> Abandoned



I started this in mid 2017 as a way to learn how the Forge API worked, and also to try to learn Angular.

It uses Flask as a backend to handle authentication and routing to interact with Autodesk's Forge API, and small Angular client application.

I have since abondoned this project but wanted to share it here as some of it could be useful to anyone trying to use Forge. 

While the front end stuff is unfinished and brittle, I think there are some good Flask patterns 
to handle (Forge) Oauth for both Applicationa and USer.

The Demo is still alive on [www.pigeonpy.com](http://www.pigeonpy.com)

### What Works
* Forge Application Oauth
* Forge User Oauth
* Forge Bucket Management
* Forge User Profile Info
* Forge Data Mgt Api Access to Hub, Folder, and Items

### What Doesn't Work
* Front End Angular Application is messy and unfisnished
* Model Webviewer user to work but stopped working


If you want to run this, you will need the following enviroment variables set:

```
set FLASK_APP=pigeonpy
set FLASK_CONFIG=Development
set SECRET_KEY=SomeSuperSecretKey
set ASSETS_DEBUG=0  # Optional

set FORGE_CLIENT_ID={YourForgeClientId}
set FORGE_CLIENT_SECRET={YourForgeClientSecret}
set FORGE_CALLBACK={http://localhost:5000/api/callback} # For Local Development
set FORGE_ADMIN={EmailForUserToGetBucketManagementAccess}
```

MIT License

Gui Talarico
