# Integrações futuras do YAHub

## Visão geral

O YAHub deve ser planejado para integrar com outros produtos e canais da YA LABS, mas não deve depender dessas integrações para funcionar nas primeiras versões.

As integrações futuras mais importantes são:

- YABook;
- Spotifolio;
- Discord e automações.

## YABook

Na V1, a documentação interna dos projetos não será mantida dentro do YAHub.

Quando uma pessoa quiser consultar documentação de um projeto, o portal deve apontar para o GitHub do repositório.

O YAHub deve preparar uma integração futura com o YABook. Quando o YABook oferecer suporte para abrir contexto, documentação ou fluxos assistidos de um projeto, o YAHub poderá exibir uma ação como:

```text
Abrir com o YABook
```

Essa preparação não deve bloquear a V1.

## Spotifolio

O Spotifolio é um produto independente da YA LABS, em fase de prototipação, voltado a portfólios pessoais interativos inspirados na experiência visual do Spotify.

Enquanto o YAHub funciona como portfólio institucional da organização, o Spotifolio deve funcionar como portfólio pessoal e, futuramente, como uma rede social de perfis profissionais.

Separação principal:

- **YAHub:** mostra o que a organização constrói.
- **Spotifolio:** mostra quem são as pessoas por trás dos projetos.

### Integração planejada

```text
YAHub
  -> lista membros oficiais
  -> aponta para perfis no Spotifolio
  -> lista projetos da organização

Spotifolio
  -> mostra perfis pessoais
  -> vincula projetos da YA LABS aos perfis
  -> aponta de volta para páginas de projeto no YAHub
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

- O Spotifolio não deve ser absorvido pelo YAHub.
- Nem todo usuário do Spotifolio precisa ser membro da YA LABS.
- Membros oficiais da YA LABS podem ter vínculo com perfis do Spotifolio.
- O YAHub deve funcionar mesmo se o Spotifolio estiver indisponível.

## Discord e automações

O Discord deve funcionar como uma extensão de comunicação da YA LABS.

Essa integração está planejada para depois da conexão com o Spotifolio, porque primeiro o YAHub precisa consolidar seu papel como portal institucional e sua relação com os perfis dos membros.

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
  -> YAHub Backend
      -> Discord/Webhooks/Bot
```

O back-end do YAHub pode tratar os eventos antes de enviar mensagens ao Discord, evitando mensagens duplicadas, ruidosas ou sem contexto.

### Princípios da integração

- O Discord deve comunicar eventos relevantes, não todo ruído técnico.
- Automações importantes devem preservar revisão e controle.
- Automações que alterarem repositórios devem respeitar o fluxo de branch e Pull Request documentado no YABook.
- O Discord não substitui o YAHub como fonte pública de informação.
- O bot deve consumir dados tratados pelo back-end quando possível.

## Diretriz geral

O YAHub deve nascer preparado para integrações futuras, mas a prioridade inicial é construir uma base clara:

```text
Home institucional -> portal público -> admin básico -> integração com YABook -> Spotifolio -> Discord
```
