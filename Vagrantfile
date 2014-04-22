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
  config.vm.provision "file", source: "vagrant/clone-and-setup-repos.sh", destination: "/home/glu/clone-and-setup-repos.sh"
  config.vm.provision "shell", path: "vagrant/vagrant-init.sh", privileged: false, keep_color: true

end
