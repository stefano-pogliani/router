# Include file to share logging related functions.

# Logs an info level event.
linfo() {
  echo "[I] $*"
}

# Logs an error level event.
lerror() {
  echo "[E] $*" >&2
}

# Logs a warning level event.
lwarn() {
  echo "[W] $*" >&2
}

