own=$1
rm ram.txt
ps hax -o rss,user | awk '{a[$2]+=$1;}END{for(i in a)print i" "int(a[i]/1024+0.5);}' | sort -rnk2 > ram.txt
grep -w $own ram.txt | awk '{print $2/1000}'
