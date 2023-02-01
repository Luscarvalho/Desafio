import requests

# Configurações gerais da Api
def configure_zenvia_api(api_token):
    return {
        'url': 'https://api.zenvia.com/v2/channels/sms/messages',
        'headers': {
            'Content-Type': 'application/json',
            'X-API-TOKEN': api_token
        }
    }

# Função pra enviar sms
def send_sms(sender, recipient, message):
    payload = {
        "from": sender,
        "to": recipient,
        "contents": [{
            "type": "text",
            "text": message,
        }]
    }

    response = requests.request('POST', url=config['url'], headers=config['headers'], json=payload)
    return response.json()

# Usando as funções
config = configure_zenvia_api(api_token='')
response = send_sms(sender='foregoing-meter', recipient='5592993233644',
                    message='Assunto : DESAFIO TALENT LAB ITACOATIARA\nOlá, meu nome  é Lucas Carvalho e estou participando do TALENT LAB ITACOATIARA')
print(response)
