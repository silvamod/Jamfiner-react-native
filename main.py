from random import randint
from aioitertools import count
from pyparsing import col


string = 'israeli mediterranean,israeli pop,mizrahi,israeli mediterranean,israeli pop,mizrahi,persian pop,latin,reggaeton,reggaeton colombiano,trap latino,big room,brostep,dance pop,dutch edm,edm,house,pop,pop dance,slap house,trance,tropical house,israeli mediterranean,latin,latin hip hop,reggaeton,trap latino,big room,dance pop,edm,pop,pop dance,pop rap,israeli mediterranean,meditation,israeli pop,jewish pop,pop rock , british country, british country, british country,channel pop ,chill pop , danish metal  , danish metal , danish metal, country rock, country rock, dark wave, dark wave, dark disco'
sep_string = string.split(',')
sep_string = ",".join(sep_string)
# print(sep_string)
count = 0
while count < 10:
    sep_string = string.split(',')
    value1 = randint(0, len(sep_string))
    value2 = randint(value1, len(sep_string))

    if(value1<value2):
        print(sep_string[value1:value2])
        count+=1

