Project-Glu
===========

The goal of Project-Glu is to use a small amount of glue to bring lots of existing things together to make managing my son's T1D easier and safer. The intial focus is on data from the Dexcom G4, but later I'd like to include carbs, insulin, and activity data.

current status
--------------

I have a [forked](https://github.com/jasoncalabrese/original-android-cgm) version of [@jcostik](https://twitter.com/jcostik)'s [original-android-app](https://github.com/hackingtype1/original-android-cgm) running on a Moto G and have it posting simple json to [this](https://github.com/jasoncalabrese/project-glu) web app, I'm planing to replace this with a locally running instance of the [tidepool platform](http://tidepool.org/platform/).

I also have a [forked](https://github.com/jasoncalabrese/cgm-remote-monitor) version of [NightScout](https://github.com/rnpenguin/cgm-remote-monitor) that uses the same mongo db as the basic web-app
and a [forked](https://github.com/jasoncalabrese/cgm-pebble) version of [cgm-pebble](https://github.com/hackingtype1/cgm-pebble) that connects to the project-glu endpoint to display the current BG value on a Pebble watch.

For quick, easy, and repeatable deploys I'm using vagrant.
To give it a try follow these steps:

  1. clone repo `git clone https://github.com/jasoncalabrese/project-glu.git; cd project-glu`
  1. [install vagrant](http://docs.vagrantup.com/v2/installation/index.html)
  1. setup a [digital ocean](https://www.digitalocean.com/?refcode=78da7dabdaf4) account: use promo code 'DOIT10' for 2 free months - **link includes my referral code**
  1. install https://github.com/smdahlen/vagrant-digitalocean
  1. configure dropbox: https://github.com/andreafabrizi/Dropbox-Uploader
  1. Set ENV VARS
    * use the Digital Ocean [api page](https://cloud.digitalocean.com/api_access) to find your values for: DO_CLIENT_ID, DO_API_KEY
    * `DB_CONF="/Users/<YOU>/.dropbox_uploader"` OR `DB_CONF="/home/<YOU>/.dropbox_uploader"`
  1. `vagrant up --provider=digital_ocean` and wait (I'm using a mac and have no idea if this would/could work from windows)
  1. done

Running the `vagrant up` command above will:

* launch an brand new server at digitalocean ($5/month - everyone would setup their own account)
* install node, mongo, git, nginx, etc
* clone all the required repos
* run the required setups: npm, bower, grunt, etc
* download backup from dropbox (personal account)
* start everything
* install a cron script that runs nightly to backup data to dropbox




next steps
----------

Tracking ideas/progress on [trello](https://trello.com/b/k8dwYmAI/project-glu)

-[@jasoncalabrese](https://twitter.com/jasoncalabrese)
