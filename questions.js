const questions = [
  {
    id: 1,
    topic: "Lambda",
    question: "Você está desenvolvendo uma função AWS Lambda que processa eventos do Amazon SQS. Ao testar, você percebe que a função está sendo invocada mais vezes do que o esperado quando mensagens falham. Qual é a causa mais provável?",
    options: [
      "A fila SQS possui um Dead Letter Queue (DLQ) mal configurado",
      "O Lambda está com o timeout muito baixo, gerando reprocessamento automático",
      "O maxReceiveCount da fila SQS não foi configurado, causando reintenativas indefinidas",
      "O Lambda não tem permissão para deletar mensagens da fila após o processamento"
    ],
    correct: 2,
    explanation: "Quando o Lambda falha ao processar uma mensagem SQS, a mensagem se torna visível novamente na fila após o tempo de visibilidade. Sem um DLQ e sem configurar maxReceiveCount, a mensagem pode ser reprocessada indefinidamente. O correto é configurar maxReceiveCount e um DLQ para capturar mensagens que falham repetidamente."
  },
  {
    id: 2,
    topic: "DynamoDB",
    question: "Uma aplicação usa DynamoDB e precisa buscar itens de uma tabela usando um atributo que não é a chave primária. Qual abordagem é a mais eficiente?",
    options: [
      "Usar Scan com um FilterExpression",
      "Criar um Global Secondary Index (GSI) no atributo e usar Query",
      "Usar BatchGetItem com o atributo desejado",
      "Criar uma nova tabela com o atributo como chave primária"
    ],
    correct: 1,
    explanation: "Um Global Secondary Index (GSI) permite realizar operações de Query em atributos que não são a chave primária da tabela. Isso é muito mais eficiente do que um Scan, que lê todos os itens da tabela e consome muita capacidade de leitura. O GSI replica os dados relevantes e permite queries rápidas."
  },
  {
    id: 3,
    topic: "API Gateway",
    question: "Você precisa que sua API REST no API Gateway retorne respostas diferentes dependendo do Content-Type aceito pelo cliente (JSON ou XML). Qual recurso do API Gateway deve ser usado?",
    options: [
      "Stage Variables para alternar entre backends diferentes",
      "Integration Response com mapeamento por header Accept",
      "Content Negotiation através de Mapping Templates no Integration Response",
      "Lambda Authorizer para detectar o Content-Type e redirecionar"
    ],
    correct: 2,
    explanation: "Mapping Templates no API Gateway permitem transformar a resposta do backend com base em parâmetros da requisição, incluindo o header Accept. Você pode configurar diferentes templates para application/json e application/xml, aplicando transformações via VTL (Velocity Template Language)."
  },
  {
    id: 4,
    topic: "S3",
    question: "Um desenvolvedor precisa garantir que objetos carregados no S3 sejam criptografados. A empresa exige que a chave de criptografia seja gerenciada pelo cliente e rotacionada anualmente. Qual solução atende a esse requisito?",
    options: [
      "SSE-S3 com política de bucket obrigando criptografia",
      "SSE-KMS usando uma Customer Managed Key (CMK) com rotação automática anual habilitada",
      "SSE-C enviando a chave no header de cada upload",
      "Criptografia client-side com a chave armazenada no Secrets Manager"
    ],
    correct: 1,
    explanation: "SSE-KMS com Customer Managed Key (CMK) permite que o cliente controle a chave de criptografia, configure políticas de acesso e habilite a rotação automática anual. O KMS gerencia o ciclo de vida da chave enquanto o cliente mantém o controle. SSE-S3 usa chaves gerenciadas pela AWS, SSE-C requer o cliente enviar a chave em cada request."
  },
  {
    id: 5,
    topic: "CodeDeploy",
    question: "Sua equipe usa CodeDeploy para deploy em instâncias EC2. Durante um deploy, você precisa executar scripts antes que o novo código seja instalado para parar serviços dependentes. Em qual lifecycle event hook isso deve ser configurado?",
    options: [
      "BeforeInstall",
      "AfterInstall",
      "ApplicationStart",
      "ValidateService"
    ],
    correct: 0,
    explanation: "BeforeInstall é o lifecycle hook correto para executar tarefas de preparação antes da instalação do novo código, como parar serviços dependentes, fazer backup de arquivos de configuração ou limpar diretórios. A ordem dos hooks é: BeforeInstall → AfterInstall → ApplicationStart → ValidateService."
  },
  {
    id: 6,
    topic: "SQS",
    question: "Uma aplicação de e-commerce processa pedidos via SQS. Você nota que alguns pedidos estão sendo processados duas vezes, gerando cobranças duplicadas. Como resolver isso da forma mais confiável?",
    options: [
      "Diminuir o Visibility Timeout para que mensagens sejam reprocessadas mais rápido",
      "Usar SQS FIFO com deduplication ID baseado no ID do pedido",
      "Aumentar o número de consumidores para processar mensagens mais rápido",
      "Implementar uma Dead Letter Queue para capturar duplicatas"
    ],
    correct: 1,
    explanation: "SQS FIFO com Message Deduplication ID garante que mensagens com o mesmo ID de deduplicação sejam entregues apenas uma vez em um intervalo de 5 minutos. Usando o ID único do pedido como deduplication ID, você elimina o processamento duplicado. Filas Standard do SQS garantem entrega 'at least once', não 'exactly once'."
  },
  {
    id: 7,
    topic: "CloudFormation",
    question: "Você tem um template CloudFormation que cria recursos em múltiplas regiões. Ao fazer deploy, alguns recursos específicos de região estão falhando. Qual recurso do CloudFormation permite condicionar a criação de recursos por região?",
    options: [
      "Mappings com Fn::FindInMap referenciando a região atual",
      "Parameters com AllowedValues limitando as regiões",
      "Conditions usando Fn::Equals com AWS::Region e Fn::If nos recursos",
      "Nested Stacks separados por região"
    ],
    correct: 2,
    explanation: "Conditions no CloudFormation permitem definir condições baseadas em pseudo-parâmetros como AWS::Region. Com Fn::Equals você cria a condição (ex: IsUSEast1) e depois usa Fn::If nos recursos para criar ou não criar dependendo da região. Isso permite um único template que se adapta ao ambiente de deploy."
  },
  {
    id: 8,
    topic: "Elastic Beanstalk",
    question: "Você está fazendo deploy de uma nova versão no Elastic Beanstalk e precisa garantir zero downtime, mas também quer economizar custos sem manter instâncias extras permanentemente. Qual política de deploy é a mais adequada?",
    options: [
      "All at once — deploy em todas as instâncias simultaneamente",
      "Rolling — atualiza instâncias em lotes mantendo capacidade parcial",
      "Rolling with additional batch — adiciona instâncias temporárias durante o deploy",
      "Immutable — cria um novo Auto Scaling Group paralelo"
    ],
    correct: 2,
    explanation: "Rolling with additional batch inicia um novo lote de instâncias antes de atualizar as existentes, garantindo que a capacidade total seja mantida durante o deploy (zero downtime). As instâncias adicionais são terminadas após o deploy, controlando custos. Immutable também garante zero downtime, mas mantém instâncias duplicadas por mais tempo, sendo mais caro."
  },
  {
    id: 9,
    topic: "IAM",
    question: "Um desenvolvedor criou uma função Lambda que precisa acessar um bucket S3 em outra conta AWS. Qual é a abordagem correta para configurar esse acesso cross-account?",
    options: [
      "Criar um usuário IAM na conta do S3 e armazenar as credenciais no Secrets Manager da conta Lambda",
      "Configurar a bucket policy do S3 para permitir a role da Lambda e garantir que a Lambda role tenha permissão de s3:GetObject",
      "Criar uma VPC Peering entre as duas contas",
      "Usar Access Points do S3 com política de acesso cross-account"
    ],
    correct: 1,
    explanation: "Para acesso cross-account ao S3, são necessárias permissões em AMBOS os lados: (1) a bucket policy da conta de destino deve explicitamente permitir o ARN da role da Lambda da conta de origem, e (2) a execution role da Lambda deve ter as permissões de S3 necessárias. Apenas uma das partes configuradas não é suficiente."
  },
  {
    id: 10,
    topic: "DynamoDB",
    question: "Uma aplicação de jogos armazena pontuações dos usuários no DynamoDB com leituras muito frequentes dos top 10 jogadores. As leituras consistentes estão consumindo muita capacidade. Como otimizar?",
    options: [
      "Usar Strongly Consistent Reads para garantir dados atualizados",
      "Implementar DAX (DynamoDB Accelerator) na frente da tabela",
      "Aumentar o número de RCUs (Read Capacity Units) da tabela",
      "Migrar os dados do leaderboard para ElastiCache Redis manualmente"
    ],
    correct: 1,
    explanation: "DAX é um cache em memória totalmente gerenciado e compatível com DynamoDB que oferece latência de microssegundos. Para leaderboards com leituras muito frequentes dos mesmos itens (top 10), o DAX é ideal: o cache absorve as leituras repetidas sem consumir RCUs da tabela. É uma solução gerenciada que não requer sincronização manual."
  },
  {
    id: 11,
    topic: "SNS",
    question: "Você precisa enviar uma notificação para múltiplos sistemas (email, SQS, Lambda) quando um evento ocorre na sua aplicação. Qual é a arquitetura correta usando SNS?",
    options: [
      "Criar um tópico SNS e configurar subscriptions para cada destino",
      "Enviar mensagens individuais para cada destino via SDK",
      "Usar SNS FIFO com um único subscriber que distribui internamente",
      "Configurar SNS como trigger direto do CloudWatch Events"
    ],
    correct: 0,
    explanation: "O padrão pub/sub do SNS permite criar um tópico e configurar múltiplas subscriptions (email, SQS, Lambda, HTTP/S, SMS). Quando uma mensagem é publicada no tópico, o SNS entrega automaticamente para todos os subscribers. Isso implementa o padrão fan-out, desacoplando o produtor dos consumidores."
  },
  {
    id: 12,
    topic: "X-Ray",
    question: "Você precisa rastrear uma requisição que passa por API Gateway → Lambda → DynamoDB para identificar onde está ocorrendo latência. Qual configuração mínima é necessária?",
    options: [
      "Habilitar X-Ray no API Gateway apenas, pois ele rastreia toda a cadeia automaticamente",
      "Habilitar X-Ray tracing no API Gateway e na função Lambda, e usar o AWS SDK com X-Ray instrumentation",
      "Instalar o X-Ray daemon em todas as instâncias EC2 da VPC",
      "Usar CloudWatch Insights com filtros de latência para cada serviço"
    ],
    correct: 1,
    explanation: "Para rastreamento end-to-end, é necessário: (1) habilitar X-Ray active tracing no API Gateway, (2) habilitar X-Ray active tracing na função Lambda, e (3) usar o X-Ray SDK no código da Lambda para instrumentar as chamadas ao DynamoDB. O X-Ray correlaciona os traces através de um Trace ID propagado nos headers."
  },
  {
    id: 13,
    topic: "Cognito",
    question: "Sua aplicação mobile precisa que usuários façam login com Google e depois acessem recursos AWS como S3 e DynamoDB diretamente do app. Qual é a arquitetura correta com Cognito?",
    options: [
      "Cognito User Pool para autenticação com Google + Cognito Identity Pool para credenciais AWS temporárias",
      "Cognito Identity Pool apenas, pois integra nativamente com Google Login",
      "Cognito User Pool apenas, pois fornece tokens que são aceitos pelo S3 e DynamoDB",
      "IAM Identity Federation direto com Google sem necessidade do Cognito"
    ],
    correct: 0,
    explanation: "A arquitetura correta usa dois serviços: (1) Cognito User Pool com federação Google para autenticar usuários e emitir tokens JWT, e (2) Cognito Identity Pool para trocar esses tokens por credenciais AWS temporárias (via STS AssumeRoleWithWebIdentity). Com credenciais temporárias, o app pode acessar S3, DynamoDB etc. diretamente com as permissões da IAM role configurada."
  },
  {
    id: 14,
    topic: "CloudWatch",
    question: "Uma Lambda function está falhando em produção, mas os logs no CloudWatch mostram apenas a mensagem genérica 'Task timed out'. Quais métricas CloudWatch você deve analisar para diagnosticar o problema?",
    options: [
      "Lambda Duration e Lambda Errors para ver se o timeout está próximo do limite configurado",
      "EC2 CPUUtilization e NetworkIn para a instância subjacente do Lambda",
      "Lambda Duration, Lambda Throttles e Lambda ConcurrentExecutions",
      "CloudTrail logs para ver quais APIs foram chamadas antes do timeout"
    ],
    correct: 2,
    explanation: "Para diagnosticar timeouts no Lambda, analise: Duration (se está próxima do timeout configurado), Throttles (se a Lambda está sendo estrangulada por limite de concorrência) e ConcurrentExecutions (se atingiu o limite de conta/função). Throttling pode causar atrasos que eventualmente levam ao timeout. CloudWatch Insights nos logs do Lambda também pode revelar padrões."
  },
  {
    id: 15,
    topic: "ECS",
    question: "Você tem um container Docker no ECS Fargate que precisa acessar um banco de dados RDS. A senha do banco deve ser rotacionada automaticamente a cada 30 dias. Como configurar isso corretamente?",
    options: [
      "Armazenar a senha como variável de ambiente na Task Definition",
      "Usar Secrets Manager com rotação automática e referenciar o secret ARN na Task Definition",
      "Usar Parameter Store (SecureString) e passar o parâmetro como env var no entrypoint",
      "Hardcodar a senha na imagem Docker e redeployar após cada rotação"
    ],
    correct: 1,
    explanation: "Secrets Manager suporta rotação automática de credenciais de banco de dados (integrado com RDS) e pode ser referenciado diretamente na Task Definition do ECS. O ECS injeta o valor do secret como variável de ambiente em tempo de execução, buscando sempre a versão mais atual. Isso elimina a necessidade de redeploy após rotação e evita expor credenciais em texto plano."
  },
  {
    id: 16,
    topic: "SQS",
    question: "Uma função Lambda processa mensagens de uma fila SQS Standard. Após um pico de tráfego, você percebe que o Lambda está sendo throttled. O que acontece com as mensagens SQS nesse cenário?",
    options: [
      "As mensagens são perdidas permanentemente",
      "As mensagens ficam invisíveis na fila até o Visibility Timeout expirar e depois ficam disponíveis novamente",
      "O SQS automaticamente escala o Lambda para processar todas as mensagens",
      "As mensagens são movidas automaticamente para um DLQ"
    ],
    correct: 1,
    explanation: "Quando o Lambda é throttled, ele retorna um erro para o SQS. As mensagens ficam invisíveis pelo período de Visibility Timeout e depois voltam a ficar visíveis para nova tentativa de processamento. O Lambda Event Source Mapping tem retry logic embutida e fará backoff exponencial. As mensagens só vão para o DLQ após excederem o maxReceiveCount configurado na fila."
  },
  {
    id: 17,
    topic: "API Gateway",
    question: "Você precisa proteger uma API no API Gateway para que apenas clientes com uma chave de API válida possam acessá-la, com diferentes cotas para clientes diferentes. Como implementar isso?",
    options: [
      "Lambda Authorizer que verifica um header customizado com a chave",
      "API Keys com Usage Plans configurando cotas e throttling por plano",
      "Cognito User Pools com diferentes grupos tendo permissões distintas",
      "WAF rules com rate limiting por IP de origem"
    ],
    correct: 1,
    explanation: "API Keys associadas a Usage Plans é o mecanismo nativo do API Gateway para controle de acesso baseado em chave com cotas diferenciadas. Um Usage Plan define throttling (req/seg) e quota (req/mês/dia) e pode ter múltiplas API Keys associadas. Cada cliente recebe uma API Key e é associado a um Usage Plan com sua cota específica. A chave é enviada no header x-api-key."
  },
  {
    id: 18,
    topic: "CodePipeline",
    question: "Sua pipeline CI/CD no CodePipeline precisa executar testes de integração que requerem um banco de dados real. Os testes falham aleatoriamente por condições de corrida. Qual abordagem melhora a confiabilidade?",
    options: [
      "Aumentar o timeout do stage de testes na pipeline",
      "Usar CodeBuild com um banco de dados RDS dedicado para testes que é criado/destruído por CloudFormation a cada execução",
      "Executar os testes em paralelo para reduzir o tempo total",
      "Mover os testes de integração para fora da pipeline e executar manualmente"
    ],
    correct: 1,
    explanation: "Usar CloudFormation para criar um ambiente de banco de dados isolado para cada execução de pipeline elimina condições de corrida entre execuções paralelas ou sequenciais. O CodeBuild pode executar um template CloudFormation antes dos testes (cria RDS) e destruí-lo após (delete stack). Isso garante isolamento e reprodutibilidade dos testes."
  },
  {
    id: 19,
    topic: "Lambda",
    question: "Uma Lambda function faz chamadas a um serviço externo que ocasionalmente retorna erros 429 (Too Many Requests). Qual é a melhor prática para lidar com isso no código da Lambda?",
    options: [
      "Ignorar o erro e retornar sucesso para evitar reprocessamento",
      "Implementar retry com exponential backoff e jitter no código da Lambda",
      "Aumentar o timeout da Lambda para dar mais tempo ao serviço externo",
      "Usar um Lambda Layer compartilhado com lógica de retry global"
    ],
    correct: 1,
    explanation: "Exponential backoff com jitter é o padrão recomendado pela AWS para lidar com erros de throttling. O exponential backoff aumenta progressivamente o tempo entre tentativas (1s, 2s, 4s, 8s...) e o jitter adiciona aleatoriedade para evitar que múltiplos clientes retentem simultaneamente (thundering herd problem). O AWS SDK implementa isso automaticamente para serviços AWS, mas deve ser implementado manualmente para APIs externas."
  },
  {
    id: 20,
    topic: "CloudFormation",
    question: "Durante um update de stack CloudFormation, um recurso crítico de banco de dados precisa ser substituído (replacement). O que acontece com os dados existentes nesse cenário?",
    options: [
      "CloudFormation faz backup automático antes de substituir o recurso",
      "O recurso antigo é deletado e um novo é criado, perdendo os dados a menos que haja backups externos",
      "CloudFormation detecta que é um banco e preserva os dados automaticamente via snapshot",
      "O update falha automaticamente para proteger os dados"
    ],
    correct: 1,
    explanation: "Quando uma propriedade que requer replacement é alterada (ex: DBInstanceIdentifier, Engine no RDS), o CloudFormation cria um novo recurso e deleta o antigo. Para bancos de dados RDS, você pode usar DeletionPolicy: Snapshot para que o CloudFormation crie um snapshot antes de deletar, ou DeletionPolicy: Retain para manter o recurso mesmo após ser removido da stack. Nunca faça updates que causem replacement em bancos de dados de produção sem DeletionPolicy configurada."
  }
];
