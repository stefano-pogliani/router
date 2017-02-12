Router configuration scripts
============================
Intalling and configuring OpenWRT to my taste is a lengthy process.
These documents and scripts should help make things simpler.


Target configuration
--------------------
Scripts and steps assume:

  * OpenWRT version: 15.05 (Barrier Breaker)
  * Router model:    TP-Link TL-WDR4300


One time setup
--------------

  1. Connect router to an internet enabled network.
  2. Connect a device to the router through Ethernet.
  3. Connect power.
  4. Upgrade firmware to latest version.
  5. Upgrade firmware to OpenWRT.


How it works
------------
This set of scripts is meant to configure an OpenWRT router
for the network requirements I have.
The scripts try to be idempotent (no matter how many time
a script is run it will result in the same configuration)
but not all of them are.
**DO NOT ASSUME IDEMPOTENCE**

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
To achieve this the device must be rebooted in failsafe mode:

  1) Power of the device
  2) Repeatedly press the reset button on the back as the device boots.
  3) Telnet in with the default IP 192.168.1.1

Once in the configuration on the device can be reset to stock OpenWRT
through the `firstboot` command.
Once the command is complete the device can be rebooted into a clean install.

Keep in mind that the USB device will not be used to boot but it
will still have the previous data so it will need to be cleared too.


Dealing with updates
--------------------
Updates should be made to this script first and to the device after.
Updates should also never be made through the web interface.

Remember that most scripts are idempotent and those that are not
can be refactored to be.
Maybe an update can be done by running the individual step?

If the changes require a lot of manual work to be performed
a reset and reinstall may be a good option.
