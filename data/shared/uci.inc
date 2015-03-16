# UCI utility functions.

PKG=${PKG-`dirname ${0}`}
source "${PKG}/shared/command.inc"
source "${PKG}/shared/log.inc"


ensure_named_section() {
  name=$1
  type=$2

  # Create new WiFi network (if not there yet).
  if [ 1 -eq "$(uci show ${name} > /dev/null 2>&1; echo $?)" ]; then
    linfo "Creating section '${name}' of type '${type}'"
    run uci set "${name}=${type}"
  fi
}

uci_delete_option() {
  option=$1
  uci delete "${option}" >/dev/null 2>/dev/null
}

