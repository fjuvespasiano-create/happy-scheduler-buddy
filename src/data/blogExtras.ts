import type { Post, PostBloco } from "./blog";

/**
 * 20 artigos manuais adicionais (todos ≥ 2.000 caracteres no corpo).
 * Foco em SEO local (Vespasiano / São José da Lapa / RMBH) e dicas práticas
 * que ajudam o leitor — nada de "blá-blá-blá".
 */

interface Draft {
  slug: string;
  titulo: string;
  resumo: string;
  data: string;
  categoria: string;
  keywords: string[];
  intro: string;
  secoes: { h2: string; p: string; ul?: string[]; p2?: string }[];
  fechamento: string;
}

function build(d: Draft): Post {
  const conteudo: PostBloco[] = [
    { tipo: "p", texto: d.intro },
  ];
  for (const s of d.secoes) {
    conteudo.push({ tipo: "h2", texto: s.h2 });
    conteudo.push({ tipo: "p", texto: s.p });
    if (s.ul && s.ul.length) conteudo.push({ tipo: "ul", itens: s.ul });
    if (s.p2) conteudo.push({ tipo: "p", texto: s.p2 });
  }
  conteudo.push({ tipo: "p", texto: d.fechamento });
  conteudo.push({ tipo: "cta" });

  return {
    slug: d.slug,
    titulo: d.titulo,
    resumo: d.resumo,
    data: d.data,
    leitura: "6 min",
    categoria: d.categoria,
    tipo: "manual",
    keywords: d.keywords,
    conteudo,
  };
}

const DRAFTS: Draft[] = [
  {
    slug: "como-tirar-mancha-de-cafe-do-sofa",
    titulo: "Como tirar mancha de café do sofá sem manchar mais ainda",
    resumo: "O método correto para neutralizar café derramado no estofado, com produtos que você já tem em casa.",
    data: "2026-05-02",
    categoria: "Sofá",
    keywords: ["mancha de café no sofá", "como tirar café do sofá", "limpar café estofado"],
    intro:
      "Café derramado no sofá é um dos acidentes domésticos mais comuns — e um dos que mais geram pânico. A primeira reação quase sempre é errada: pegar um pano molhado e esfregar com força. Esse movimento espalha o líquido para uma área maior, empurra o pigmento para o miolo da espuma e cria uma mancha circular maior do que o estrago original. Neste guia você vai ver exatamente como agir nos primeiros 5 minutos, quais produtos caseiros realmente funcionam, quais pioram e quando vale chamar um profissional. As orientações valem para sofás de tecido, suede, linho e até veludo, com pequenas adaptações que vamos detalhar abaixo.",
    secoes: [
      {
        h2: "Os primeiros 5 minutos: o que fazer agora",
        p: "Tempo é tudo quando o assunto é mancha de café. Os tanninos do café se ligam rapidamente às fibras do tecido — quanto mais tempo passar, mais difícil será removê-los. A regra de ouro é absorver, não esfregar.",
        ul: [
          "Use papel toalha ou um pano branco seco e pressione sobre a mancha (sem movimentos circulares)",
          "Repita até não sair mais líquido para o pano",
          "Misture 1 colher de sopa de detergente neutro em 500 ml de água morna",
          "Umedeça (não encharque) outro pano nessa solução e dê toques leves sobre a mancha, sempre da borda para o centro",
          "Finalize com pano apenas com água limpa para retirar o sabão",
        ],
        p2: "Se ainda restar uma sombra clara, polvilhe bicarbonato de sódio sobre a área úmida, deixe agir por 30 minutos e aspire. O bicarbonato absorve o pigmento residual e ajuda a neutralizar odor.",
      },
      {
        h2: "O que NÃO fazer (e por quê)",
        p: "Algumas reações instintivas pioram drasticamente o estrago. Se você já cometeu um desses erros, pare imediatamente e siga o passo a passo acima.",
        ul: [
          "Não use água quente: ajuda o tannin a se fixar nas fibras",
          "Não use água sanitária ou cloro: descolore o tecido permanentemente",
          "Não use secador de cabelo: o calor cozinha a mancha e ela vira amarelo permanente",
          "Não esfregue com escova: arranha o tecido e desfia veludos e suedes",
          "Não cubra com sal de cozinha: gruda na espuma e atrai umidade depois",
        ],
      },
      {
        h2: "Quando chamar a higienização profissional",
        p: "Manchas antigas (mais de 24 horas), café com leite (que adiciona gordura à equação) ou tecidos delicados como veludo francês e linho cru raramente saem com tratamento caseiro. Nesses casos, o profissional usa enzimas específicas que quebram tanto o pigmento quanto a gordura, sem agredir a fibra. Em Vespasiano, São José da Lapa e bairros vizinhos, o atendimento sai no mesmo dia em boa parte das solicitações — o ideal é chamar antes que a mancha complete 48 horas.",
      },
    ],
    fechamento:
      "Mancha de café tem solução, desde que você aja rápido e do jeito certo. Se ainda restou marca depois do passo a passo, mande uma foto pelo WhatsApp e te dizemos honestamente se vale ou não uma higienização profissional.",
  },
  {
    slug: "como-tirar-mancha-de-vinho-tinto",
    titulo: "Mancha de vinho tinto no sofá: guia de emergência (e o que evita o pior)",
    resumo: "O passo a passo emergencial para vinho tinto derramado em tecido claro, suede ou veludo.",
    data: "2026-05-03",
    categoria: "Sofá",
    keywords: ["mancha de vinho no sofá", "tirar vinho tinto tecido", "limpar vinho derramado"],
    intro:
      "Poucas manchas assustam tanto quanto vinho tinto em sofá claro. O pigmento (antocianina) penetra no tecido em segundos e, se entrar em contato com calor ou produtos errados, vira uma mancha permanente arroxeada. A boa notícia é que, agindo nos primeiros minutos com a técnica certa, dá para reverter quase 100% do estrago — mesmo em suede e veludo. O segredo está em três princípios: absorver sem esfregar, neutralizar com produto certo e nunca usar água quente. Aqui vai o método que usamos profissionalmente, adaptado para você executar em casa enquanto chama (ou avalia se precisa chamar) um higienizador.",
    secoes: [
      {
        h2: "Ação imediata (primeiros 2 minutos)",
        p: "Quanto mais rápido você absorver o líquido, menos pigmento se fixa. Esqueça pano colorido — ele pode soltar tinta no seu sofá.",
        ul: [
          "Pegue várias folhas de papel toalha branco e pressione com força sobre a mancha",
          "Troque o papel várias vezes até parar de sair vinho",
          "Polvilhe sal grosso ou bicarbonato de sódio cobrindo toda a mancha (puxa o líquido)",
          "Deixe agir por 10 a 15 minutos enquanto prepara a solução de limpeza",
        ],
      },
      {
        h2: "Solução caseira que funciona",
        p: "A receita mais eficaz combina água gelada, detergente neutro e vinagre branco. Cada componente tem uma função: a água gelada impede a fixação, o detergente quebra a parte oleosa do tannin e o vinagre neutraliza o pigmento.",
        ul: [
          "500 ml de água gelada",
          "1 colher de sopa de detergente neutro",
          "1 colher de sopa de vinagre branco",
          "Aspire o sal/bicarbonato antes de aplicar",
          "Umedeça pano branco na solução e dê toques leves, da borda para o centro",
          "Repita até a mancha clarear; finalize com pano só com água",
        ],
        p2: "Para sofá de couro, pule o sal e o vinagre — use apenas detergente diluído e seque imediatamente com pano macio. Para veludo, vá com toques bem leves: esfregar arranca o pelo do tecido.",
      },
      {
        h2: "Prevenção para próximos eventos",
        p: "Se você costuma receber em casa, vale impermeabilizar o sofá. A película invisível dá entre 3 e 5 minutos para você correr com o pano antes do líquido penetrar. É a diferença entre uma mancha que sai e uma que vira história permanente do seu sofá. Em Vespasiano e São José da Lapa, o serviço dura cerca de 1 hora e protege por 12 a 18 meses.",
      },
    ],
    fechamento:
      "Vinho tinto não precisa ser sentença. Com agilidade e a técnica certa, dá para salvar. Se sobrou uma sombra rosada, é hora do profissional — quanto antes, mais chance de remover por completo.",
  },
  {
    slug: "higienizacao-poltrona-reclinavel-cuidados",
    titulo: "Higienização de poltrona reclinável: cuidados que muita empresa ignora",
    resumo: "Por que poltronas reclináveis exigem técnica diferente — e o que perguntar antes de contratar.",
    data: "2026-05-04",
    categoria: "Sofá",
    keywords: ["higienização poltrona reclinável", "limpeza poltrona", "lavar poltrona reclinável"],
    intro:
      "Poltrona reclinável é uma das peças mais usadas da sala, mas também uma das mais delicadas para higienizar. Por dentro, ela tem mecanismo elétrico ou manual de reclinação, mola, rolamento e fiação — em alguns modelos, motor 12V e USB. Se a água escorrer para esses componentes durante uma lavagem mal feita, o estrago é grande: pode haver curto, oxidação, travamento da reclinação e até risco de choque. Boa parte das empresas trata uma reclinável como sofá comum, e os problemas aparecem semanas depois. Aqui vai o que diferencia uma higienização correta — e o que você deve perguntar antes de contratar qualquer serviço, em qualquer cidade.",
    secoes: [
      {
        h2: "Por que reclinável não é sofá comum",
        p: "A estrutura interna tem peças metálicas que oxidam em contato com umidade prolongada. Pior: o assento e o encosto se movem em vários ângulos, criando dobras profundas onde acumula muito mais sujeira do que num sofá fixo. Sem técnica e equipamento específicos, a higienização ou deixa sujeira escondida nas dobras, ou molha demais e arruína o mecanismo.",
        ul: [
          "Mecanismo de reclinação metálico (oxida com umidade)",
          "Motor elétrico em modelos automáticos (não pode molhar)",
          "Cabo USB e tomada interna (risco elétrico)",
          "Dobras profundas que acumulam migalhas, pelo de pet e ácaros",
          "Espuma de alta densidade que retém umidade por mais tempo",
        ],
      },
      {
        h2: "O método correto",
        p: "A higienização profissional começa desligando a poltrona da tomada e protegendo motor e cabos com plástico. A extração é feita com pressão controlada, sem encharcar, e a aspiração úmida puxa quase 100% da água aplicada. As dobras são abertas uma a uma, aspiradas por dentro e tratadas com pré-spray específico para o tipo de tecido.",
        ul: [
          "Desligar e proteger motor/cabos",
          "Aspiração profunda de cada dobra com bico fino",
          "Pré-spray adequado ao tecido (suede, couro, courino, tecido)",
          "Extração com pressão moderada, evitando encharcar",
          "Secagem assistida com ventilador para liberar uso em poucas horas",
        ],
        p2: "Em Vespasiano e São José da Lapa, é comum recebermos poltronas que foram “higienizadas” por outra empresa e ficaram com cheiro de mofo dias depois — sinal clássico de excesso de água que não foi extraído.",
      },
      {
        h2: "Perguntas para fazer antes de contratar",
        p: "Antes de aceitar qualquer orçamento, faça três perguntas. Se a empresa hesitar em qualquer uma, busque outra opção:",
        ul: [
          "Vocês têm experiência com reclinável elétrica?",
          "Como vocês protegem o motor e os cabos durante a lavagem?",
          "Em quanto tempo a poltrona libera o uso novamente?",
        ],
      },
    ],
    fechamento:
      "Reclinável bem cuidada dura 10 a 15 anos. Mal higienizada, o mecanismo trava em 2 ou 3. Vale a pena escolher um profissional que conheça o produto.",
  },
  {
    slug: "lavagem-a-seco-vs-extracao-umida",
    titulo: "Lavagem a seco x extração úmida: qual é melhor para seu sofá?",
    resumo: "Comparativo honesto entre os dois principais métodos de higienização — vantagens, riscos e quando usar cada um.",
    data: "2026-05-05",
    categoria: "Sofá",
    keywords: ["lavagem a seco sofá", "extração úmida sofá", "diferença lavagem sofá"],
    intro:
      "Ao pesquisar higienização de estofado, você inevitavelmente esbarra nos termos “lavagem a seco” e “extração úmida”. As duas técnicas existem, são legítimas e cada uma tem o seu lugar. O problema é que muita propaganda usa “a seco” como argumento de venda, dando a entender que é sempre superior — o que não é verdade. A escolha certa depende do tipo de tecido, do nível de sujeira, da presença de odor ou pet e até da estação do ano. Esse artigo explica como cada método funciona, em que casos brilha e em quais não vale o investimento.",
    secoes: [
      {
        h2: "Como funciona a lavagem a seco",
        p: "Apesar do nome, a lavagem “a seco” usa solventes ou pó encapsulador — ela só é seca em comparação à extração com água. A técnica encapsula a sujeira numa partícula que depois é aspirada. Funciona muito bem em tecidos sensíveis à água (camurça, suede sintético antigo, alguns veludos) e em sujeiras leves. A grande vantagem é o tempo de secagem (1 hora ou menos), o que ajuda em apartamentos pequenos e épocas de chuva.",
        ul: [
          "Indicada para tecidos sensíveis à água",
          "Secagem rápida (até 1 hora)",
          "Boa para manutenção de sofás já higienizados",
          "Limitada para manchas profundas e odor de pet",
        ],
      },
      {
        h2: "Como funciona a extração úmida",
        p: "Aqui entra a famosa “extratora”. Ela injeta solução higienizadora no tecido sob pressão e suga imediatamente, junto com a sujeira dissolvida. É a técnica mais profunda, capaz de remover xixi de pet, suor cristalizado, manchas antigas e ácaros. A secagem leva de 4 a 8 horas, dependendo do tecido e da ventilação. É o método de escolha para a maioria dos sofás de tecido e linho — e também para colchões.",
        ul: [
          "Limpeza profunda na espuma e fibra",
          "Remove odor de pet, suor, mofo e manchas antigas",
          "Indicada para colchões, sofás de tecido e linho",
          "Requer equipamento profissional (não é jato de água doméstico)",
        ],
        p2: "Em Vespasiano e São José da Lapa, em mais de 80% dos atendimentos a extração úmida é o método correto. A lavagem a seco entra como complemento em peças muito delicadas ou em manutenção entre limpezas profundas.",
      },
      {
        h2: "Como escolher",
        p: "A regra prática: se o sofá tem cheiro forte, mancha antiga ou pet, vá de extração úmida. Se é manutenção rotineira de um sofá já bem cuidado ou tecido delicado, a seco resolve. Profissionais sérios avaliam a peça e escolhem o método — desconfie de quem oferece um único caminho para qualquer caso.",
      },
    ],
    fechamento:
      "Não existe método “mágico” universal. Existe técnica certa para cada situação. Manda uma foto do seu sofá pelo WhatsApp e indicamos o método ideal — sem empurrar serviço.",
  },
  {
    slug: "como-cuidar-de-sofa-de-couro-mg",
    titulo: "Como cuidar de sofá de couro no clima de Minas Gerais",
    resumo: "Umidade, calor e ar seco — os três inimigos do couro em MG e o que fazer em cada estação.",
    data: "2026-05-06",
    categoria: "Sofá",
    keywords: ["cuidar sofá de couro", "manutenção couro Vespasiano", "limpeza sofá de couro"],
    intro:
      "O sofá de couro é símbolo de elegância e durabilidade — mas só dura décadas se receber o cuidado certo. E o clima de Minas Gerais é particularmente desafiador: ar seco no inverno (junho a agosto), muita umidade no verão (outubro a março), poeira fina o ano inteiro e oscilação grande de temperatura entre dia e noite. Esse pacote climático ataca a estrutura do couro de forma diferente em cada estação, e cuidar dele significa adaptar a rotina ao calendário. Aqui está o que faz diferença real no longo prazo, especialmente para quem mora em Vespasiano, São José da Lapa, Lagoa Santa e cidades vizinhas da região metropolitana norte.",
    secoes: [
      {
        h2: "Inverno (ar seco): hidratação obrigatória",
        p: "De junho a agosto, a umidade do ar em MG cai abaixo de 30% em vários dias. O couro perde elasticidade, ressaca e começa a apresentar microfissuras — o famoso “quebradiço”. A hidratação periódica restaura óleos naturais e impede o craqueamento.",
        ul: [
          "Aplicar hidratante específico para couro a cada 60 dias",
          "Usar pano macio em movimentos circulares, em camada fina",
          "Evitar produtos com silicone (deixam pegajoso e atraem poeira)",
          "Manter o sofá longe de aquecedor e luz solar direta",
        ],
      },
      {
        h2: "Verão (umidade alta): atenção ao mofo",
        p: "Entre outubro e março, a umidade alta combinada com calor cria ambiente perfeito para fungos — inclusive na superfície e nas costuras do couro. O cheiro de mofo aparece primeiro nas partes que ficam encostadas na parede.",
        ul: [
          "Afastar o sofá pelo menos 10 cm da parede",
          "Limpar com pano úmido (água + detergente neutro a 1%) a cada 15 dias",
          "Secar imediatamente com pano seco — couro não pode ficar úmido",
          "Em ambientes muito úmidos, considerar desumidificador",
        ],
      },
      {
        h2: "Manutenção anual profissional",
        p: "Mesmo seguindo a rotina, o couro acumula sebo (gordura do contato com a pele), poeira e produtos de limpeza ao longo dos meses. A higienização profissional anual com produtos específicos remove esse acúmulo, restaura o brilho natural e prolonga a vida útil em vários anos. O serviço é rápido (geralmente menos de 2 horas) e o sofá fica seco na hora.",
      },
    ],
    fechamento:
      "Couro bem cuidado dura 20+ anos. Couro negligenciado começa a craquelar em 5. Não é luxo — é manutenção básica para um móvel caro.",
  },
  {
    slug: "carro-com-cheiro-de-mofo-como-resolver",
    titulo: "Carro com cheiro de mofo: por que acontece e como resolver de vez",
    resumo: "Diagnóstico, causas reais e o método profissional para eliminar o cheiro de mofo no carro de uma vez.",
    data: "2026-05-07",
    categoria: "Automotiva",
    keywords: ["cheiro de mofo no carro", "tirar mofo carro", "higienização interna carro Vespasiano"],
    intro:
      "Cheiro de mofo no carro nunca é “coincidência”. É sempre sinal de algo concreto: vazamento, infiltração, tapete molhado escondido, ar-condicionado contaminado ou bagagem úmida esquecida no porta-malas. Disfarçar com aromatizante só piora — o produto se mistura ao mofo e cria um cheiro pior ainda em poucas semanas. Para resolver de verdade, é preciso achar a fonte, secar a fundo e higienizar o sistema de ventilação. Em Vespasiano e São José da Lapa, com clima úmido boa parte do ano, esse problema é especialmente comum em carros usados ou guardados em garagem fechada sem ventilação.",
    secoes: [
      {
        h2: "As 5 causas mais comuns",
        p: "Antes de qualquer higienização, vale uma inspeção rápida para identificar a fonte. Se o problema persistir, qualquer limpeza é paliativa.",
        ul: [
          "Tapete molhado por chuva ou bebida derramada e nunca seco corretamente",
          "Vedação da porta ou para-brisa danificada (entra água em dia de chuva)",
          "Filtro do ar-condicionado vencido e contaminado por fungos",
          "Roupa de academia ou toalha úmida esquecida no porta-malas",
          "Estepe molhado por infiltração no compartimento traseiro",
        ],
      },
      {
        h2: "O método profissional para eliminar de vez",
        p: "Na higienização interna automotiva, o profissional faz quatro etapas obrigatórias. Pular qualquer uma delas significa que o cheiro vai voltar.",
        ul: [
          "Aspiração profunda de bancos, carpete, porta-malas e estepe",
          "Extração úmida com produto antifúngico em todos os tecidos",
          "Limpeza e descontaminação dos dutos de ar-condicionado (ozônio ou spray)",
          "Substituição do filtro de cabine (se vencido)",
          "Secagem assistida com circulação de ar por algumas horas",
        ],
        p2: "Em casos graves (carro com infiltração antiga), pode ser necessário desmontar bancos para secar a manta acústica embaixo. Sem essa etapa, o cheiro volta em 2 semanas.",
      },
      {
        h2: "Como evitar que volte",
        p: "Depois da higienização, vale adotar três hábitos simples que mantêm o problema longe:",
        ul: [
          "Trocar o filtro do ar-condicionado a cada 12 meses ou 15 mil km",
          "Manter o carro ventilado nos dias de sol (vidros abertos por 10 min)",
          "Não deixar roupas, toalhas ou bagagem úmida no veículo",
        ],
      },
    ],
    fechamento:
      "Mofo no carro tem solução definitiva — desde que a fonte seja encontrada. Se você está faz semanas tentando aromatizante e o cheiro insiste, é sinal claro de que precisa de higienização profissional.",
  },
  {
    slug: "limpeza-pos-festa-infantil",
    titulo: "Limpeza pós-festa infantil: 7 estratégias para salvar seu sofá",
    resumo: "Suco, doce, biscoito amassado e canetinha: o que fazer (e em que ordem) depois da festa das crianças.",
    data: "2026-05-08",
    categoria: "Sofá",
    keywords: ["limpeza pós festa infantil", "tirar suco do sofá", "limpar canetinha sofá"],
    intro:
      "Festa de criança termina, todo mundo vai embora e a sala parece um campo de batalha. Suco no sofá, biscoito esmigalhado nas frestas, canetinha no encosto, marshmallow grudado no braço da poltrona. A maioria das pessoas joga uma toalha por cima e deixa para depois — erro: as primeiras horas são as mais valiosas para evitar mancha permanente. Aqui está o roteiro de 7 passos que usamos profissionalmente para recuperar sofá depois de festa, da forma mais rápida e sem piorar o estrago.",
    secoes: [
      {
        h2: "Os 7 passos na ordem certa",
        p: "Faça nessa ordem — pular etapas só multiplica o trabalho.",
        ul: [
          "Recolha sólidos (biscoito, doce) com a mão ou colher, sem pressionar",
          "Aspire frestas e cantos com bocal fino",
          "Identifique manchas líquidas e pressione papel toalha (não esfregue)",
          "Trate canetinha com leite morno em pano branco (toques leves)",
          "Trate doce/marshmallow com água morna + detergente neutro",
          "Polvilhe bicarbonato sobre áreas com cheiro e aspire após 30 min",
          "Areje o ambiente abrindo janelas por pelo menos 1 hora",
        ],
      },
      {
        h2: "Manchas específicas: o que funciona",
        p: "Cada tipo de mancha pede produto diferente. Veja as receitas que mais funcionam:",
        ul: [
          "Suco artificial colorido: água gelada + detergente, repetindo várias vezes",
          "Chocolate: água morna + sabão neutro, sempre da borda para o centro",
          "Canetinha: leite morno desfaz o pigmento; depois, pano com água",
          "Marshmallow seco: amolecer com pano úmido morno, depois remover devagar",
          "Tinta guache: água + sabão neutro nos primeiros minutos; passou de 2 horas, vira caso profissional",
        ],
        p2: "Resista à tentação de usar álcool em todos os casos — em alguns tecidos, o álcool descolore.",
      },
      {
        h2: "Quando vale chamar um profissional",
        p: "Se a festa teve mais de 5 crianças, se o sofá é claro, suede ou veludo, ou se você descobriu manchas só no dia seguinte, vale a pena uma higienização profissional. O custo é baixo perto de uma reupholsteria ou troca de sofá. Em Vespasiano e São José da Lapa, conseguimos atender no mesmo dia em muitos casos — o que faz toda a diferença para manchas frescas.",
      },
    ],
    fechamento:
      "Festa infantil é alegria. Estofado destruído não precisa fazer parte do pacote. Com método e agilidade, dá para salvar quase tudo.",
  },
  {
    slug: "tapete-sujo-lavar-em-casa-ou-com-profissional",
    titulo: "Tapete sujo: lavar em casa ou chamar profissional?",
    resumo: "O guia honesto para decidir entre lavagem caseira e profissional, por tipo de tapete e nível de sujeira.",
    data: "2026-05-09",
    categoria: "Tapete",
    keywords: ["lavar tapete em casa", "higienização tapete Vespasiano", "como lavar tapete grande"],
    intro:
      "Lavar tapete em casa parece econômico, mas pode sair mais caro do que você imagina. Tapete grande, peludo ou delicado encharcado e mal seco vira foco de mofo em 48 horas — e pode entrar definitivamente para o lixo. Por outro lado, nem todo tapete precisa de profissional: peças pequenas, sintéticas e com sujeira leve dão conta sozinhas. Esse guia te ajuda a decidir de forma realista.",
    secoes: [
      {
        h2: "Quando dá para lavar em casa",
        p: "Tapetes pequenos (até 1,2 x 0,8 m), de fibras sintéticas (poliéster, polipropileno), sem trama complexa e com sujeira recente.",
        ul: [
          "Aspire dos dois lados antes de molhar",
          "Use água fria + sabão neutro (nada de água sanitária)",
          "Esfregue com escova macia, no sentido das fibras",
          "Enxágue muito bem (resíduo de sabão atrai sujeira)",
          "Seque pendurado em local arejado, longe de sol direto",
        ],
        p2: "Em apartamento, prefira lavar no boxe do banheiro ou na área de serviço com piso inclinado. Nunca deixe enrolado úmido por mais de 2 horas: cria mofo permanente.",
      },
      {
        h2: "Quando precisa de profissional",
        p: "Em qualquer um destes casos, evite tentar em casa — o risco de estragar o tapete é alto:",
        ul: [
          "Tapetes maiores que 1,5 x 2 m (não secam bem em residência)",
          "Lã, viscose, seda, sisal natural (encolhem ou amarelam com água)",
          "Tapetes persas, kilim, bordados (caros e delicados)",
          "Sujeira antiga, mancha de gordura, vinho ou sangue",
          "Cheiro de pet (xixi, bafo úmido, mofo)",
        ],
      },
      {
        h2: "Quanto custa em Vespasiano e São José da Lapa",
        p: "A higienização profissional de tapete em residência geralmente custa entre R$ 18 e R$ 35 por m², dependendo do material e da sujeira. Modelos delicados têm preço sob orçamento. O serviço é feito na sua casa, com extratora profissional, e o tapete fica seco em poucas horas. Manda uma foto pelo WhatsApp para receber o valor exato em minutos.",
      },
    ],
    fechamento:
      "Em dúvida, pergunte antes de tentar. Lavagem caseira mal feita pode ser irreversível — e tapete bonito não merece esse risco.",
  },
  {
    slug: "como-escolher-empresa-higienizacao",
    titulo: "Como escolher uma boa empresa de higienização (sem cair em furada)",
    resumo: "Os 8 sinais que separam empresa séria de improvisada — para você acertar de primeira.",
    data: "2026-05-10",
    categoria: "Dicas",
    keywords: ["escolher empresa higienização", "boa empresa lavagem sofá", "como contratar limpeza estofado"],
    intro:
      "Pesquisar “higienização de sofá perto de mim” traz dezenas de resultados — e dezenas de armadilhas. Tem profissional sério, mas tem muita empresa improvisada com balde, escova e nenhuma técnica. O resultado da escolha errada vai do óbvio (sofá molhado por dias, cheiro de mofo) ao caro (mancha permanente, tecido danificado, espuma comprometida). Esse checklist objetivo separa quem entrega resultado real de quem só promete.",
    secoes: [
      {
        h2: "8 sinais de empresa séria",
        p: "Não precisam estar todos presentes, mas a maioria sim. Quanto mais itens marcados, maior a confiança.",
        ul: [
          "Equipamento profissional aparecendo nas fotos (extratora, não só balde)",
          "Antes/depois reais publicados (com o mesmo ângulo e iluminação)",
          "Avaliações com nome e foto, não só estrelas anônimas",
          "Atendimento por WhatsApp claro, com diagnóstico antes do orçamento",
          "Faixa de preço transparente (não “a partir de R$ 39” genérico)",
          "Garantia escrita do serviço (mínimo 7 dias)",
          "Endereço físico ou área de cobertura claramente definida",
          "Profissional uniformizado e com identificação visual",
        ],
      },
      {
        h2: "Sinais de alerta (não contrate)",
        p: "Se você bater de frente com qualquer um destes, recue:",
        ul: [
          "Preço muito abaixo da média da região (geralmente serviço “de fachada”)",
          "Pressão para fechar na hora (“promoção só hoje”)",
          "Falta de fotos do equipamento e da equipe",
          "Sem avaliações ou avaliações todas iguais (suspeita)",
          "Recusa em mandar orçamento por escrito",
          "Atendimento pressuroso, sem perguntas técnicas sobre o seu sofá",
        ],
        p2: "Lembre: barato demais é o caminho mais rápido para gastar duas vezes. Higienização malfeita não “limpa o sofá”, ela cria problema novo (mofo, cheiro, mancha).",
      },
      {
        h2: "Perguntas que valem ouro antes de fechar",
        p: "Faça pelo menos três delas — quem entende do assunto responde sem rodeios.",
        ul: [
          "Que técnica vocês vão usar no meu tipo de tecido?",
          "Em quanto tempo o sofá estará liberado para uso?",
          "O produto é seguro para criança e pet?",
          "Existe garantia? Em que casos vocês voltam para refazer?",
        ],
      },
    ],
    fechamento:
      "Escolher bem a empresa é metade do resultado. Se quiser, manda uma foto que devolvemos diagnóstico honesto — mesmo que você decida ir com outro profissional.",
  },
  {
    slug: "sofa-novo-precisa-impermeabilizar",
    titulo: "Sofá novo: vale a pena impermeabilizar desde o primeiro dia?",
    resumo: "A análise honesta do custo-benefício para decidir se você impermeabiliza logo na entrega ou espera.",
    data: "2026-05-11",
    categoria: "Impermeabilização",
    keywords: ["impermeabilizar sofá novo", "sofá novo impermeabilização", "vale a pena impermeabilizar"],
    intro:
      "Você comprou um sofá novo. A loja oferece impermeabilização por um valor adicional, ou você se pergunta se contrata por fora. A resposta honesta é: depende do seu perfil. Para algumas casas, é o melhor investimento possível para preservar o estofado. Para outras, é gasto desnecessário. Esse artigo te ajuda a decidir com base em dados reais — não em discurso de venda — sobre o que a impermeabilização entrega, quanto custa em média e em que casos vale ou não vale a pena fazer logo.",
    secoes: [
      {
        h2: "Quando vale fazer no primeiro mês",
        p: "Se sua casa se encaixa em pelo menos um destes perfis, impermeabilizar logo na chegada do sofá é uma das melhores decisões financeiras que você pode tomar.",
        ul: [
          "Tem criança pequena (até 8 anos) que usa o sofá com frequência",
          "Tem pet que sobe ou dorme no estofado",
          "O sofá fica em sala de TV, escritório ou cozinha americana",
          "É um sofá caro (suede, veludo, linho) ou de canto/retrátil grande",
          "Você costuma comer, beber ou receber visitas no sofá",
        ],
        p2: "Em qualquer um desses casos, o custo da impermeabilização (geralmente entre R$ 18 e R$ 35 por lugar) se paga em um único acidente evitado. E ainda protege por 12 a 18 meses contínuos.",
      },
      {
        h2: "Quando pode esperar (ou nem fazer)",
        p: "Em alguns cenários o investimento perde sentido — vale economizar:",
        ul: [
          "Sofá em quarto/escritório com baixíssimo uso",
          "Sofá de courino brilhante (já tem proteção natural impermeável)",
          "Casa só de adulto, que não come/bebe no sofá",
          "Sofá já com tecido velho ou com manchas antigas (ineficaz)",
        ],
      },
      {
        h2: "Loja x serviço por fora: qual escolher",
        p: "Impermeabilização vendida pela loja costuma ser mais cara e, em algumas redes, é só um spray genérico aplicado sem padronização. Serviço terceirizado profissional usa produto específico para o tecido, aplica em camadas controladas e geralmente sai mais barato. Em Vespasiano e São José da Lapa, dá para impermeabilizar em casa em cerca de 1 hora, com liberação imediata para uso.",
      },
    ],
    fechamento:
      "Impermeabilização não é mágica, mas é uma das melhores apólices de seguro que existem para sofá novo. Em casa de criança, pet ou estofado caro, é praticamente obrigatório.",
  },
  {
    slug: "higienizacao-cadeiras-jantar-antes-do-almoco",
    titulo: "Higienização de cadeiras de jantar: vale antes de receber a família?",
    resumo: "O serviço discreto que muda a cara da sua sala de jantar — e quanto custa em Vespasiano/SJ Lapa.",
    data: "2026-05-12",
    categoria: "Cadeiras",
    keywords: ["higienização cadeiras jantar", "limpar cadeira estofada", "cadeira jantar Vespasiano"],
    intro:
      "Cadeiras de jantar acumulam muito mais sujeira do que parece: respingo de comida, gordura do contato com a mão, suor, pelo de pet, poeira que se mistura à gordura e fixa no tecido. Em pouco tempo, mesmo cadeira clara e bonita fica com aspecto encardido — principalmente nos braços (se tiver) e na parte da frente do assento, onde encosta a coxa. Antes de um almoço de família, casamento, batizado ou Natal em casa, vale considerar a higienização. O custo é baixo, o resultado impressiona e ninguém percebe que você “fez nada” — apenas que sua casa ficou linda.",
    secoes: [
      {
        h2: "Por que higienizar antes de evento",
        p: "Cadeira limpa muda o ambiente sem chamar atenção para o gasto. E evita constrangimento — ninguém quer que a tia perceba a mancha de molho da última festa.",
        ul: [
          "Visual uniforme (sem aquela cadeira “mais escura” no canto)",
          "Cheiro neutro (sem aquele leve cheiro de comida acumulada)",
          "Conforto: tecido sem grude e sem aspecto pegajoso",
          "Saudável: remove ácaros e bactérias acumuladas",
        ],
      },
      {
        h2: "Como funciona o serviço",
        p: "É rápido e não atrapalha sua rotina. Em geral, 6 cadeiras levam entre 1 e 2 horas. A secagem é feita ainda na sua casa e elas voltam ao lugar no mesmo dia.",
        ul: [
          "Aspiração profunda de cada cadeira (incluindo embaixo do assento)",
          "Pré-spray específico para o tecido (sintético, linho, suede, veludo)",
          "Extração úmida com pressão controlada",
          "Secagem assistida com ventilador",
          "Inspeção final e liberação para uso",
        ],
        p2: "Para evento no fim de semana, agende a higienização para a quinta ou sexta — assim, no sábado de manhã, está tudo seco, perfumado e pronto.",
      },
      {
        h2: "Faixa de preço em Vespasiano e São José da Lapa",
        p: "Cada cadeira sai geralmente entre R$ 19 e R$ 35, dependendo do tecido e da sujeira. Em conjuntos de 6 ou 8 cadeiras, costuma haver desconto. Manda uma foto da cadeira pelo WhatsApp para receber o orçamento exato.",
      },
    ],
    fechamento:
      "Cadeira limpa muda mais a cara da sala do que pintar parede. E custa muito menos. Antes do próximo almoço importante, vale considerar.",
  },
  {
    slug: "mofo-no-estofado-causas-e-solucao",
    titulo: "Mofo no estofado: causas, riscos à saúde e a solução definitiva",
    resumo: "Por que o mofo aparece, o perigo silencioso para alérgicos e como eliminar de vez sem mascarar.",
    data: "2026-05-13",
    categoria: "Sofá",
    keywords: ["mofo no sofá", "tirar mofo estofado", "cheiro de mofo sofá Vespasiano"],
    intro:
      "Mofo em estofado nunca é “só estética”. É um problema de saúde, especialmente para alérgicos, asmáticos, crianças pequenas, idosos e pessoas em recuperação. As esporas de fungo se espalham pelo ar a cada vez que alguém senta, viram poeira invisível e disparam crises. E aqui em Vespasiano, São José da Lapa e na região metropolitana norte de BH, o problema é mais comum do que parece — clima úmido, casa fechada por horas e estofado encostado em parede formam o trio perfeito para o fungo se instalar. Esse guia explica como identificar, eliminar e — principalmente — prevenir o mofo.",
    secoes: [
      {
        h2: "Como identificar mofo no sofá",
        p: "Nem sempre o mofo é visível. Em muitos casos ele já está instalado mesmo antes de aparecer mancha. Os sinais de alerta:",
        ul: [
          "Cheiro adocicado de “quartinho fechado” perto do sofá",
          "Manchas escurecidas pequenas, redondas, em pontos específicos",
          "Pintinhas pretas ou verdes na parte de trás do encosto",
          "Crise de espirro sempre que alguém usa o sofá por mais de 30 min",
          "Sensação de coceira na pele depois de deitar no estofado",
        ],
      },
      {
        h2: "As causas mais comuns",
        p: "Mofo precisa de três coisas para crescer: umidade, sujeira orgânica e ausência de luz. Quase toda casa tem as três condições em algum grau.",
        ul: [
          "Sofá encostado na parede sem espaço para circulação de ar",
          "Casa fechada por longas horas (durante o trabalho, viagens)",
          "Vazamento ou infiltração próxima ao sofá",
          "Suor e migalhas acumulados nas dobras (alimento para o fungo)",
          "Ar-condicionado direcionado para o estofado por horas",
        ],
        p2: "Em Vespasiano e cidades vizinhas, o pico de problemas com mofo costuma ser entre dezembro e março — coincide com o auge das chuvas e calor.",
      },
      {
        h2: "A solução profissional definitiva",
        p: "Higienização caseira raramente resolve mofo: ela tira a aparência, mas o fungo permanece dentro da espuma e volta. O tratamento profissional usa produto antifúngico específico, extrai a fundo e seca com ventilação forçada. Após isso, vale corrigir as causas: afastar o sofá da parede, abrir a casa diariamente e considerar desumidificador em meses chuvosos.",
      },
    ],
    fechamento:
      "Mofo é coisa séria. Se alguém da casa tem rinite, asma ou alergia frequente, esse pode ser o gatilho silencioso. Higienize, descubra a causa e mude a rotina.",
  },
  {
    slug: "berco-bebe-conforto-limpeza-segura",
    titulo: "Berço, bebê conforto e cadeirinha: limpeza segura para recém-nascido",
    resumo: "Produtos certos, técnica suave e cuidados específicos para a higienização de itens de bebê.",
    data: "2026-05-14",
    categoria: "Bebê",
    keywords: ["limpar berço bebê", "higienização cadeirinha bebê", "bebê conforto Vespasiano"],
    intro:
      "Bebê passa boa parte das primeiras semanas dormindo no berço, no bebê conforto ou na cadeirinha do carro. A pele dele é dezenas de vezes mais sensível que a de um adulto, e qualquer resíduo de produto químico vira potencial irritação, vermelhidão ou alergia. Por outro lado, esses itens acumulam saliva, leite materno, regurgitação, suor, fezes, xixi e poeira o tempo todo — e precisam de higienização frequente. O equilíbrio entre limpeza profunda e segurança química é a parte mais difícil. Esse guia traz orientações que respeitam a sensibilidade do recém-nascido e atendem o protocolo de pediatra.",
    secoes: [
      {
        h2: "Produtos seguros para usar em casa",
        p: "Mantenha sua rotina simples e use produtos com lista curta de ingredientes. Quanto menos componentes, menor o risco.",
        ul: [
          "Sabão de coco ou sabão neutro para bebê (sem perfume)",
          "Bicarbonato de sódio (neutraliza odor sem agredir)",
          "Vinagre branco diluído em água (1:3, para desinfecção leve)",
          "Pano de microfibra branco (não solta cor nem fiapos)",
          "Água destilada para enxágue final (em itens muito sensíveis)",
        ],
        p2: "Evite radicalmente: água sanitária, álcool 70%, desinfetante perfumado, amaciante de roupa e qualquer produto “bactericida” comum. Tudo isso pode irritar pele e mucosa do bebê.",
      },
      {
        h2: "Quando chamar a higienização profissional",
        p: "Há momentos em que vale a pena ter ajuda — especialmente quando o item já tem manchas antigas ou cheiros que voltaram mesmo após a limpeza caseira:",
        ul: [
          "Antes da chegada do bebê (preparação geral)",
          "Após gripe, virose ou refluxo intenso do bebê",
          "Bebê conforto ou cadeirinha de auto comprados de segunda mão",
          "Manchas de fezes ou xixi com cheiro persistente",
          "A cada 3 meses como rotina preventiva",
        ],
        p2: "O profissional usa produtos específicos para itens infantis, com extração que tira a fundo e seca rapidamente. Em Vespasiano e São José da Lapa, o serviço é feito na sua casa em poucas horas.",
      },
      {
        h2: "Cuidados especiais com cadeirinha de carro",
        p: "Cadeirinha tem cintos, fivelas, proteção de impacto e tecido com função de segurança. Lavagem errada compromete proteção. Sempre seguir manual do fabricante: a maioria permite remoção da capa para lavagem na máquina (delicado, água fria, sabão neutro), mas a estrutura interna não pode ser molhada.",
      },
    ],
    fechamento:
      "Recém-nascido merece o ambiente mais limpo possível — e mais seguro também. Limpeza com produto certo é o caminho. Em dúvida, pergunte ao pediatra antes de usar qualquer novo produto.",
  },
  {
    slug: "como-conservar-veludo-no-inverno",
    titulo: "Como conservar veludo no inverno mineiro (sem deformar o tecido)",
    resumo: "Os cuidados específicos com veludo durante os meses secos de junho a agosto em MG.",
    data: "2026-05-15",
    categoria: "Sofá",
    keywords: ["cuidar veludo inverno", "conservar veludo mineiro", "limpar sofá veludo"],
    intro:
      "Veludo é um dos tecidos mais bonitos e mais delicados de estofado. Em Minas Gerais, o inverno traz dois inimigos específicos para esse material: ar muito seco (que ressaca a fibra) e poeira fina abundante (que se acumula nos pelos do tecido). Quando combinados, deixam o veludo com aspecto opaco, “amassado” em zonas de uso e com toque áspero. Sem cuidado certo, em poucas estações o sofá perde o brilho e o caimento original. Esse guia traz a rotina específica para manter veludo bonito ao longo dos meses secos do ano.",
    secoes: [
      {
        h2: "Cuidados semanais",
        p: "Pequenos hábitos no dia a dia evitam 90% dos problemas. A frequência é mais importante que a intensidade.",
        ul: [
          "Aspirar com bico macio no sentido do pelo (uma vez por semana)",
          "Escovar levemente com escova de cerdas ultramacias para alinhar os pelos",
          "Manter o sofá afastado de aquecedor, lareira ou luz solar direta",
          "Evitar sentar sempre no mesmo lugar (alterne para uso uniforme)",
          "Não cobrir com manta sintética por longas horas (cria fricção)",
        ],
      },
      {
        h2: "O que fazer com manchas (e o que não fazer)",
        p: "Veludo perdoa pouco — esfregar arranca pelo e cria “falha” permanente. A regra é: toques leves, da borda para o centro, com pano branco bem macio.",
        ul: [
          "Mancha líquida nova: papel toalha pressionando, sem esfregar",
          "Mancha gordurosa: pó de talco para absorver, depois aspiração suave",
          "Resíduo seco: escova macia em movimentos curtos no sentido do pelo",
          "Cheiro: bicarbonato polvilhado por 1 hora, depois aspirar",
        ],
        p2: "Nunca use água em excesso, álcool puro, vinagre ou produto colorido. Tudo isso pode descolorar ou deformar o veludo.",
      },
      {
        h2: "Higienização profissional anual (recomendada)",
        p: "Mesmo com cuidado diário, o veludo acumula gordura do contato e poeira fina que aspirador comum não remove. Uma higienização profissional anual restaura o brilho, alinha os pelos com vapor controlado e prolonga muito a vida útil do estofado.",
      },
    ],
    fechamento:
      "Veludo é investimento — e como todo investimento, exige manutenção. Bem cuidado, dura décadas e mantém o caimento original.",
  },
  {
    slug: "estetica-automotiva-revenda",
    titulo: "Estética automotiva interna: detalhes que valorizam a revenda",
    resumo: "Como a higienização interna pode aumentar de R$ 1.000 a R$ 3.000 no valor de venda do seu carro.",
    data: "2026-05-16",
    categoria: "Automotiva",
    keywords: ["estética automotiva revenda", "valorizar carro revenda", "higienização carro venda"],
    intro:
      "Vai vender o carro? Antes de anunciar, considere uma higienização interna profissional. Estatisticamente, carros com interior limpo, cheiro neutro e bancos sem manchas têm valor de venda entre 5% e 12% maior que carros com aparência negligenciada — e vendem em metade do tempo. Isso porque o comprador, ao sentar, decide em segundos se confia no histórico do veículo. Carro sujo passa mensagem de “mal cuidado” mesmo quando a mecânica está perfeita. Esse artigo mostra exatamente o que fazer para o seu carro vender melhor e mais rápido.",
    secoes: [
      {
        h2: "O que o comprador olha (mesmo sem perceber)",
        p: "Comprador experiente avalia mais do que mecânica. O interior conta uma história sobre como o dono cuidou do veículo nos últimos anos.",
        ul: [
          "Aparência geral dos bancos (mancha, desgaste, costura solta)",
          "Cheiro do habitáculo ao abrir a porta (mofo, cigarro, pet)",
          "Estado do volante e câmbio (marcas de uso indicam km real)",
          "Limpeza do teto e pilares (sinal de cuidado contínuo)",
          "Tapete, porta-malas e estepe (indicam infiltração ou negligência)",
        ],
      },
      {
        h2: "O pacote de higienização para revenda",
        p: "Antes do anúncio, faça uma higienização interna completa — e tire fotos antes mesmo de andar com o carro novamente. Inclui:",
        ul: [
          "Higienização de bancos, teto, carpete e portas",
          "Limpeza profunda do painel e console (sem brilho exagerado)",
          "Descontaminação dos dutos do ar-condicionado",
          "Polimento das partes plásticas (efeito “de novo” discreto)",
          "Aspiração e tratamento do porta-malas e estepe",
        ],
        p2: "Em Vespasiano e São José da Lapa, o pacote completo de revenda costuma sair entre R$ 280 e R$ 450, dependendo do tamanho do veículo. Esse investimento se paga várias vezes na negociação.",
      },
      {
        h2: "Cuidado com o exagero",
        p: "Evite produtos com brilho excessivo no painel — passa impressão de “esconder” algo. Comprador atento desconfia de carro “maquiado”. Limpeza profissional bem feita é discreta: o carro parece bem cuidado, não “restaurado”.",
      },
    ],
    fechamento:
      "Higienização não é truque de venda — é apresentar honestamente um carro que foi bem cuidado. E faz diferença real no valor final.",
  },
  {
    slug: "limpeza-pos-obra-cuidados",
    titulo: "Limpeza pós-obra: cuidados com piso, vidro e gesso (sem arruinar o acabamento)",
    resumo: "O que limpar primeiro, com qual produto e o que não fazer para preservar o acabamento novo.",
    data: "2026-05-17",
    categoria: "Pós-obra",
    keywords: ["limpeza pós obra", "limpeza pós reforma", "pós obra Vespasiano"],
    intro:
      "Reforma terminou e a casa está coberta de poeira fina, respingo de tinta, resíduo de cimento, marca de gesso e pegada de bota nos pisos. A vontade é abrir balde de água, jogar tudo e esfregar — e é exatamente assim que se arruína piso novo, vidro recém-instalado e até a pintura recente. A limpeza pós-obra exige ordem específica e produtos certos para cada superfície. Esse guia organiza o passo a passo seguro para preservar o acabamento que você acabou de pagar caro para fazer.",
    secoes: [
      {
        h2: "A ordem certa de limpeza",
        p: "Sempre do alto para baixo, do mais sujo para o mais limpo. Seguir essa lógica evita refazer trabalho e poupa horas.",
        ul: [
          "1. Remover entulho grosso (sacos, pedaços de gesso, sobras de material)",
          "2. Aspirar teto, paredes e cantos com bocal escova (sem encostar na pintura nova)",
          "3. Limpar superfícies altas: armários, estantes, prateleiras",
          "4. Limpar vidros e espelhos (com pano úmido, sem produto)",
          "5. Limpar bancadas e mobília fixa",
          "6. Por último: piso (sempre do fundo da casa para a porta)",
        ],
      },
      {
        h2: "Produtos certos para cada superfície",
        p: "Produto errado dissolve acabamento, mancha vidro e desgasta piso novo. Use o mais simples possível.",
        ul: [
          "Piso porcelanato: água com detergente neutro, pano bem torcido",
          "Mármore e granito: água com sabão neutro (nada ácido)",
          "Madeira: pano apenas úmido, sabão de coco diluído",
          "Vidro: água + 1 colher de álcool, pano de microfibra",
          "Pintura nova: aspirar e, se precisar, pano levemente úmido (sem esfregar)",
          "Inox: pano com vinagre branco diluído",
        ],
        p2: "Evite radicalmente em qualquer pós-obra: água sanitária pura, palha de aço, removedor químico genérico. Esses produtos arranham e descolorem.",
      },
      {
        h2: "Quando vale a pena contratar profissional",
        p: "Para obras médias e grandes, a limpeza pós-obra profissional vale o investimento. Equipe especializada usa aspirador industrial, técnicas certas e termina em horas o que tomaria dias para você. Em Vespasiano e São José da Lapa, conseguimos atender com agendamento em poucos dias e cobertura de toda a área da casa.",
      },
    ],
    fechamento:
      "Acabamento novo é frágil nos primeiros 30 dias. Limpeza errada custa caro. Faça com calma — ou chame quem tem experiência.",
  },
  {
    slug: "habitos-diarios-sofa-durar-10-anos",
    titulo: "10 hábitos diários para o sofá durar 10 anos (sem gastar nada)",
    resumo: "Pequenos cuidados gratuitos que prolongam a vida do estofado e adiam (ou eliminam) a necessidade de troca.",
    data: "2026-05-18",
    categoria: "Sofá",
    keywords: ["sofá durar mais", "cuidar sofá em casa", "conservar sofá"],
    intro:
      "Trocar de sofá custa entre R$ 2.000 e R$ 8.000 (ou bem mais). Higienizar profissionalmente custa entre R$ 200 e R$ 600. Mas o que ninguém te conta é: a maior parte da economia está nos hábitos diários — gestos gratuitos que decidem se o seu estofado vai durar 5 ou 15 anos. Aqui estão 10 práticas comprovadas que conservam o sofá quase no estado original por muito mais tempo. São coisas simples, que cabem na rotina de qualquer família — incluindo casa com criança e pet.",
    secoes: [
      {
        h2: "Os 10 hábitos que mais fazem diferença",
        p: "Não precisa fazer todos de uma vez. Comece com 2 ou 3 e incorpore o resto com o tempo.",
        ul: [
          "1. Aspirar a cada 15 dias, inclusive frestas e atrás das almofadas",
          "2. Inverter posição das almofadas semanalmente (uso uniforme)",
          "3. Não comer no sofá (ou usar bandeja com guardanapo)",
          "4. Limpar manchas em até 30 minutos do acidente",
          "5. Manter pet com hábitos definidos (escova antes de subir, tapete por cima)",
          "6. Não secar roupa molhada sobre encosto ou braço",
          "7. Afastar o sofá pelo menos 10 cm da parede (ventilação)",
          "8. Cobrir com manta nos meses que recebe muita luz (sol descolore)",
          "9. Higienizar profissional a cada 6 meses (a cada 3 se tem pet)",
          "10. Impermeabilizar a cada 12 a 18 meses (proteção extra)",
        ],
      },
      {
        h2: "Por que esses hábitos funcionam",
        p: "A maioria dos sofás “envelhecidos” não tem culpa do tempo — tem culpa do uso desigual. Almofadas sempre na mesma posição amassam, sentar sempre no mesmo lugar deforma a espuma, comer no sofá garante manchas. Pequenos rodízios distribuem o desgaste.",
        ul: [
          "Aspiração regular impede que poeira penetre na fibra",
          "Inversão de almofadas equilibra o desgaste da espuma",
          "Limpeza imediata evita 90% das manchas permanentes",
          "Ventilação evita mofo e cheiro encerrado",
        ],
      },
      {
        h2: "Quando esses hábitos não bastam",
        p: "Mesmo com tudo isso, o uso normal acumula sujeira invisível. Por isso a higienização profissional periódica continua sendo importante. Os hábitos diários reduzem a frequência necessária — você passa de “higienizar a cada 3 meses” para “a cada 6 meses ou 1 ano”.",
      },
    ],
    fechamento:
      "Sofá bem cuidado é puro hábito. Pequenos gestos diários valem milhares de reais economizados em troca futura.",
  },
  {
    slug: "pet-no-sofa-regras-saudaveis",
    titulo: "Pet no sofá: regras saudáveis para conviver bem (sem destruir o estofado)",
    resumo: "Como permitir o pet no sofá com regras claras que protegem o estofado, a saúde e a paz da casa.",
    data: "2026-05-19",
    categoria: "Pet",
    keywords: ["pet no sofá regras", "cachorro no sofá", "gato no estofado"],
    intro:
      "A discussão “pet pode ou não pode subir no sofá” divide opiniões em quase toda família. A verdade é: pode sim, desde que com regras. Convivência boa entre animal e estofado é totalmente possível, mas exige combinados claros (entre os humanos da casa, principalmente) e uma rotina simples de higiene. Esse guia traz a abordagem realista — nem proibição absoluta nem liberou geral. Ele ajuda você a montar um sistema que respeita o pet, conserva o sofá e mantém a casa saudável para alérgicos.",
    secoes: [
      {
        h2: "As regras que funcionam (combine com a casa toda)",
        p: "Sem combinado entre os humanos, qualquer regra fracassa. Sente todo mundo e defina:",
        ul: [
          "O pet só sobe escovado (escovação rápida antes de cada subida)",
          "Tem espaço definido (uma manta dedicada, sempre no mesmo lugar)",
          "Não sobe depois de banho de chuva, lama ou de fazer xixi fora",
          "Não come petisco no sofá (comida atrai migalha e mancha)",
          "Não dorme à noite no sofá (alterar com cama própria)",
        ],
      },
      {
        h2: "Manta dedicada: o segredo dos profissionais",
        p: "Em vez de proibir, ofereça espaço próprio. Use uma manta lavável grossa, sempre no mesmo lugar, e treine o pet a subir só ali. Lavagem semanal da manta resolve 80% do problema de pelo, cheiro e ácaro.",
        ul: [
          "Escolha manta grossa, antialérgica, de fácil lavagem",
          "Lave a 60°C uma vez por semana",
          "Tenha duas mantas para revezar (sempre uma limpa pronta)",
          "Cubra o local exato onde o pet costuma deitar",
        ],
        p2: "A manta protege o tecido do sofá, absorve o pelo e fica como “território oficial” do animal. Em meses, ele aprende e passa a subir só ali.",
      },
      {
        h2: "Higienização periódica: por que é diferente em casa com pet",
        p: "Sofá em casa com pet acumula muito mais ácaros, pelo e — em alguns casos — odor de glândula sebácea (a famosa “gordura de pet”). A frequência ideal de higienização cai pela metade: a cada 3 a 4 meses, em vez de 6 a 12. Em Vespasiano e São José da Lapa, é o tipo de atendimento que mais fazemos.",
      },
    ],
    fechamento:
      "Pet faz parte da família — e a família convive no sofá. Com regras simples, todo mundo aproveita junto sem destruir o ambiente.",
  },
  {
    slug: "pacote-anual-higienizacao-vale-a-pena",
    titulo: "Pacote anual de higienização: vale a pena assinar?",
    resumo: "Análise honesta do custo-benefício de pacotes anuais x serviço avulso para diferentes perfis de casa.",
    data: "2026-05-20",
    categoria: "Dicas",
    keywords: ["pacote higienização anual", "assinatura limpeza estofado", "manutenção sofá anual"],
    intro:
      "Pacotes anuais de higienização viraram tendência: você paga mensalmente um valor menor e tem direito a 2 ou 3 atendimentos no ano, com prioridade de agenda e desconto em serviços extras. Soa como uma boa ideia — mas vale para todo mundo? Esse artigo traz a análise honesta do custo-benefício, sem discurso de venda. Para algumas casas, é claramente vantajoso. Para outras, não compensa. A diferença está no perfil de uso e no número de itens da casa.",
    secoes: [
      {
        h2: "Para quem o pacote anual realmente vale",
        p: "Se sua casa se encaixa em qualquer um destes perfis, o pacote tende a ser mais econômico que serviços avulsos no mesmo período.",
        ul: [
          "Casa com pet (especialmente cachorro grande)",
          "Casa com criança pequena (até 8 anos)",
          "Sofá grande, retrátil ou de tecido caro (suede, veludo)",
          "Pessoa com alergia respiratória forte (precisa higienizar a cada 3 meses)",
          "Família grande (5+ pessoas usando o sofá diariamente)",
        ],
      },
      {
        h2: "Para quem não compensa",
        p: "Em casas com baixo uso ou sem fator agravante (pet/criança/alergia), pacotes podem custar mais que o necessário ao longo do ano.",
        ul: [
          "Casal sem filhos e sem pet, com sofá em quarto/escritório",
          "Família que viaja muito e usa pouco a sala",
          "Estofado de couro tratado (manutenção mais simples e espaçada)",
          "Sofá já com pouco tempo de uso e sem manchas",
        ],
        p2: "Nesses casos, agendar 1 higienização ao ano (ou a cada 18 meses) costuma resolver perfeitamente — e custa menos.",
      },
      {
        h2: "O que considerar na contratação",
        p: "Antes de assinar qualquer pacote, leia as condições. Bons pacotes incluem:",
        ul: [
          "Quantidade de atendimentos por ano (2, 3, 4)",
          "Quais peças estão incluídas (sofá, colchões, cadeiras)",
          "Prioridade na agenda em meses cheios",
          "Desconto em serviços extras (impermeabilização, tapetes)",
          "Possibilidade de ceder atendimento para parente/vizinho",
        ],
      },
    ],
    fechamento:
      "Assinatura é boa quando o uso justifica. Mande seu perfil pelo WhatsApp que fazemos a conta honesta — se não compensar, te dizemos.",
  },
  {
    slug: "limpeza-airbnb-aluguel-temporada",
    titulo: "Higienização para Airbnb e aluguel por temporada na Grande BH",
    resumo: "O que diferencia limpeza para hospedagem do dia a dia — e por que isso vira nota 5 estrelas.",
    data: "2026-05-21",
    categoria: "Hospedagem",
    keywords: ["limpeza Airbnb", "higienização aluguel temporada", "limpeza hospedagem BH"],
    intro:
      "Quem tem imóvel em Airbnb, Booking ou aluguel por temporada sabe: avaliação 5 estrelas é resultado direto da limpeza percebida na chegada. Hóspede que sente cheiro estranho, encontra cabelo no banheiro ou senta num sofá com mancha de café da semana passada já entra com pé atrás — e isso aparece na resenha. Por outro lado, hospedagem com cheiro neutro, banheiro impecável e estofado limpo gera elogio espontâneo (“lugar muito limpinho!”) que vira marketing gratuito. Esse guia mostra o que diferencia limpeza “de hospedagem” da limpeza doméstica comum.",
    secoes: [
      {
        h2: "O que o hóspede percebe nos primeiros 90 segundos",
        p: "A primeira impressão é decidida no momento exato da chegada. Esses são os pontos que pesam mais:",
        ul: [
          "Cheiro do ambiente ao abrir a porta (neutro = ótimo)",
          "Aspecto visual do sofá e cama (sem mancha, sem amassado)",
          "Limpeza dos vidros e espelhos (sujo é sinal de descuido)",
          "Brilho do piso (especialmente porcelanato e madeira)",
          "Banheiro: rejunte, registro, espelho e ralo",
        ],
      },
      {
        h2: "Higienização periódica entre temporadas",
        p: "Limpeza diária do enxoval entre hóspedes não é suficiente. A cada 30 a 60 dias, faz diferença ter higienização profissional do estofado, cama e banheiro completo.",
        ul: [
          "Higienização do sofá e cama de casal (mensal em alta temporada)",
          "Higienização interna do ar-condicionado (trimestral)",
          "Limpeza profunda do banheiro com desincrustante (mensal)",
          "Aspiração de cortinas e tapetes (quinzenal)",
          "Limpeza pós-evento (após hóspedes com pet, criança ou festa)",
        ],
        p2: "Em Vespasiano, São José da Lapa e cidades próximas a BH, oferecemos pacotes específicos para anfitriões — com horários flexíveis (incluindo madrugada e domingo) entre check-out e check-in.",
      },
      {
        h2: "Como isso se traduz em mais reservas",
        p: "Avaliação média acima de 4.8 traz três efeitos diretos: maior posição no buscador da plataforma, maior taxa de conversão de visitas em reservas e possibilidade de aumentar diária em 15% a 25%. Investimento em limpeza profissional se paga rapidamente em receita.",
      },
    ],
    fechamento:
      "Hospedagem é experiência. Limpeza é a base de tudo. Quer profissionalizar a manutenção do seu imóvel? Manda mensagem pelo WhatsApp.",
  },
];

export const MANUAIS_EXTRAS: Post[] = DRAFTS.map(build);
