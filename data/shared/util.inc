# Miscellaneous utility functions.

PKG=${PKG-`dirname ${0}`}
source "${PKG}/shared/command.inc"

# Ensures that a file contains a line
ensure_line_in_file() {
  file="$1"
  line="$*"

  if [ ! -f "${file}" ]; then
    run touch "${file}"
  fi

  check_count=$(grep -c "${line}" "${file}")
  if [ 0 -eq "${check_count}" ]; then
    run echo "${line}" >> "${file}"
  fi
}

simple_replace() {
  source=$1
  find=$2
  replace=$3

  run cat "${source}" | sed "s/${find}/${replace}/" > "${source}.tmp"
  run rm "${source}"
  run mv "${source}.tmp" "${source}"
}

