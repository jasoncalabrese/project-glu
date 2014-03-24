Project-Glu
===========

The goal of Project-Glu is to use a small amount of glue to bring lots of existing things together to make managing my son's T1D easier and safer. The intial focus is on data from the Dexcom G4, but later I'd like to include carbs, insulin and activity data.

current status
--------------

I have a [forked](https://github.com/jasoncalabrese/original-android-cgm) version of [@jcostik](https://twitter.com/jcostik)'s [original-android-app](https://github.com/hackingtype1/original-android-cgm) running on a Moto G and have it posting simple json to [this](https://github.com/jasoncalabrese/project-glu) node.js/express.js/angular.js/mongo app, I'm planing to replace this app with a localy running instance of the [tidepool platform](http://tidepool.org/platform/).

I have the android app posting to the web app running locally and at AWS.

I also have a [forked](https://github.com/jasoncalabrese/cgm-remote-monitor) version of [NightScout](https://github.com/rnpenguin/cgm-remote-monitor) running at AWS using the same mongo db as the basic web-app. 

next steps
----------

Tracking ideas/progress on [trello](https://trello.com/b/k8dwYmAI/project-glu)

-[@jasoncalabrese](https://twitter.com/jasoncalabrese)
