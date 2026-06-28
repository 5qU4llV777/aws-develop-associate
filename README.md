# ☁️ Simulado AWS Developer Associate (DVA-C02)

Simulado em **português** para a certificação **AWS Certified Developer – Associate (DVA-C02)**, feito com **HTML/CSS/JS puro** — sem frameworks, sem build step, roda direto no navegador.

## 🎯 Funcionalidades

- 90 questões fixas (embaralhadas a cada sessão)
- Tópicos: Lambda, DynamoDB, SQS, SNS, API Gateway, CloudFormation, IAM, X-Ray, Cognito, ECS, CodeDeploy, CodePipeline, Elastic Beanstalk, CloudWatch
- Explicação detalhada após revelar a resposta
- Pontuação por tópico ao final
- Cronômetro de sessão
- Nota mínima de aprovação: **72% (padrão AWS)**
- Design responsivo e leve (mobile-friendly)
- Interface intuitiva com botões **Anterior / Revelar / Próxima / Finalizar / Reiniciar**


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
