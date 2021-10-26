from zeep import Client
import sys
url = 'https://api2.onnorokomsms.com/sendsms.asmx?WSDL'
client = Client(url)
userName = '01771794998'
password = 'e4855a4a8a'
recipientNumber = str(sys.argv[1])
smsText = str(sys.argv[2])
smsType = 'TEXT'
maskName = ''
campaignName = ''

client.service.OneToOne(userName,password,recipientNumber,smsText,smsType,maskName,campaignName)

print('phone ',str(sys.argv[1]))

# print('text ',str(sys.argv[2]))