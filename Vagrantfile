Vagrant.configure('2') do |config|

  #see https://github.com/smdahlen/vagrant-digitalocean for plugin setup info

  config.vm.provider :digital_ocean do |provider, override|
    override.ssh.private_key_path = '~/.ssh/id_dsa'
    override.vm.box = 'digital_ocean'
    override.vm.box_url = "https://github.com/smdahlen/vagrant-digitalocean/raw/master/box/digital_ocean.box"

    provider.client_id = ENV['DO_CLIENT_ID']
    provider.api_key = ENV['DO_API_KEY']
    provider.image = 'Ubuntu 14.04 x64'
    provider.region = 'San Francisco 1'
  end

  config.ssh.username = 'glu'
  config.vm.synced_folder '.', '/vagrant', :disabled => true

  #upload nginx site conf to point port 80 to project-glu
  config.vm.provision "file", source: "server-config/project-glu-site", destination: "/etc/nginx/sites-enabled/project-glu-site"

  #upload conf files that will be used to start the node apps as upstart services
  config.vm.provision "file", source: "server-config/project-glu.conf", destination: "/etc/init/project-glu.conf"
  config.vm.provision "file", source: "server-config/nightscout.conf", destination: "/etc/init/nightscout.conf"

  #upload script that will clone and setup all the required repos
  config.vm.provision "file", source: "server-config/clone-and-setup-repos.sh", destination: "/home/glu/clone-and-setup-repos.sh"

  #upload config file that will configure the Dropbox uploader, ENV must be set to local file path (keep it private!)
  config.vm.provision "file", source: "#{ENV['DB_CONF']}", destination: "/home/glu/.dropbox_uploader"

  #run the main vagrant-init.sh script, will do global installs as root then run clone-and-setup-repos.sh as the glu user
  config.vm.provision "shell", path: "server-config/vagrant-init.sh", privileged: false, keep_color: true

end
