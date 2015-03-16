# Include file to share command/process related functions.

PKG=${PKG-`dirname ${0}`}
source "${PKG}/shared/log.inc"


# Runs a function while checking the return code.
# Args:
#  $1 The command to run.
#  $* The parameters to pass to the command.
run() {
  command=$1
  shift

  ${command} $*
  code=$?

  if [ 0 -ne ${code} ]; then
    lerror "Faied to run '${command} $*'"
    exit ${code}
  fi
}

