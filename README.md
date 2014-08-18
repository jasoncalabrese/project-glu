Project-Glu
===========

The goal's of Project-Glu was to use a small amount of glue to bring lots of existing things together to make managing my son's T1D easier and safer. Shortly after starting this I started working with several others on the Nightscout Project that combined several projects together.

Almost everything here consolidated with the community maintained [Nightscout versions](http://nightscout.github.io/)

As of this time the only thing that hasn't been migrated is my vagrant based auto deploy.

**Old deploy steps, that will be migrted to a new Nightscout repo:**

  1. clone repo `git clone https://github.com/jasoncalabrese/project-glu.git; cd project-glu`
  1. [install vagrant](http://docs.vagrantup.com/v2/installation/index.html)
  1. setup a [digital ocean](https://www.digitalocean.com/?refcode=78da7dabdaf4) account: use promo code '10TOSHIP' for 2 free months - **link includes my referral code**
  1. install https://github.com/smdahlen/vagrant-digitalocean
  1. configure dropbox: https://github.com/andreafabrizi/Dropbox-Uploader
  1. Set ENV VARS
    * use the Digital Ocean [api page](https://cloud.digitalocean.com/api_access) to find your values for: DO_CLIENT_ID, DO_API_KEY
    * `DB_CONF="/Users/<YOU>/.dropbox_uploader"` OR `DB_CONF="/home/<YOU>/.dropbox_uploader"`
  1. `vagrant up --provider=digital_ocean` and wait (I'm using a mac and have no idea if this would/could work from windows)
  1. done

**Running the `vagrant up` command above should have:**

* launched an brand new server at digitalocean, called a droplet ($5/month)
* installed node, mongo, git, nginx, etc
* cloned all the required repos
* ran the required setups: npm, bower, grunt, etc
* downloaded a backup from your dropbox (if configured)
* started everything
* installed a cron script that runs nightly to backup data to dropbox

**Once all of that is done and assuming there were no big errors you should be able to:**

_In links below replace YOUR_DROPLET_IP with the IP address of your droplet, this should be one of the last lines after running `vagrant up` or you can find it at [digital ocean](https://cloud.digitalocean.com/droplets)_

* See [NightScout running on your brand new droplet](http://YOUR_DROPLET_IP:1337)
* See [the Project-Glu login on your droplet](http://YOUR_DROPLET_IP)
* And if those work, update the Android uploader so it can start uploading to you're new droplet (more info comming later)


-[@jasoncalabrese](https://twitter.com/jasoncalabrese)
