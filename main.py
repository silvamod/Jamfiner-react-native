from random import randint
from aioitertools import count
from pyparsing import col


string = 'israeli pop,israeli pop,persian pop,latin,reggaeton,reggaeton colombiano,trap latino,big room,brostep,dance pop,dutch edm,edm,house,pop,pop dance,slap house,trance,latin,latin hip hop,reggaeton,trap latino,big room,dance pop,edm,pop,pop dance,pop rap,israeli pop,jewish pop,pop rock,british country,british country,british country,channel pop,chill pop,danish metal,danish metal,danish metal,country rock,country rock,dark wave,dark wave,dark disco'
sep_string = string.split(',')
sep_string = ",".join(sep_string)
# print(sep_string)
count = 0
sep_string = string.split(',')
for el in sep_string:
    el = el.strip()

while count < 30:
    value1 = randint(0, len(sep_string))
    value2 = randint(value1, len(sep_string))

    if(value1<value2):
        print(count,".","-----------------------------------")
        print(sep_string[value1:value2])
        count+=1

