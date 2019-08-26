export const QUERY_TEMPLATE_PM = (sensor_id, {time_range, group_by}) => (`SELECT mean("pm1") AS "promedio_pm1", mean("pm10") AS "promedio_pm10", mean("pm25") AS "promedio_pm2.5" FROM ${sensor_id.map( s => `"aqa"."autogen"."${s}"`).toString()} WHERE time > ${time_range} GROUP BY time(${group_by}) FILL(null)`)


export const QUERY_TEMPLATE_LOCATION = (sensor_id, {time_range, group_by}) => (`SELECT mean("lat") AS "mean_lat", mean("lng") AS "mean_lng", mean("course") AS "mean_course", mean("altitude") AS "mean_altitude", mean("speed") AS "mean_speed" FROM ${sensor_id.map( s => `"aqa"."autogen"."${s}"`).toString()} WHERE time > '2018-01-01T05:00:00.000Z' AND time < '2018-08-16T21:18:08.506Z' GROUP BY time(1d) FILL(none)`)

export const TIME_RANGE = {
  day: {time_range: 'now() - 1d', group_by: '1m'},
  week: {time_range: 'now() - 1w', group_by: '1h'},
  month: {time_range: 'now() - 4w', group_by: '5h'},
  year: {time_range: 'now() - 52w', group_by: '1d'}
}
