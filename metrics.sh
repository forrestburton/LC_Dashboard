# EDIT LOCATION:
BENDER_DIR="~/Desktop"
BENDER_USER="forrest.burton"
for HOST in $(cat hosts.txt) ; do scp "metric-collector.sh" "ram.sh" "cpu.sh" "$BENDER_USER@$HOST:$BENDER_DIR" ; ssh "$BENDER_USER@$HOST" "$BENDER_DIR/metric-collector.sh"; done