import json
import pprint

import numpy

with open('區塊坑洞挖掘與施工紀錄_100公尺.json', 'r+') as file:
    raw_file = file.readlines()
    raw_file[0] = raw_file[0].replace('\'', '\"')
    json_file = json.loads(raw_file[0])
    pass

pprint.pprint(json_file['data'][9]['channel_roadwork'])
a = numpy.array(json_file['data'][9]['channel_roadwork'])
print(a.max())

with open('done.json', 'w+') as file:
    raw_file = json.dumps(json_file['data'][9]['channel_roadwork'])
    file.writelines(raw_file)
pass
