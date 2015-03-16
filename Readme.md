Router configuration scripts
============================
Intalling and configuring OpenWRT to my taste is a lengthy process.
These documents and scripts should help make things simpler.


Target configuration
--------------------
Scripts and steps assume:

  * OpenWRT version: 14.07 (Barrier Breaker)
  * Router model:    TP-Link TL-WDR4300


Physical setup
--------------
???


How it works
------------
Documents describe the goal of each step but the core
tutorials are the scripts themeselves.

Some of the scripts are generated using templatise so
they need to be built first.
Run the following from the root of the repository to populate the
`dist` directory with usable scripts:

  npm install
  grunt

  scp dist.tar.gz root@192.168.1.1:
  ssh root@192.168.1.1

  gunzip dist.tar.gz
  tar -xf dist.tar
  rm dist.tar

  ./router-bootstrap/sequence


Steps
-----
   1. Install OpenWRT onto the router.
   2. Update root password and enable ssh with keys.
   3. Install pre-extroot packages.
   4. Configure router static IP address and hostname.
   5. Disable all unwanted/unsave services.
   6. Setup external USB and extroot.
   7. Install additional packages.
   8. Configure syslog.
   9. Configure DHCP and DNS.
  10. Configure SSH server.
  11. Wireless configuration.
  12. Configure OpenVPN server.
  13. Setup firewall rules.
  14. Add initial users and groups.
  15. Setup SSH key.
  16. Configure DDNS client.
  17. Initial samba share.
  18. Configure print server.
  19. Configure scan server.
  20. Setup Wake-On-Line client.
  21. Enhance shell with aliases.
  22. Zabbix agent.
  #23. CollectD configuration.


Where to start
--------------
Once the distribution is built you can run the scripts manually following the
list of steps above or you can run `dist/sequence` to do it for you.

Note that reboots are required during the process, the sequence script
will reboot when needed and it will remeber the current point of execution.
This information is stored in a `auto-conf-sequence` file.

For this reason `dist/sequence` must be run always from the same directory
and that directory needs to persist across reboots.


Reset to default OpenWRT
------------------------
???


Dealing with updates
--------------------
???

