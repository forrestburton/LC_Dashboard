# EDIT LOCATION:
BENDER_DIR="~/Desktop"  # directory on the bender which the shell scripts will reside
BENDER_USER="forrest.burton"  # Username to login into bender
for HOST in $(cat hosts.txt) ; do scp "metric-collector.sh" "ram.sh" "cpu.sh" "$BENDER_USER@$HOST:$BENDER_DIR" ; ssh "$BENDER_USER@$HOST" "$BENDER_DIR/metric-collector.sh"; done