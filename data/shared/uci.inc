# UCI utility functions.

PKG=${PKG-`dirname ${0}`}
source "${PKG}/shared/command.inc"
source "${PKG}/shared/log.inc"


ensure_named_section() {
  name=$1
  type=$2

  # Create new section (if not there yet).
  if [ 1 -eq "$(uci show ${name} > /dev/null 2>&1; echo $?)" ]; then
    linfo "Creating section '${name}' of type '${type}'"
    run uci set "${name}=${type}"
  fi
}

ensure_unamed_section() {
  config=$1
  type=$2

  # Check if a section of that type exists.
  if [ 1 -eq "$(uci show "${config}.@${type}[0]" > /dev/null 2>&1; echo $?)" ]; then
    linfo "Creating anonymous section of type ${type} for config ${config}"
    run uci add "${config}" "${type}"
  fi
}

uci_exists() {
  name=$1
  uci get "${name}" > /dev/null 2>&1
}

uci_delete_anon_sections() {
  name=$1
  type=$2

  # List anon sections to delete.
  # The reverse order is needed because section
  # numbers will change as sections are deleted.
  anon_sections=$(
    uci show "${name}" | egrep -o "@${type}\[.*\]" | sort -r | uniq
  )

  if [ -n "${anon_sections}" ]; then
    for section in ${anon_sections}; do
      linfo "Deleting anonymous ${name} section ${section}"
      run uci delete "${name}.${section}"
    done
  fi
}

uci_delete_option() {
  option=$1
  if uci_exists "${option}"; then
    run uci delete "${option}" >/dev/null 2>/dev/null
  fi
}

uci_add_list_with_spaces() {
  key=$1
  value=$2

  _uci_add_list_with_space_closure() {
    uci add_list "${key}=${value}"
  }
  run _uci_add_list_with_space_closure
}

uci_set_with_spaces() {
  key=$1
  value=$2

  _uci_set_with_space_closure() {
    uci set "${key}=${value}"
  }
  run _uci_set_with_space_closure
}

