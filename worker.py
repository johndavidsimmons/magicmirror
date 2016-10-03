# _*_ coding:utf-8 _*_
import requests
import json
import datetime

r = requests.get('https://www.reddit.com/r/news/hot.json?limit=1', headers = {'User-agent': 'john magic mirror'})
response_data = json.loads(r.text)

if r.status_code == 200:
	for r in response_data['data']['children']:
		try:
			headline = str(r['data']['title'])
			# headlines.append(str(r['data']['title']))
		except UnicodeEncodeError:
			headline = str(r['data']['title'].encode('ascii', 'ignore'))
			# headlines.append(str(r['data']['title'].encode('ascii', 'ignore')))
else:
	print response_data
	headline = None


t = requests.get("https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='ferndale, mi')&format=json")

weather_data = json.loads(t.text)

temp = weather_data['query']['results']['channel']['item']['condition']['temp']
high = weather_data['query']['results']['channel']['item']['forecast'][0]['high']
low = weather_data['query']['results']['channel']['item']['forecast'][0]['low']
code = weather_data['query']['results']['channel']['item']['forecast'][0]['code']
sunrise = weather_data['query']['results']['channel']['astronomy']['sunrise']
sunset = weather_data['query']['results']['channel']['astronomy']['sunset']

url = 'https://sheetsu.com/apis/v1.0/901b3b02/id/1'

# Data to be posted 
data = {'id':1,'headlines': headline, 'temp':temp, 'high':high, 'low':low, 'weather_code':code, 'sunrise':sunrise, 'sunset':sunset, 'time': str(datetime.datetime.now())}


p = requests.put(url, data)


