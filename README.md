# CT Aveia Jiu-Jítsu

Site do CT Aveia, centro de treinamento no Itaim Paulista, São Paulo.
Jiu-jítsu, muay thai, boxe, MMA e preparação física.

Feito com Vite, React (JSX), Tailwind CSS, GSAP e Lenis.

## Rodar no computador

```bash
npm install
npm run dev
```

`npm run build` gera a versão de produção na pasta `dist`.

## Publicar

O projeto está pronto para a Vercel: importe o repositório e publique, sem
configurar nada. O endereço do site entra sozinho nas tags de compartilhamento
e no `sitemap.xml`. Com domínio próprio, crie a variável de ambiente
`SITE_URL` (exemplo: `https://ctaveia.com.br`) no painel da Vercel.

## Onde mexer

| Para mudar | Arquivo |
| --- | --- |
| WhatsApp, Instagram, endereço, turnos | `src/data/site.js` |
| Tabela de horários | `src/data/horarios.js` |
| Modalidades (texto, card, horários) | `src/data/modalidades.js` |
| Textos das seções, perguntas, legendas | `src/data/conteudo.js` |
| Cores, fontes e raios | `src/styles/index.css` |
| Frases dos cards do escudo | `src/data/conteudo.js` (`escudos`) |
| Fotos do hero | `public/img/hero-desktop.webp` e `hero-mobile.webp` |

### WhatsApp

Em `src/data/site.js`, preencha `whatsapp` só com números, com 55 e DDD:

```js
whatsapp: '5511912345678',
```

Todos os botões do site, o balão flutuante, as linhas da tabela de horários e
o formulário passam a abrir o WhatsApp com a mensagem já escrita. Enquanto o
campo estiver vazio, eles abrem o Direct do Instagram do CT.

### Horários

Cada linha de `src/data/horarios.js` é uma aula: grupo, turma, público, dias
(1 = segunda, 5 = sexta) e hora. A tabela do site, os horários dentro de cada
modalidade e a contagem da próxima aula saem todos dessa lista.

## Estrutura

```
public/            ícones, imagem de compartilhamento e fotos do hero
src/
  data/            conteúdo do site
  lib/             animação, rolagem, agenda, contato, geometria do logo
  hooks/           comportamentos reutilizados (inclinação 3D, inércia, relógio)
  components/ui/   botão, logo, símbolo 3D, card de marca, título, faixa
  components/layout/ tela de load, barra do topo, menu, rodapé, balão
  sections/        uma seção da página por arquivo, na ordem em que aparecem
  styles/          tokens, tipografia e estilos por área
```

## Detalhes que valem saber

- **Sem fotos além do hero.** As seções usam cards de marca: o logo do CT em
  oito acabamentos, desenhados em código (`components/ui/CardMarca.jsx`).
  Para trocar o acabamento de uma modalidade, mude o campo `card` em
  `src/data/modalidades.js`.
- **Logo do hero nunca é cortado.** Em tela larga a foto ocupa a altura toda
  e encosta na direita; em tela em pé ela fica no topo, com largura limitada.
  As regras estão comentadas em `src/styles/hero.css`.
- **Tela de load.** Espera as fontes e a foto do hero. Se a rede travar, abre
  sozinha depois de 6 segundos.
- **Movimento reduzido.** Quem pede menos animação no sistema vê o site sem
  rolagem suave, sem a tela de load animada e com a seção dos valores em lista.
- **Fuso.** A tabela e a contagem da próxima aula usam sempre o horário de
  São Paulo, onde quer que o visitante esteja.
