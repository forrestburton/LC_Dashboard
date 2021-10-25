own=$1

# print own CPU usage after all spawned processes completed
top -b -n 1 -u "$own" | awk -v user=$own 'NR>7 { sum += $9; } END { print sum; }'