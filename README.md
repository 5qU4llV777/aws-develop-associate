# ☁️ Simulado AWS Developer Associate (DVA-C02)

Simulado em **português** para a certificação **AWS Certified Developer – Associate (DVA-C02)**, feito com HTML/CSS/JS puro — sem frameworks, sem build step, roda direto no GitHub Pages.

## 🎯 Funcionalidades

- 20 questões embaralhadas a cada sessão
- Tópicos: Lambda, DynamoDB, SQS, SNS, API Gateway, CloudFormation, IAM, X-Ray, Cognito, ECS, CodeDeploy, CodePipeline, Elastic Beanstalk, CloudWatch
- Explicação detalhada após revelar a resposta
- Pontuação por tópico ao final
- Cronômetro de sessão
- Nota mínima de aprovação: 72% (padrão AWS)
- Design responsivo (mobile-friendly)

## 🚀 Deploy no GitHub Pages

### Opção 1 – Interface Web (mais fácil)

1. Crie um repositório no GitHub (ex: `aws-simulado`)
2. Faça upload dos arquivos (`index.html`, `css/style.css`, `js/questions.js`, `js/app.js`)
3. Vá em **Settings → Pages**
4. Em **Source**, selecione `Deploy from a branch`
5. Escolha `main` / `root` e clique **Save**
6. Acesse: `https://seu-usuario.github.io/aws-simulado`

### Opção 2 – Git CLI

```bash
git init
git add .
git commit -m "feat: simulado aws developer associate"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/aws-simulado.git
git push -u origin main
```

Depois ative o GitHub Pages nas configurações do repositório.

## 📁 Estrutura

```
aws-simulado/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos
├── js/
│   ├── questions.js    # Banco de questões
│   └── app.js          # Lógica do quiz
└── README.md
```

## ➕ Como adicionar questões

Edite `js/questions.js` e adicione objetos no array `questions`:

```js
{
  id: 21,
  topic: "S3",
  question: "Texto da pergunta...",
  options: [
    "Opção A",
    "Opção B",
    "Opção C",
    "Opção D"
  ],
  correct: 1,          // índice da resposta correta (0 = A, 1 = B...)
  explanation: "Explicação detalhada da resposta correta..."
}
```

## 📝 Tópicos cobertos (DVA-C02)

| Domínio | Peso |
|---------|------|
| Development with AWS Services | 32% |
| Security | 26% |
| Deployment | 24% |
| Troubleshooting & Optimization | 18% |

## 📄 Licença

MIT — use, modifique e distribua livremente.
