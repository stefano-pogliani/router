Router configuration scripts
============================
Intalling and configuring OpenWRT to my taste is a lengthy process.
These documents and scripts should help make things simpler.


Target configuration
--------------------
Scripts and steps assume:

  * OpenWRT version: 14.07 (Barrier Breaker)
  * Router model:    TP-Link TL-WDR4300


Steps
-----
   1. Install OpenWRT onto the router.
   2. Update root password and enable ssh with keys.
   3. Install usb support*
   4. Setup external USB and extroot.
   5. Configure syslog.
   6. Setup firewall rules.
   7. Configure network.
   8. Configure DHCP and network.
   9. Install additional packages.
  10. Add initial users and groups.
  11. Wireless configuration.
  12. Configure DDNS client.
  13. Configure OpenVPN server.
  14. Initial samba share.
  15. Enable services at boot.
  16. Configure LEDs.
  17. Configure buttons*
  18. Configure printer and scanner.
  19. Setup Wake-On-Line client.


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


Where to start
--------------
Once the distribution is built you can run the scripts manually following the
list of steps above or you can run `dist/sequence` to do it for you.

Note that reboots are required during the process, the sequence script
will reboot when needed and it will remeber the current point of execution.
This information is stored in a `auto-conf-sequence` file.

For this reason `dist/sequence` must be run always from the same directory
and that directory needs to persist across reboots.

