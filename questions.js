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
  ,{
  id: 21,
  topic: "Lambda",
  question: "Qual recurso do Lambda permite compartilhar bibliotecas entre várias funções sem duplicar código?",
  options: [
    "Layers",
    "Aliases",
    "Provisioned Concurrency",
    "Environment Variables"
  ],
  correct: 0,
  explanation: "Lambda Layers permitem compartilhar código e bibliotecas entre funções, reduzindo duplicação e facilitando manutenção."
},
{
  id: 22,
  topic: "DynamoDB",
  question: "Qual recurso garante que uma tabela DynamoDB não seja apagada acidentalmente em um stack CloudFormation?",
  options: [
    "DeletionPolicy: Retain",
    "UpdatePolicy: Preserve",
    "SnapshotPolicy: Enabled",
    "BackupPolicy: Keep"
  ],
  correct: 0,
  explanation: "A propriedade DeletionPolicy: Retain instrui o CloudFormation a manter o recurso mesmo após ser removido do template."
},
{
  id: 23,
  topic: "S3",
  question: "Qual configuração permite que objetos em um bucket S3 sejam automaticamente movidos para Glacier após 30 dias?",
  options: [
    "Bucket Policy",
    "Lifecycle Rule",
    "Replication Rule",
    "Versioning"
  ],
  correct: 1,
  explanation: "Lifecycle Rules permitem definir políticas de transição e expiração de objetos, como mover para Glacier após 30 dias."
},
{
  id: 24,
  topic: "API Gateway",
  question: "Qual recurso do API Gateway permite limitar requisições por cliente usando chaves de API?",
  options: [
    "Usage Plans",
    "Stage Variables",
    "Lambda Authorizer",
    "Resource Policies"
  ],
  correct: 0,
  explanation: "Usage Plans permitem definir cotas e limites de requisições por chave de API, controlando o uso por cliente."
},
{
  id: 25,
  topic: "CloudWatch",
  question: "Qual recurso do CloudWatch permite executar ações automáticas quando uma métrica atinge um limite?",
  options: [
    "CloudWatch Logs",
    "CloudWatch Alarms",
    "CloudWatch Dashboards",
    "CloudWatch Events"
  ],
  correct: 1,
  explanation: "CloudWatch Alarms monitoram métricas e podem disparar ações como enviar notificações ou executar Auto Scaling."
},
{
  id: 26,
  topic: "IAM",
  question: "Qual prática é recomendada para conceder permissões mínimas necessárias a um usuário IAM?",
  options: [
    "Usar políticas gerenciadas pela AWS",
    "Aplicar o princípio de menor privilégio",
    "Dar permissões de administrador para evitar erros",
    "Criar múltiplos usuários com credenciais compartilhadas"
  ],
  correct: 1,
  explanation: "O princípio de menor privilégio garante que cada identidade tenha apenas as permissões necessárias para suas tarefas."
},
{
  id: 27,
  topic: "ECS",
  question: "Qual recurso do ECS permite que containers obtenham credenciais temporárias da AWS sem armazenar chaves no código?",
  options: [
    "IAM Roles for Tasks",
    "Secrets Manager",
    "Parameter Store",
    "Task Execution Role"
  ],
  correct: 0,
  explanation: "IAM Roles for Tasks permitem que containers ECS assumam roles e obtenham credenciais temporárias da AWS com segurança."
},
{
  id: 28,
  topic: "Elastic Beanstalk",
  question: "Qual política de deploy garante zero downtime criando um novo ambiente paralelo antes de substituir o antigo?",
  options: [
    "All at once",
    "Rolling",
    "Rolling with additional batch",
    "Immutable"
  ],
  correct: 3,
  explanation: "Immutable cria um novo ambiente paralelo e só substitui o antigo após o novo estar pronto, garantindo zero downtime."
},
{
  id: 29,
  topic: "Cognito",
  question: "Qual recurso do Cognito permite autenticar usuários com provedores externos como Google ou Facebook?",
  options: [
    "User Pools",
    "Identity Pools",
    "Federation via IAM",
    "STS AssumeRole"
  ],
  correct: 0,
  explanation: "User Pools suportam federação com provedores externos, permitindo autenticação de usuários com Google, Facebook etc."
},
{
  id: 30,
  topic: "X-Ray",
  question: "Qual recurso do X-Ray permite identificar o tempo gasto em cada serviço durante uma requisição?",
  options: [
    "Trace Segments",
    "Annotations",
    "Sampling Rules",
    "Service Map"
  ],
  correct: 3,
  explanation: "O Service Map mostra graficamente os serviços envolvidos em uma requisição e o tempo gasto em cada um."
}
,{
  id: 31,
  topic: "Lambda",
  question: "Qual configuração reduz o impacto do cold start em funções Lambda críticas?",
  options: [
    "Provisioned Concurrency",
    "Aumentar o timeout",
    "Usar Layers",
    "Executar em VPC"
  ],
  correct: 0,
  explanation: "Provisioned Concurrency mantém instâncias pré-aquecidas da função Lambda, reduzindo a latência causada por cold starts."
},
{
  id: 32,
  topic: "DynamoDB",
  question: "Qual recurso permite armazenar múltiplos tipos de dados relacionados em uma única tabela DynamoDB?",
  options: [
    "Partition Keys compostas",
    "Single Table Design",
    "Global Secondary Index",
    "Streams"
  ],
  correct: 1,
  explanation: "O padrão Single Table Design usa chaves compostas e índices para armazenar diferentes entidades em uma única tabela, otimizando consultas."
},
{
  id: 33,
  topic: "S3",
  question: "Qual recurso do S3 garante que cada objeto tenha uma versão única ao ser atualizado?",
  options: [
    "Replication",
    "Versioning",
    "Lifecycle Rules",
    "Encryption"
  ],
  correct: 1,
  explanation: "O Versioning mantém múltiplas versões de um objeto, permitindo restaurar versões antigas e proteger contra exclusões acidentais."
},
{
  id: 34,
  topic: "API Gateway",
  question: "Qual recurso permite transformar a requisição antes de enviá-la ao backend?",
  options: [
    "Usage Plans",
    "Mapping Templates",
    "Stage Variables",
    "Resource Policies"
  ],
  correct: 1,
  explanation: "Mapping Templates permitem modificar o payload da requisição usando Velocity Template Language (VTL) antes de chegar ao backend."
},
{
  id: 35,
  topic: "CloudWatch",
  question: "Qual recurso do CloudWatch permite criar dashboards personalizados com métricas?",
  options: [
    "CloudWatch Logs",
    "CloudWatch Dashboards",
    "CloudWatch Alarms",
    "CloudWatch Insights"
  ],
  correct: 1,
  explanation: "CloudWatch Dashboards permitem visualizar métricas em gráficos personalizados para monitoramento em tempo real."
},
{
  id: 36,
  topic: "IAM",
  question: "Qual recurso do IAM permite delegar permissões temporárias a usuários externos?",
  options: [
    "IAM Roles",
    "IAM Groups",
    "IAM Policies",
    "IAM Users"
  ],
  correct: 0,
  explanation: "IAM Roles podem ser assumidas por usuários externos ou serviços, concedendo permissões temporárias sem compartilhar credenciais."
},
{
  id: 37,
  topic: "ECS",
  question: "Qual recurso do ECS permite executar containers sem gerenciar servidores?",
  options: [
    "EC2 Launch Type",
    "Fargate Launch Type",
    "Auto Scaling Group",
    "Elastic Beanstalk"
  ],
  correct: 1,
  explanation: "O Fargate Launch Type executa containers sem necessidade de gerenciar instâncias EC2, simplificando a operação."
},
{
  id: 38,
  topic: "Elastic Beanstalk",
  question: "Qual recurso do Elastic Beanstalk permite configurar variáveis de ambiente para a aplicação?",
  options: [
    "Configuration Files (.ebextensions)",
    "Scaling Policies",
    "Deployment Policies",
    "Health Checks"
  ],
  correct: 0,
  explanation: "Arquivos .ebextensions permitem configurar variáveis de ambiente, pacotes e ajustes adicionais no ambiente Elastic Beanstalk."
},
{
  id: 39,
  topic: "Cognito",
  question: "Qual recurso do Cognito fornece credenciais temporárias da AWS para usuários autenticados?",
  options: [
    "User Pools",
    "Identity Pools",
    "IAM Federation",
    "STS AssumeRole"
  ],
  correct: 1,
  explanation: "Identity Pools permitem trocar tokens de autenticação por credenciais temporárias da AWS, integrando com IAM roles."
},
{
  id: 40,
  topic: "X-Ray",
  question: "Qual recurso do X-Ray permite reduzir o custo de rastreamento coletando apenas parte das requisições?",
  options: [
    "Annotations",
    "Sampling Rules",
    "Segments",
    "Service Map"
  ],
  correct: 1,
  explanation: "Sampling Rules definem a porcentagem de requisições rastreadas, reduzindo custo e mantendo visibilidade estatística."
}
,{
  id: 41,
  topic: "Lambda",
  question: "Qual configuração permite que uma função Lambda acesse recursos dentro de uma VPC?",
  options: [
    "Provisioned Concurrency",
    "VPC Configuration",
    "Environment Variables",
    "Layers"
  ],
  correct: 1,
  explanation: "Ao configurar a Lambda com VPC, você define subnets e security groups, permitindo acesso a recursos privados como RDS ou ElastiCache."
},
{
  id: 42,
  topic: "DynamoDB",
  question: "Qual recurso do DynamoDB permite capturar mudanças em tempo real na tabela?",
  options: [
    "Global Secondary Index",
    "Streams",
    "BatchGetItem",
    "Scan"
  ],
  correct: 1,
  explanation: "DynamoDB Streams capturam inserções, atualizações e exclusões em tempo real, podendo acionar funções Lambda para processar eventos."
},
{
  id: 43,
  topic: "S3",
  question: "Qual recurso do S3 permite replicar objetos automaticamente entre regiões?",
  options: [
    "Cross-Region Replication",
    "Lifecycle Rules",
    "Versioning",
    "Bucket Policy"
  ],
  correct: 0,
  explanation: "Cross-Region Replication copia objetos de forma assíncrona entre buckets em diferentes regiões, útil para DR e compliance."
},
{
  id: 44,
  topic: "API Gateway",
  question: "Qual recurso do API Gateway permite proteger endpoints com autenticação baseada em usuários?",
  options: [
    "Usage Plans",
    "Lambda Authorizer",
    "Cognito User Pools",
    "Resource Policies"
  ],
  correct: 2,
  explanation: "Cognito User Pools podem ser integrados ao API Gateway para autenticação de usuários via JWT tokens."
},
{
  id: 45,
  topic: "CloudWatch",
  question: "Qual recurso do CloudWatch permite executar código em resposta a eventos?",
  options: [
    "CloudWatch Logs",
    "CloudWatch Alarms",
    "CloudWatch Events (EventBridge)",
    "CloudWatch Dashboards"
  ],
  correct: 2,
  explanation: "CloudWatch Events (EventBridge) permite reagir a eventos e acionar ações como invocar funções Lambda."
},
{
  id: 46,
  topic: "IAM",
  question: "Qual recurso do IAM permite aplicar políticas automaticamente a múltiplos usuários?",
  options: [
    "IAM Roles",
    "IAM Groups",
    "IAM Policies",
    "IAM Federation"
  ],
  correct: 1,
  explanation: "IAM Groups permitem agrupar usuários e aplicar políticas de forma centralizada."
},
{
  id: 47,
  topic: "ECS",
  question: "Qual recurso do ECS permite escalar automaticamente containers com base em métricas?",
  options: [
    "Service Auto Scaling",
    "Task Definition",
    "Cluster Capacity Providers",
    "Elastic Load Balancer"
  ],
  correct: 0,
  explanation: "Service Auto Scaling ajusta o número de tasks ECS com base em métricas como CPU ou memória."
},
{
  id: 48,
  topic: "Elastic Beanstalk",
  question: "Qual recurso do Elastic Beanstalk permite configurar regras de escalabilidade automática?",
  options: [
    "Scaling Policies",
    "Deployment Policies",
    "Configuration Files",
    "Health Checks"
  ],
  correct: 0,
  explanation: "Scaling Policies permitem definir regras de Auto Scaling para aumentar ou reduzir instâncias conforme métricas."
},
{
  id: 49,
  topic: "Cognito",
  question: "Qual recurso do Cognito permite adicionar atributos customizados ao perfil do usuário?",
  options: [
    "Identity Pools",
    "User Pools",
    "IAM Federation",
    "STS AssumeRole"
  ],
  correct: 1,
  explanation: "User Pools permitem definir atributos customizados além dos padrões, como telefone ou cargo."
},
{
  id: 50,
  topic: "X-Ray",
  question: "Qual recurso do X-Ray permite adicionar informações customizadas para facilitar a análise de traces?",
  options: [
    "Annotations",
    "Segments",
    "Sampling Rules",
    "Service Map"
  ],
  correct: 0,
  explanation: "Annotations permitem adicionar metadados customizados aos traces, facilitando filtros e análises."
}
,{
  id: 51,
  topic: "Lambda",
  question: "Qual recurso do Lambda permite executar funções em resposta a eventos de outros serviços AWS?",
  options: [
    "Event Source Mapping",
    "Provisioned Concurrency",
    "Layers",
    "Environment Variables"
  ],
  correct: 0,
  explanation: "Event Source Mapping conecta a Lambda a serviços como SQS, DynamoDB Streams e Kinesis, disparando execuções automaticamente."
},
{
  id: 52,
  topic: "DynamoDB",
  question: "Qual recurso do DynamoDB permite limitar a taxa de leitura e escrita para evitar custos excessivos?",
  options: [
    "Auto Scaling",
    "Provisioned Throughput",
    "On-Demand Capacity",
    "Global Tables"
  ],
  correct: 1,
  explanation: "Provisioned Throughput define limites de RCUs e WCUs, controlando a taxa de leitura e escrita da tabela."
},
{
  id: 53,
  topic: "S3",
  question: "Qual recurso do S3 permite hospedar um site estático diretamente em um bucket?",
  options: [
    "Bucket Policy",
    "Static Website Hosting",
    "Lifecycle Rules",
    "Replication"
  ],
  correct: 1,
  explanation: "Static Website Hosting transforma um bucket S3 em servidor de arquivos estáticos, acessível via endpoint público."
},
{
  id: 54,
  topic: "API Gateway",
  question: "Qual recurso do API Gateway permite limitar requisições por segundo para proteger o backend?",
  options: [
    "Usage Plans",
    "Throttling",
    "Mapping Templates",
    "Stage Variables"
  ],
  correct: 1,
  explanation: "Throttling define limites de requisições por segundo e burst rate, protegendo o backend contra sobrecarga."
},
{
  id: 55,
  topic: "CloudWatch",
  question: "Qual recurso do CloudWatch permite analisar logs com consultas SQL-like?",
  options: [
    "CloudWatch Logs",
    "CloudWatch Insights",
    "CloudWatch Alarms",
    "CloudWatch Dashboards"
  ],
  correct: 1,
  explanation: "CloudWatch Logs Insights permite consultas avançadas sobre logs usando sintaxe similar a SQL."
},
{
  id: 56,
  topic: "IAM",
  question: "Qual recurso do IAM permite aplicar políticas baseadas em condições como horário ou IP de origem?",
  options: [
    "IAM Roles",
    "IAM Policies com Condition",
    "IAM Groups",
    "IAM Federation"
  ],
  correct: 1,
  explanation: "As IAM Policies suportam o bloco Condition, permitindo restringir acesso por horário, IP ou outros atributos."
},
{
  id: 57,
  topic: "ECS",
  question: "Qual recurso do ECS permite distribuir tráfego entre múltiplas tasks de um serviço?",
  options: [
    "Elastic Load Balancer",
    "Cluster Capacity Providers",
    "Service Auto Scaling",
    "Task Definition"
  ],
  correct: 0,
  explanation: "Elastic Load Balancer distribui tráfego entre tasks ECS, garantindo alta disponibilidade e balanceamento."
},
{
  id: 58,
  topic: "Elastic Beanstalk",
  question: "Qual recurso do Elastic Beanstalk permite configurar pacotes adicionais e ajustes no ambiente?",
  options: [
    "Configuration Files (.ebextensions)",
    "Scaling Policies",
    "Deployment Policies",
    "Health Checks"
  ],
  correct: 0,
  explanation: "Arquivos .ebextensions permitem instalar pacotes, configurar variáveis e ajustar o ambiente durante o deploy."
},
{
  id: 59,
  topic: "Cognito",
  question: "Qual recurso do Cognito permite autenticar usuários sem precisar criar contas locais?",
  options: [
    "Federation com provedores externos",
    "User Pools",
    "Identity Pools",
    "IAM Federation"
  ],
  correct: 0,
  explanation: "A federação com provedores externos (Google, Facebook, etc.) permite autenticar usuários sem contas locais."
},
{
  id: 60,
  topic: "X-Ray",
  question: "Qual recurso do X-Ray permite dividir uma requisição em partes para análise detalhada?",
  options: [
    "Segments",
    "Annotations",
    "Sampling Rules",
    "Service Map"
  ],
  correct: 0,
  explanation: "Segments representam partes de uma requisição, como chamadas a serviços, permitindo análise detalhada de latência."
}
,{
  id: 61,
  topic: "Lambda",
  question: "Qual recurso do Lambda permite executar funções em horários programados sem depender de eventos externos?",
  options: [
    "CloudWatch Events (EventBridge)",
    "Provisioned Concurrency",
    "Layers",
    "API Gateway Trigger"
  ],
  correct: 0,
  explanation: "CloudWatch Events (EventBridge) permite agendar execuções de funções Lambda em intervalos regulares ou horários específicos."
},
{
  id: 62,
  topic: "DynamoDB",
  question: "Qual recurso do DynamoDB permite replicar dados automaticamente entre múltiplas regiões?",
  options: [
    "Global Tables",
    "Streams",
    "Secondary Indexes",
    "On-Demand Capacity"
  ],
  correct: 0,
  explanation: "Global Tables replicam dados entre regiões, garantindo baixa latência e alta disponibilidade em aplicações globais."
},
{
  id: 63,
  topic: "S3",
  question: "Qual recurso do S3 permite bloquear exclusões acidentais de objetos versionados?",
  options: [
    "Bucket Policy",
    "MFA Delete",
    "Lifecycle Rules",
    "Replication"
  ],
  correct: 1,
  explanation: "MFA Delete exige autenticação multifator para excluir versões de objetos, protegendo contra exclusões acidentais."
},
{
  id: 64,
  topic: "API Gateway",
  question: "Qual recurso do API Gateway permite reduzir custos cacheando respostas de backend?",
  options: [
    "Stage Variables",
    "Response Caching",
    "Usage Plans",
    "Mapping Templates"
  ],
  correct: 1,
  explanation: "Response Caching armazena respostas em cache, reduzindo chamadas ao backend e melhorando desempenho."
},
{
  id: 65,
  topic: "CloudWatch",
  question: "Qual recurso do CloudWatch permite correlacionar métricas e logs para análise avançada?",
  options: [
    "CloudWatch Logs",
    "CloudWatch Alarms",
    "CloudWatch Logs Insights",
    "CloudWatch Dashboards"
  ],
  correct: 2,
  explanation: "CloudWatch Logs Insights permite consultas avançadas em logs, correlacionando com métricas para diagnóstico detalhado."
},
{
  id: 66,
  topic: "IAM",
  question: "Qual recurso do IAM permite conceder acesso temporário a serviços AWS sem criar usuários permanentes?",
  options: [
    "IAM Roles",
    "IAM Groups",
    "IAM Policies",
    "IAM Federation"
  ],
  correct: 0,
  explanation: "IAM Roles fornecem credenciais temporárias que podem ser assumidas por serviços ou usuários externos."
},
{
  id: 67,
  topic: "ECS",
  question: "Qual recurso do ECS permite executar containers com diferentes requisitos de capacidade no mesmo cluster?",
  options: [
    "Capacity Providers",
    "Service Auto Scaling",
    "Task Definition",
    "Elastic Load Balancer"
  ],
  correct: 0,
  explanation: "Capacity Providers permitem definir diferentes estratégias de capacidade (EC2 ou Fargate) dentro de um mesmo cluster ECS."
},
{
  id: 68,
  topic: "Elastic Beanstalk",
  question: "Qual recurso do Elastic Beanstalk permite monitorar a saúde das instâncias e reiniciá-las automaticamente?",
  options: [
    "Health Checks",
    "Scaling Policies",
    "Deployment Policies",
    "Configuration Files"
  ],
  correct: 0,
  explanation: "Health Checks monitoram a saúde das instâncias e reiniciam automaticamente aquelas que falham."
},
{
  id: 69,
  topic: "Cognito",
  question: "Qual recurso do Cognito permite que usuários redefinam suas senhas de forma segura?",
  options: [
    "User Pools",
    "Identity Pools",
    "IAM Federation",
    "STS AssumeRole"
  ],
  correct: 0,
  explanation: "User Pools oferecem fluxo de redefinição de senha seguro, incluindo envio de código de verificação por email ou SMS."
},
{
  id: 70,
  topic: "X-Ray",
  question: "Qual recurso do X-Ray permite visualizar a latência acumulada em cada serviço de uma aplicação distribuída?",
  options: [
    "Service Map",
    "Annotations",
    "Segments",
    "Sampling Rules"
  ],
  correct: 0,
  explanation: "O Service Map mostra graficamente os serviços envolvidos e a latência acumulada em cada um, facilitando a identificação de gargalos."
}
,{
  id: 71,
  topic: "Lambda",
  question: "Qual recurso do Lambda permite controlar a quantidade máxima de memória usada pela função?",
  options: [
    "Timeout",
    "Memory Allocation",
    "Provisioned Concurrency",
    "Layers"
  ],
  correct: 1,
  explanation: "Cada função Lambda pode ser configurada com memória entre 128 MB e 10 GB, impactando também o poder de CPU disponível."
},
{
  id: 72,
  topic: "DynamoDB",
  question: "Qual recurso do DynamoDB permite executar transações atômicas envolvendo múltiplos itens?",
  options: [
    "BatchGetItem",
    "TransactWriteItems",
    "Global Tables",
    "Streams"
  ],
  correct: 1,
  explanation: "TransactWriteItems permite operações atômicas envolvendo múltiplos itens e tabelas, garantindo consistência."
},
{
  id: 73,
  topic: "S3",
  question: "Qual recurso do S3 permite restringir acesso a objetos apenas via CloudFront?",
  options: [
    "Bucket Policy",
    "Origin Access Identity (OAI)",
    "Lifecycle Rules",
    "Replication"
  ],
  correct: 1,
  explanation: "OAI permite que apenas o CloudFront acesse objetos do S3, protegendo contra acessos diretos ao bucket."
},
{
  id: 74,
  topic: "API Gateway",
  question: "Qual recurso do API Gateway permite versionar diferentes ambientes da API?",
  options: [
    "Stages",
    "Usage Plans",
    "Mapping Templates",
    "Resource Policies"
  ],
  correct: 0,
  explanation: "Stages permitem criar ambientes separados (dev, test, prod) com configurações distintas para a mesma API."
},
{
  id: 75,
  topic: "CloudWatch",
  question: "Qual recurso do CloudWatch permite reagir a alterações de estado em métricas?",
  options: [
    "CloudWatch Logs",
    "CloudWatch Alarms",
    "CloudWatch Dashboards",
    "CloudWatch Insights"
  ],
  correct: 1,
  explanation: "CloudWatch Alarms monitoram métricas e disparam ações quando valores ultrapassam limites definidos."
},
{
  id: 76,
  topic: "IAM",
  question: "Qual recurso do IAM permite aplicar políticas automaticamente a múltiplos serviços AWS?",
  options: [
    "Service Control Policies (SCP)",
    "IAM Roles",
    "IAM Groups",
    "IAM Federation"
  ],
  correct: 0,
  explanation: "SCPs são aplicadas em nível de organização (AWS Organizations), controlando permissões de múltiplas contas e serviços."
},
{
  id: 77,
  topic: "ECS",
  question: "Qual recurso do ECS permite executar containers em instâncias EC2 gerenciadas pelo usuário?",
  options: [
    "Fargate Launch Type",
    "EC2 Launch Type",
    "Capacity Providers",
    "Service Auto Scaling"
  ],
  correct: 1,
  explanation: "O EC2 Launch Type permite executar tasks ECS em instâncias EC2 provisionadas e gerenciadas pelo usuário."
},
{
  id: 78,
  topic: "Elastic Beanstalk",
  question: "Qual recurso do Elastic Beanstalk permite configurar diferentes ambientes para a mesma aplicação?",
  options: [
    "Environment Tiers",
    "Scaling Policies",
    "Deployment Policies",
    "Health Checks"
  ],
  correct: 0,
  explanation: "Environment Tiers permitem criar ambientes distintos (Web Server ou Worker) para a mesma aplicação."
},
{
  id: 79,
  topic: "Cognito",
  question: "Qual recurso do Cognito permite autenticar usuários via SMS ou email?",
  options: [
    "MFA (Multi-Factor Authentication)",
    "User Pools",
    "Identity Pools",
    "IAM Federation"
  ],
  correct: 1,
  explanation: "User Pools suportam autenticação via SMS ou email, incluindo MFA para maior segurança."
},
{
  id: 80,
  topic: "X-Ray",
  question: "Qual recurso do X-Ray permite identificar gargalos em chamadas externas feitas pela Lambda?",
  options: [
    "Segments",
    "Annotations",
    "Service Map",
    "Sampling Rules"
  ],
  correct: 0,
  explanation: "Segments detalham chamadas externas, permitindo identificar latência ou falhas em serviços externos."
},
{
  id: 81,
  topic: "Lambda",
  question: "Qual recurso do Lambda permite limitar o tempo máximo de execução da função?",
  options: [
    "Timeout",
    "Memory Allocation",
    "Provisioned Concurrency",
    "Layers"
  ],
  correct: 0,
  explanation: "O Timeout define o tempo máximo de execução da função, entre 1 segundo e 15 minutos."
},
{
  id: 82,
  topic: "DynamoDB",
  question: "Qual recurso do DynamoDB permite criar índices locais baseados na chave de partição?",
  options: [
    "Global Secondary Index",
    "Local Secondary Index",
    "Streams",
    "BatchGetItem"
  ],
  correct: 1,
  explanation: "Local Secondary Index (LSI) permite criar índices adicionais baseados na mesma chave de partição da tabela."
},
{
  id: 83,
  topic: "S3",
  question: "Qual recurso do S3 permite auditar acessos e operações realizadas em objetos?",
  options: [
    "Bucket Policy",
    "Access Logs",
    "Lifecycle Rules",
    "Replication"
  ],
  correct: 1,
  explanation: "Access Logs registram acessos e operações realizadas em objetos do bucket, úteis para auditoria e segurança."
},
{
  id: 84,
  topic: "API Gateway",
  question: "Qual recurso do API Gateway permite proteger endpoints com regras de firewall?",
  options: [
    "Resource Policies",
    "WAF Integration",
    "Usage Plans",
    "Mapping Templates"
  ],
  correct: 1,
  explanation: "O AWS WAF pode ser integrado ao API Gateway para aplicar regras de firewall e proteger contra ataques."
},
{
  id: 85,
  topic: "CloudWatch",
  question: "Qual recurso do CloudWatch permite criar alertas baseados em métricas customizadas?",
  options: [
    "CloudWatch Logs",
    "CloudWatch Alarms",
    "Custom Metrics",
    "CloudWatch Dashboards"
  ],
  correct: 2,
  explanation: "Custom Metrics permitem enviar métricas definidas pelo usuário ao CloudWatch e criar alarmes baseados nelas."
},
{
  id: 86,
  topic: "IAM",
  question: "Qual recurso do IAM permite autenticar usuários corporativos via Active Directory?",
  options: [
    "IAM Federation",
    "IAM Roles",
    "IAM Groups",
    "IAM Policies"
  ],
  correct: 0,
  explanation: "IAM Federation permite autenticar usuários corporativos via Active Directory ou outros provedores de identidade."
},
{
  id: 87,
  topic: "ECS",
  question: "Qual recurso do ECS permite definir como containers devem ser executados (imagem, CPU, memória)?",
  options: [
    "Task Definition",
    "Service Auto Scaling",
    "Capacity Providers",
    "Elastic Load Balancer"
  ],
  correct: 0,
  explanation: "Task Definition define os parâmetros de execução dos containers, como imagem, CPU, memória e variáveis de ambiente."
},
{
  id: 88,
  topic: "Elastic Beanstalk",
  question: "Qual recurso do Elastic Beanstalk permite atualizar a aplicação sem downtime usando batches?",
  options: [
    "Rolling Deployments",
    "Immutable Deployments",
    "All at Once",
    "Blue/Green Deployments"
  ],
  correct: 0,
  explanation: "Rolling Deployments atualizam instâncias em lotes, evitando downtime durante o processo."
},
{
  id: 89,
  topic: "Cognito",
  question: "Qual recurso do Cognito permite autenticação multifator para maior segurança?",
  options: [
    "User Pools",
    "Identity Pools",
    "MFA",
    "IAM Federation"
  ],
  correct: 2,
  explanation: "MFA adiciona uma camada extra de segurança exigindo múltiplos fatores de autenticação, como senha e código SMS."
},
{
  id: 90,
  topic: "X-Ray",
  question: "Qual recurso do X-Ray permite visualizar estatísticas agregadas de múltiplos traces?",
  options: [
    "Service Map",
    "Segments",
    "Trace Summaries",
    "Annotations"
  ],
  correct: 2,
  explanation: "Trace Summaries mostram estatísticas agregadas de múltiplos traces, facilitando a análise de padrões de desempenho."
}
],