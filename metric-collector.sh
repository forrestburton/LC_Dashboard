PROJECT_LOCATION="forrestburton@192.168.1.53:~/Desktop/Dashboard/my-app/src/graphs"  # location of metrics-{bender_hostname}.csv file on the current device
own=$(id -nu)
machine=$(hostname)

# generates a png graph from csv data. not used in Dashboard but could possibly be useful 
function plotGraph() {
  # bring cursor to next line after interrupt
  echo

  # plot graphs if there is a data file
  if [ -f $csv_filename ]; then
    echo "Plotting graphs..."
    gnuplot <<- EOF
      # Output to png with a font size of 10, using pngcairo for anti-aliasing
      set term pngcairo size 1024,800 noenhanced font "Helvetica,10"
      # Set border color around the graph
      set border ls 50 lt rgb "#939393"
      # Hide left and right vertical borders
      set border 16 lw 0
      set border 64 lw 0
      # Set tic color
      set tics nomirror textcolor rgb "#939393"
      # Set horizontal lines on the ytics
      set grid ytics lt 1 lc rgb "#d8d8d8" lw 2
      # Rotate x axis lables
      set xtics rotate
      # Set graph size relative to the canvas
      set size 1,0.85
      # Set separator to comma
      set datafile separator ","
      # Move legend to the bottom
      set key bmargin center box lt rgb "#d8d8d8" horizontal
      # Plot graph,
      # xticlabels(1) - first column as x tic labels
      # "with lines" - line graph
      # "smooth unique"
      # "lw 2" - line width
      # "lt rgb " - line style color
      # "t " - legend labels
      
      # CPU Usage by User
      set output "./src/graphs/cpu.png"
      set title "CPU Usage by User"
      # X-axis
      set xlabel "Time ($time second intervals)"
      # Y-axis
      set ylabel "CPU Usage (percentage)"
      plot "$csv_filename" using 2:xticlabels(1) with lines smooth unique lw 2 lt rgb "#ed8004" t "$own"
      
      # RAM Usage by User
      set output "./src/graphs/ram.png"
      # X-axis
      set xlabel "Time ($time second intervals)"
      # Y-axis
      set ylabel "RAM Usage(GB)"
      set title "RAM Usage by User"
      plot "$csv_filename" using 3:xticlabels(1) with lines smooth unique lw 2 lt rgb "#ed8004" t "$own"
      
       # All together
       set output "./src/graphs/all-metrices.png"
       set title "All Metrics"
       plot "$csv_filename" using 2:xticlabels(1) with lines smooth unique lw 2 lt rgb "#4848d6" t "CPU Usage %",\
        "$csv_filename" using 3:xticlabels(1) with lines smooth unique lw 2 lt rgb "#b40000" t "RAM Usage %"
     
EOF
  fi

  echo "Done!"
  exit 0
}

#trap "plotGraph" SIGINT SIGTERM SIGKILL

csv_filename="metrics-${machine}.csv"
people=$(users)

#echo "Writing data to CSV file $csv_filename..."
rm $csv_filename
touch $csv_filename
echo "User,Time,CPU,RAM" >> $csv_filename

numDataPoints=10
timeInterval=1
for user in $people
do 
    #echo "$user" >> $csv_filename
    for i in $(seq 1 "$numDataPoints") 
    do
        timestamp=$(date +"%b %d %H:%M:%S")
        cpu=$(~/Desktop/cpu.sh $user) 
        ram=$(~/Desktop/ram.sh $user)
        echo "$user,$timestamp,$cpu,$ram" >> $csv_filename
        sleep $timeInterval
    done
done

scp metrics-${machine}.csv $PROJECT_LOCATION

#plotGraph