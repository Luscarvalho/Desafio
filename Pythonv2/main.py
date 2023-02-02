import requests

data = {
    'To': '+5592992646326',
    'MessagingServiceSid': 'MGdcc9a3f284f0cdde3c16fee5b6ed95c4',
    'Body': 'Teste',
}

twilio_api_key = ('SID', 'TOKEN')
url = 'https://api.twilio.com/2010-04-01/Accounts/SID/Messages.json'

response = requests.post(url, data=data, auth=twilio_api_key)

if response.status_code != 201:
    raise Exception("Falha ao enviar mensagem: {}".format(response.text))
else:
    print("Messagem enviada com sucesso!")
