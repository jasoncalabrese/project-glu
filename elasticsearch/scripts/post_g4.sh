for i in {101..250}
do
 echo "value: $i"
curl -XPOST 'http://localhost:9209/test/g4/' -d '{
  "timestamp": "2014-03-1T7:22",
  "value": '${i}',
  "trend": "FortyFiveUp"
}'
done