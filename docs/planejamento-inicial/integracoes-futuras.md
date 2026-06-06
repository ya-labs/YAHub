# Integrações futuras do YA Hub

## Visão geral

O YA Hub deve ser planejado para integrar com outros produtos e canais da YA LABS, mas não deve depender dessas integrações para funcionar nas primeiras versões.

As duas integrações futuras mais importantes são:

- Spotifolio;
- Discord e automações.

## Spotifolio

O Spotifolio é um produto independente da YA LABS, em fase de prototipação, voltado a portfólios pessoais interativos inspirados na experiência visual do Spotify.

Enquanto o YA Hub funciona como portfólio institucional da organização, o Spotifolio deve funcionar como portfólio pessoal e, futuramente, como uma rede social de perfis profissionais.

Separação principal:

- **YA Hub:** mostra o que a organização constrói.
- **Spotifolio:** mostra quem são as pessoas por trás dos projetos.

### Integração planejada

```text
YA Hub
  -> lista membros oficiais
  -> aponta para perfis no Spotifolio
  -> lista projetos da organização

Spotifolio
  -> mostra perfis pessoais
  -> vincula projetos da YA LABS aos perfis
  -> aponta de volta para páginas de projeto no YA Hub
```

### Possíveis dados compartilhados

- `memberId`;
- `githubUsername`;
- `spotifolioUsername`;
- projetos vinculados;
- badges oficiais;
- links públicos.

### Responsáveis conhecidos do Spotifolio

- Nícolas Machado Cardoso: Front-End / Product.
- Caio Matheus Queiroz: Back-End / Product.
- Wagner Araujo Bastos: Engenharia de Plataforma.

### Princípios da integração

- O Spotifolio não deve ser absorvido pelo YA Hub.
- Nem todo usuário do Spotifolio precisa ser membro da YA LABS.
- Membros oficiais da YA LABS podem ter vínculo com perfis do Spotifolio.
- O YA Hub deve funcionar mesmo se o Spotifolio estiver indisponível.

## Discord e automações

O Discord deve funcionar como uma extensão de comunicação da YA LABS.

Essa integração está planejada para depois da conexão com o Spotifolio, porque primeiro o YA Hub precisa consolidar seu papel como portal institucional e sua relação com os perfis dos membros.

### Possibilidades

- notificações automáticas;
- changelog;
- alertas de releases;
- alertas de Pull Requests;
- alertas de issues;
- comandos como `/projetos`, `/status` e `/roadmap`;
- integração futura com DevLab;
- resumo de atividade da organização.

### Fluxo conceitual

```text
GitHub
  -> YA Hub Backend
      -> Discord/Webhooks/Bot
```

O back-end do YA Hub pode tratar os eventos antes de enviar mensagens ao Discord, evitando mensagens duplicadas, ruidosas ou sem contexto.

### Princípios da integração

- O Discord deve comunicar eventos relevantes, não todo ruído técnico.
- Automações importantes devem preservar revisão e controle.
- O Discord não substitui o YA Hub como fonte pública de informação.
- O bot deve consumir dados tratados pelo back-end quando possível.

## Diretriz geral

O YA Hub deve nascer preparado para integrações futuras, mas a prioridade inicial é construir uma base clara:

```text
portal público -> metadados ricos -> painel admin -> Spotifolio -> Discord
```
