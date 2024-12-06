import pandas as pd

with open('dados.csv', mode='r', newline='', encoding='utf-8') as file:
            reader = pd.read_csv(file)
            teste = reader [(reader['id'] == 1) & (reader['titulo'] == 'Culture debate')]
            print(teste)