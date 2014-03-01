curl -XPUT 'http://localhost:9209/test/' -d '
index :
  number_of_shards : 3
  number_of_replicas : 0
mappings:
  g4:
    properties:
      timestamp:
        type: date
        format: date_time_no_millis
      value:
        type: integer
      trend:
        type: string
'
